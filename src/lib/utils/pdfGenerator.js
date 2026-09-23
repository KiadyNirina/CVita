import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas-pro';

const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;

async function waitForRender() {
    await new Promise((resolve) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
        });
    });
    if (document.fonts?.ready) {
        await document.fonts.ready;
    }
}

async function createMeasurementPage(page) {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-100000px';
    wrapper.style.top = '0';
    wrapper.style.width = '210mm';
    wrapper.style.height = '297mm';
    wrapper.style.margin = '0';
    wrapper.style.padding = '0';
    wrapper.style.transform = 'none';
    wrapper.style.transformOrigin = 'top left';
    wrapper.style.visibility = 'visible';
    wrapper.style.opacity = '1';
    wrapper.style.pointerEvents = 'none';
    wrapper.style.zIndex = '-999999';
    wrapper.style.overflow = 'hidden';

    const clone = page.cloneNode(true);
    clone.style.transform = 'none';
    clone.style.transformOrigin = 'top left';
    clone.style.width = '210mm';
    clone.style.height = '297mm';
    clone.style.minWidth = '210mm';
    clone.style.minHeight = '297mm';
    clone.style.maxWidth = '210mm';
    clone.style.maxHeight = '297mm';
    clone.style.margin = '0';
    clone.style.visibility = 'visible';
    clone.style.opacity = '1';

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    await new Promise((resolve) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
        });
    });

    const images = clone.querySelectorAll('img');
    await Promise.all(
        Array.from(images).map((img) => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
            });
        })
    );

    return { wrapper, clone };
}

function getTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
        const text = node.textContent || '';
        if (!text.trim()) continue;
        const parent = node.parentElement;
        if (!parent) continue;
        const tag = parent.tagName.toLowerCase();
        if (['script', 'style', 'noscript', 'textarea', 'input', 'select', 'button'].includes(tag)) continue;
        const style = getComputedStyle(parent);
        if (style.display === 'none' || style.visibility === 'hidden') continue;
        nodes.push(node);
    }
    return nodes;
}

function getVisualLines(textNode) {
    const text = textNode.textContent || '';
    if (!text.trim()) return [];
    const lines = [];
    let currentStart = 0;
    let currentTop = null;
    for (let i = 0; i < text.length; i++) {
        const range = document.createRange();
        range.setStart(textNode, i);
        range.setEnd(textNode, i + 1);
        const rects = Array.from(range.getClientRects());
        range.detach?.();
        if (!rects.length) continue;
        const rect = rects[0];
        if (currentTop === null) {
            currentTop = rect.top;
            continue;
        }
        if (Math.abs(rect.top - currentTop) > 1) {
            const textPart = text.slice(currentStart, i);
            if (textPart.trim()) lines.push({ start: currentStart, end: i });
            currentStart = i;
            currentTop = rect.top;
        }
    }
    if (currentStart < text.length) {
        const textPart = text.slice(currentStart);
        if (textPart.trim()) lines.push({ start: currentStart, end: text.length });
    }
    return lines;
}

function getTextRect(textNode, start, end) {
    const range = document.createRange();
    range.setStart(textNode, start);
    range.setEnd(textNode, end);
    const rects = Array.from(range.getClientRects());
    range.detach?.();
    if (!rects.length) return null;
    let left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
    for (const rect of rects) {
        left = Math.min(left, rect.left);
        right = Math.max(right, rect.right);
        top = Math.min(top, rect.top);
        bottom = Math.max(bottom, rect.bottom);
    }
    return { left, right, top, bottom, width: right - left, height: bottom - top };
}

function getFontStyle(style) {
    const weight = parseInt(style.fontWeight, 10) || 400;
    const italic = style.fontStyle === 'italic';
    const bold = weight >= 600;
    if (bold && italic) return 'bolditalic';
    if (bold) return 'bold';
    if (italic) return 'italic';
    return 'normal';
}

function applyTextTransform(text, transform) {
    switch (transform) {
        case 'uppercase': return text.toUpperCase();
        case 'lowercase': return text.toLowerCase();
        case 'capitalize': return text.replace(/\b\w/g, (char) => char.toUpperCase());
        default: return text;
    }
}

function getLinkElement(element) {
    return element.closest('a[href]');
}

function detectLink(text) {
    const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    if (email) return `mailto:${email[0]}`;
    const url = text.match(/https?:\/\/[^\s]+/i);
    if (url) return url[0];
    return null;
}

function addSelectableTextLayer(pdf, page) {
    const pageRect = page.getBoundingClientRect();
    const pxToMm = PAGE_WIDTH_MM / pageRect.width;
    const textNodes = getTextNodes(page);

    for (const textNode of textNodes) {
        const parent = textNode.parentElement;
        if (!parent) continue;

        const style = getComputedStyle(parent);
        const fontSizePx = parseFloat(style.fontSize) || 12;
        const fontSizePt = fontSizePx * 72 / 96;

        pdf.setFont('helvetica', getFontStyle(style));
        pdf.setFontSize(fontSizePt);

        const textTransform = style.textTransform;
        const linkElement = getLinkElement(parent);
        let linkUrl = null;

        if (linkElement) {
            const href = linkElement.getAttribute('href');
            if (href) {
                try {
                    linkUrl = new URL(href, window.location.href).href;
                } catch {
                    linkUrl = href;
                }
            }
        }

        const fullText = textNode.textContent || '';
        if (!linkUrl) linkUrl = detectLink(fullText);

        const lines = getVisualLines(textNode);

        for (const line of lines) {
            const rawText = fullText.slice(line.start, line.end);
            const trimmed = rawText.trim();
            if (!trimmed) continue;

            const leading = rawText.search(/\S/);
            const trailingMatch = rawText.match(/\s+$/);
            const trailing = trailingMatch ? trailingMatch[0].length : 0;
            const start = line.start + Math.max(leading, 0);
            const end = line.end - trailing;
            if (end <= start) continue;

            const rect = getTextRect(textNode, start, end);
            if (!rect) continue;

            const x = (rect.left - pageRect.left) * pxToMm;
            const y = (rect.top - pageRect.top) * pxToMm + fontSizePx * pxToMm * 0.78;
            const visibleText = applyTextTransform(trimmed, textTransform);

            pdf.text(visibleText, x, y, {
                renderingMode: 'invisible',
                baseline: 'alphabetic'
            });

            if (linkUrl) {
                const linkX = x;
                const linkY = (rect.top - pageRect.top) * pxToMm;
                const linkWidth = Math.max(rect.width * pxToMm, 1);
                const linkHeight = Math.max(rect.height * pxToMm, 1);

                pdf.link(linkX, linkY, linkWidth, linkHeight, { url: linkUrl });
            }
        }
    }
}

export async function generatePDF(pagesContainer) {
    if (!pagesContainer) throw new Error('Conteneur des pages introuvable.');

    const pageElements = pagesContainer.querySelectorAll('.a4-page');
    if (!pageElements.length) throw new Error('Aucune page A4 trouvée.');

    await waitForRender();

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
    });

    for (let i = 0; i < pageElements.length; i++) {
        const page = pageElements[i];

        const canvas = await html2canvas(page, {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            backgroundColor: '#ffffff',
            logging: false,
            width: page.offsetWidth,
            height: page.offsetHeight,
            windowWidth: page.scrollWidth,
            windowHeight: page.scrollHeight,
            onclone: (clonedDocument) => {
                clonedDocument.querySelectorAll('*').forEach((element) => {
                    element.style.transform = 'none';
                    element.style.transformOrigin = 'top left';
                });
            }
        });

        if (i > 0) pdf.addPage();

        const imageData = canvas.toDataURL('image/png');
        pdf.addImage(imageData, 'PNG', 0, 0, PAGE_WIDTH_MM, PAGE_HEIGHT_MM, undefined, 'FAST');

        const { wrapper, clone } = await createMeasurementPage(page);

        try {
            addSelectableTextLayer(pdf, clone);
        } finally {
            wrapper.remove();
        }
    }

    return pdf.output('blob');
}
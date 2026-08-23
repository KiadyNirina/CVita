import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas-pro';

/**
 * Génère un PDF à partir des pages A4 visibles.
 * Chaque page est capturée séparément pour un rendu parfait.
 */
export async function generatePDF(pagesContainer) {
    if (!pagesContainer) {
        throw new Error('Conteneur des pages introuvable.');
    }

    // Récupère toutes les pages A4 individuelles
    const pageElements = pagesContainer.querySelectorAll('.a4-page');
    if (pageElements.length === 0) {
        throw new Error('Aucune page A4 trouvée.');
    }

    // Attend le rendu complet
    await new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
    });

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pageElements.length; i++) {
        const page = pageElements[i];

        const canvas = await html2canvas(page, {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            backgroundColor: '#ffffff',
            logging: false,
            windowWidth: page.scrollWidth,
            windowHeight: page.scrollHeight,
            onclone: (clonedDoc) => {
                const allElements = clonedDoc.querySelectorAll('*');
                allElements.forEach((el) => {
                    el.style.transform = 'none';
                });
            }
        });

        const imgData = canvas.toDataURL('image/png');

        if (i > 0) {
            pdf.addPage();
        }

        pdf.addImage(
            imgData,
            'PNG',
            0,
            0,
            pdfWidth,
            pdfHeight,
            undefined,
            'FAST'
        );
    }

    return pdf.output('blob');
}
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas-pro';

/**
 * Génère un PDF à partir du rendu réel de Preview.svelte.
 *
 * Le PDF est donc basé sur le HTML/CSS affiché,
 * et non sur une reconstruction manuelle avec jsPDF.
 */
export async function generatePDF(element) {
    if (!element) {
        throw new Error('Élément Preview introuvable.');
    }

    // Attendre que le navigateur ait terminé le rendu
    await new Promise((resolve) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
        });
    });

    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,

        // Évite que html2canvas reprenne certaines dimensions
        // dynamiques du viewport.
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const ratio = pdfWidth / canvasWidth;
    const renderedHeight = canvasHeight * ratio;

    let remainingHeight = renderedHeight;
    let position = 0;
    const EPSILON = 1;

    /*
     * Première page
     */
    pdf.addImage(
        imgData,
        'PNG',
        0,
        position,
        pdfWidth,
        renderedHeight,
        undefined,
        'FAST'
    );

    remainingHeight -= pdfHeight;

    /*
     * Pages suivantes
     */
    while (remainingHeight > EPSILON) {
        position -= pdfHeight;

        pdf.addPage();

        pdf.addImage(
            imgData,
            'PNG',
            0,
            position,
            pdfWidth,
            renderedHeight,
            undefined,
            'FAST'
        );

        remainingHeight -= pdfHeight;
    }

    return pdf.output('blob');
}
export async function loadFont(doc) {
    // Charger la police Helvetica (incluse par défaut dans jsPDF)
    doc.addFont('helvetica', 'normal');
    doc.addFont('helvetica', 'bold');
    
    // Pour des polices personnalisées, vous devrez les charger explicitement
    // Exemple avec une police Google Fonts :
    /*
    const fontUrl = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap';
    const fontData = await fetch(fontUrl).then(res => res.arrayBuffer());
    doc.addFontToVFS('OpenSans-normal', fontData);
    doc.addFont('OpenSans', 'normal', 'normal');
    */
}
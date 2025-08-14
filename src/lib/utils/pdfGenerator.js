import { jsPDF } from 'jspdf';
import { formatToMMYYYY } from './dateUtils';

export async function generatePDF(cvData) {
    const doc = new jsPDF({
        unit: 'mm',
        format: 'a4',
        compress: true
    });

    // Configuration
    const page = {
        width: doc.internal.pageSize.getWidth(),
        height: doc.internal.pageSize.getHeight(),
        margin: 15,
        lineHeight: 6
    };

    // Couleurs
    const theme = {
        primary: '#2563EB',
        text: '#374151',
        lightText: '#6B7280',
        border: '#E5E7EB',
        skillBg: '#F3F4F6',
        timeline: '#9CA3AF'
    };

    // ===== FONCTIONS UTILITAIRES =====
    const safeText = (text, x, y, maxWidth = null) => {
        const validX = Math.max(page.margin, Math.min(x, page.width - page.margin));
        const validY = Math.max(page.margin, Math.min(y, page.height - page.margin));
        
        if (maxWidth) {
            const lines = doc.splitTextToSize(text, maxWidth);
            doc.text(lines, validX, validY);
            return lines.length * page.lineHeight;
        } else {
            doc.text(text, validX, validY);
            return page.lineHeight;
        }
    };

    const safeRect = (x, y, w, h, style = 'S') => {
        const validX = Math.max(page.margin, Math.min(x, page.width - page.margin));
        const validY = Math.max(page.margin, Math.min(y, page.height - page.margin));
        const validW = Math.max(0, Math.min(w, page.width - validX - page.margin));
        const validH = Math.max(0, Math.min(h, page.height - validY - page.margin));
        
        if (validW > 0 && validH > 0) {
            doc.rect(validX, validY, validW, validH, style);
        }
    };

    const safeRoundedRect = (x, y, w, h, r) => {
        const validX = Math.max(page.margin, Math.min(x, page.width - page.margin));
        const validY = Math.max(page.margin, Math.min(y, page.height - page.margin));
        const validW = Math.max(0, Math.min(w, page.width - validX - page.margin));
        const validH = Math.max(0, Math.min(h, page.height - validY - page.margin));
        const validR = Math.min(r, validW / 2, validH / 2);
        
        if (validW > 0 && validH > 0) {
            doc.roundedRect(validX, validY, validW, validH, validR, validR, 'FD');
        }
    };

    const addSection = (title, y) => {
        y = ensureSpace(y, 20);
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(theme.text);
        safeText(title, page.margin, y);
        
        doc.setDrawColor(theme.border);
        doc.line(page.margin, y + 2, page.width - page.margin, y + 2);
        
        return y + page.lineHeight * 1.5;
    };

    const ensureSpace = (y, needed) => {
        if (y + needed > page.height - page.margin) {
            doc.addPage();
            return page.margin;
        }
        return y;
    };

    // ===== IMAGE DE PROFIL (GAUCHE) ET EN-TÊTE =====
    let imgHeight = 0;
    let blockWidth = 0;
    const gap = 5; // Gap between image and text in mm
    const pageCenter = (page.width - page.margin * 2) / 2 + page.margin; // Center of usable page width

    // Calculate text widths for name and title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    const nameWidth = doc.getTextWidth(cvData.personalInfo.name);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(14);
    const titleWidth = cvData.personalInfo.cvTitle ? doc.getTextWidth(cvData.personalInfo.cvTitle) : 0;
    const textWidth = Math.max(nameWidth, titleWidth); // Use the wider text

    // Calculate total block width (image + gap + text)
    const imgSize = 24; // Image width and height
    blockWidth = (cvData.personalInfo.image ? imgSize + gap : 0) + textWidth;
    const blockStartX = pageCenter - (blockWidth / 2); // Start x to center the block

    // Image de profil
    if (cvData.personalInfo?.image) {
        try {
            const imgData = await loadImage(cvData.personalInfo.image);
            if (imgData) {
                const imgX = blockStartX;
                const imgY = page.margin;
                
                doc.addImage({
                    imageData: imgData,
                    x: imgX,
                    y: imgY,
                    width: imgSize,
                    height: imgSize,
                    format: 'JPEG',
                    compression: 'FAST'
                });
                imgHeight = imgSize + 5; // Include spacing below image
            }
        } catch (error) {
            console.warn("Image non chargée:", error);
        }
    }

    // En-tête
    let headerY = page.margin;

    // Nom
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(theme.text);
    safeText(cvData.personalInfo.name, blockStartX + (cvData.personalInfo.image ? imgSize + gap : 0), headerY + 10);

    // Titre
    if (cvData.personalInfo.cvTitle) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(14);
        doc.setTextColor(theme.primary);
        safeText(cvData.personalInfo.cvTitle, blockStartX + (cvData.personalInfo.image ? imgSize + gap : 0), headerY + 16);
    }

    // Coordonnées
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(theme.lightText);
    const contactText = [
        cvData.personalInfo.email,
        cvData.personalInfo.phone,
        cvData.personalInfo.address,
        cvData.personalInfo.linkedin,
        cvData.personalInfo.github
    ].filter(Boolean).join(' • ');
    const contactTextWidth = doc.getTextWidth(contactText);
    const contactX = pageCenter - (contactTextWidth / 2); // Center the contact info
    safeText(
        contactText,
        contactX,
        headerY + (imgHeight > 0 ? imgHeight : 24)
    );

    // Ligne de séparation
    const separatorY = headerY + (imgHeight > 0 ? imgHeight + 15 : 30);
    doc.setDrawColor(theme.border);
    doc.line(page.margin, separatorY, page.width - page.margin, separatorY);

    // ===== SECTIONS =====
    let currentY = separatorY + 10;

    // Profil
    if (cvData.professionalSummary) {
        currentY = addSection('Profil Professionnel', currentY);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(theme.text);
        currentY += safeText(cvData.professionalSummary, page.margin + 5, currentY, page.width - page.margin * 2) + 10;
    }

    // ===== EXPÉRIENCES AVEC TIMELINE =====
    if (cvData.workExperience?.length) {
        currentY = addSection('Expérience Professionnelle', currentY);
        const timelineX = page.margin + 5;
        const borderOffset = 4; 
        
        cvData.workExperience.forEach((exp, index) => {
            currentY = ensureSpace(currentY, 25);
            
            // Poste
            doc.setDrawColor(theme.timeline);
            doc.setLineWidth(0.5);
            doc.line(timelineX - 2, currentY - borderOffset, timelineX - 2, currentY + page.lineHeight - borderOffset);
            doc.setDrawColor(theme.text);

            // Poste (en bold)
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            const jobTitleWidth = doc.getTextWidth(exp.jobTitle);
            safeText(exp.jobTitle, timelineX + 8, currentY);

            // "chez" (en normal)
            doc.setFont('helvetica', 'normal');
            const chezText = '-';
            const chezWidth = doc.getTextWidth(chezText);
            safeText(chezText, timelineX + 8 + jobTitleWidth + 1, currentY);

            // Entreprise (en normal)
            doc.setFont('helvetica', 'italic');
            safeText(exp.employer, timelineX + 8 + jobTitleWidth + chezWidth + 2, currentY);
            currentY += page.lineHeight;
            
            // Dates
            doc.setDrawColor(theme.timeline);
            doc.setLineWidth(0.5);
            doc.line(timelineX - 2, currentY - borderOffset, timelineX - 2, currentY + page.lineHeight - borderOffset);
            doc.setDrawColor(theme.text);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(theme.lightText);
            safeText(
                `${formatToMMYYYY(exp.startDate)} - ${exp.current ? 'Présent' : formatToMMYYYY(exp.endDate)}`,
                timelineX + 8,
                currentY
            );
            currentY += page.lineHeight;
            
            // Description
            if (exp.description) {
                doc.setDrawColor(theme.timeline);
                doc.setLineWidth(0.5);
                doc.line(timelineX - 2, currentY - borderOffset, timelineX - 2, currentY + page.lineHeight - borderOffset);
                doc.setDrawColor(theme.text);
                doc.setFontSize(11);
                doc.setTextColor(theme.text);
                currentY += safeText(exp.description, timelineX + 8, currentY, page.width - timelineX - page.margin - 5);
            }
            
            currentY += 5;
        });
        currentY += 5;
    }

    // ===== FORMATIONS AVEC TIMELINE =====
    if (cvData.education?.length) {
        currentY = addSection('Formation', currentY);
        const timelineX = page.margin + 5;
        const borderOffset = 4; // Offset to move borders up by 1mm
        
        cvData.education.forEach((edu, index) => {
            currentY = ensureSpace(currentY, 25);
            
            // Diplôme
            doc.setDrawColor(theme.timeline); // Black color
            doc.setLineWidth(0.5); // Line width of 0.5mm
            doc.line(timelineX - 2, currentY - borderOffset, timelineX - 2, currentY + page.lineHeight - borderOffset); // Border for degree
            doc.setDrawColor(theme.text); // Restore draw color
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            safeText(`${edu.degree} - ${edu.institution}`, timelineX + 8, currentY);
            currentY += page.lineHeight;
            
            // Dates
            doc.setDrawColor(theme.timeline); // Black color
            doc.setLineWidth(0.5); // Line width of 0.5mm
            doc.line(timelineX - 2, currentY - borderOffset, timelineX - 2, currentY + page.lineHeight - borderOffset); // Border for dates
            doc.setDrawColor(theme.text); // Restore draw color
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(theme.lightText);
            safeText(
                `${formatToMMYYYY(edu.startDate)} - ${formatToMMYYYY(edu.endDate)}`,
                timelineX + 8,
                currentY
            );
            currentY += page.lineHeight;
            
            // Domaine
            if (edu.field) {
                doc.setDrawColor(theme.timeline); // Black color
                doc.setLineWidth(0.5); // Line width of 0.5mm
                doc.line(timelineX - 2, currentY - borderOffset, timelineX - 2, currentY + page.lineHeight - borderOffset); // Border for field
                doc.setDrawColor(theme.text); // Restore draw color
                doc.setFontSize(11);
                doc.setTextColor(theme.text);
                safeText(edu.field, timelineX + 8, currentY);
                currentY += page.lineHeight;
            }
            
            currentY += 5;
        });

        currentY += 5;
    }

    // ===== COMPÉTENCES =====
    if (cvData.skills?.length) {
        currentY = addSection('Compétences', currentY);
        currentY -= 3;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(theme.text);
        
        const skillsPerLine = 6;
        const skillWidth = (page.width - page.margin * 2 - 15) / skillsPerLine;
        const skillHeight = 7;
        let xPos = page.margin;
        
        cvData.skills.forEach((skill, i) => {
            if (i > 0 && i % skillsPerLine === 0) {
                currentY += skillHeight + 4;
                xPos = page.margin;
                currentY = ensureSpace(currentY, skillHeight + 10);
            }
            
            // Fond du tag
            doc.setFillColor(theme.skillBg);
            safeRoundedRect(xPos, currentY, skillWidth, skillHeight, 10);
            
            // Texte
            const text = skill.level ? `${skill.name}` : skill.name;
            const fontSize = doc.getTextWidth(text) > skillWidth - 6 ? 9 : 10;
            doc.setFontSize(fontSize);
            const textWidth = doc.getTextWidth(text);
            const textX = xPos + (skillWidth - textWidth) / 2; // Center text horizontally
            safeText(text, textX, currentY + skillHeight / 2 + 2);
            doc.setFontSize(11);
            
            xPos += skillWidth + 3;
        });
        
        currentY += skillHeight + 12;
    }

    // ===== LANGUES =====
    if (cvData.languages?.length) {
        currentY = addSection('Langues', currentY);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        
        const barWidth = 50;
        const barHeight = 4;
        
        cvData.languages.forEach(lang => {
            currentY = ensureSpace(currentY, 10);
            currentY -= 3;
            
            // Nom
            doc.setTextColor(theme.text);
            safeText(lang.name, page.margin, currentY + barHeight/2 + 2);
            
            // Barre de progression
            const barX = page.width - page.margin - barWidth;
            const progress = Math.min(Math.max(lang.level / 5, 0), 1);
            
            // Fond
            doc.setFillColor(theme.border);
            safeRect(barX, currentY, barWidth, barHeight, 'F');
            
            // Progression
            doc.setFillColor(theme.primary);
            safeRect(barX, currentY, barWidth * progress, barHeight, 'F');
            
            currentY += 10;
        });
    }

    return doc.output('blob');
}

async function loadImage(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = url;
    });
}
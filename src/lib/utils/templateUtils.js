// $lib/utils/templateUtils.js
import { formatToMMYYYY } from './dateUtils';

export const formatDate = (dateStr) => {
    return dateStr ? formatToMMYYYY(dateStr) : 'Présent';
};

export const calculateDuration = (startDate, endDate, isCurrent) => {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const end = isCurrent ? new Date() : new Date(endDate || new Date());
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    if (months < 12) {
        return `${months} mois`;
    } else {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        return `${years} an${years > 1 ? 's' : ''}${remainingMonths ? ` ${remainingMonths} mois` : ''}`;
    }
};
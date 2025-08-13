export const formatToMMYYYY = (dateStr) => {
    if (!dateStr) return 'Présent';
    const [year, month] = dateStr.split('-');
    return `${month.padStart(2, '0')}/${year}`;
};

export const parseFromMMYYYY = (inputStr) => {
    if (!inputStr || inputStr === 'Présent') return null;
    const [month, year] = inputStr.split('/');
    return `${year}-${month.padStart(2, '0')}`;
};
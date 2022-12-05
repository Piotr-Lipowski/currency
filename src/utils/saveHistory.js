import getFormattedDate from "./getFormattedDate";

const saveHistory = (rate, amount, convertedTo, convertedFrom, convertedAmount, reverseRate) => {

    const date = getFormattedDate(0, true);
    let conversionHistory = localStorage.getItem('conversionHistory') || [];

    let entry = {
        date,
        rate,
        amount,
        convertedTo,
        convertedFrom,
        convertedAmount,
        reverseRate
    }

    if (conversionHistory.length) {
        conversionHistory = JSON.parse(conversionHistory);
    }

    conversionHistory.push(entry);

    localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory))

    Object.keys(entry).forEach((key) => {
        localStorage.setItem(key, JSON.stringify(entry[key]));
    })
};

export default saveHistory;
function getFormattedDate(daysBack, time = false) {
    let date = new Date();

    daysBack && date.setDate(date.getDate() - daysBack);

    let newDate = date.toISOString().split('T')[0];

    if (time) newDate += ` @ ${date.toTimeString().slice(0,5)}`;

    return newDate;
}

export default getFormattedDate;
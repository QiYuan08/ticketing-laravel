export const getDateFromBackend = (datetime) => {
    let date = new Date(datetime).toUTCString();

    return date.toString().slice(0, date.toString().length - 3);
};

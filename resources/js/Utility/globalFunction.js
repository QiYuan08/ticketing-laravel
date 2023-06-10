export const getDateFromBackend = (datetime) => {
    let date = new Date(datetime).toLocaleString();

    return date.toString().slice(0, date.toString().length - 3);
};

// function to handle attachment array
export const handleAttachmentUtil = (value, attachment) => {
    let tmpArr = attachment;

    Array.from(value).forEach((file) => {
        // check if item already exist in attachment array
        let exist =
            attachment.find(
                (item) => item.name === file.name && item.size === file.size
            ) !== undefined;

        if (exist) {
            // if exist filter out the one with same value, remove the old one
            let index = attachment.findIndex((tmpFilter) => {
                return (
                    tmpFilter.name === file.name && tmpFilter.size === file.size
                );
            });

            tmpArr.splice(index, 1);
        }

        // add the new file
        tmpArr.push(file);
    });

    return tmpArr;
};

// return the size of attachment from bytes to kb, mb etc
export const getAttachmentSize = (size) => {
    let output = "";
    let roundedSize;

    if (size > 1000000) {
        roundedSize = size / 1000000;
        output = roundedSize.toFixed(2) + "MB";
    } else if (size > 1024) {
        roundedSize = size / 1000;
        output = roundedSize.toFixed(2) + "kb";
    } else {
        output = size + "b";
    }

    return output;
};

// function to handle attachment delete
export const handleAttachmentDeleteUtil = (file, attachment) => {
    return attachment.filter(
        (attach) => attach.name !== file.name && attach.size !== file.size
    );
};

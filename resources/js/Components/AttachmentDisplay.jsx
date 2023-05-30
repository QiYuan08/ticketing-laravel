import { getAttachmentSize } from "@/Utility/globalFunction";
import React from "react";

const AttachmentDisplay = ({
    size,
    link,
    isDelete = false,
    isLink = false,
    deleteAttachment,
    name,
}) => {
    return (
        <div
            className={`${
                isLink ? "rounded-sm" : "rounded-none"
            } inline-flex min-w-max items-center justify-between px-5 bg-cyan-100 hover:cursor-pointer`}
        >
            {isLink ? (
                // clickable link
                <div
                    className="cursor-pointer text-cyan-900 hover:text-cyan-800 inline-flex items-center gap-x-2 py-1"
                    onClick={() => window.open(link)}
                >
                    <p>{name}</p>
                    <p>{`(${getAttachmentSize(size)})`}</p>
                </div>
            ) : (
                <div className="inline-flex items-center gap-x-2 py-1">
                    <p>{name}</p>
                    <p>{`(${getAttachmentSize(size)})`}</p>
                </div>
            )}

            {isDelete && (
                <div className="cursor-pointer">
                    <MdDelete
                        onClick={(e) => deleteAttachment(attach)}
                        size={23}
                        color="#E11D48"
                    />
                </div>
            )}
        </div>
    );
};

export default AttachmentDisplay;

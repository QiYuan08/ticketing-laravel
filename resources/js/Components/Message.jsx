import { getDateFromBackend } from "@/Utility/globalFunction";
import React from "react";

const Message = ({ message, userId }) => {
    return (
        <div className="">
            <div
                className={`${
                    message.from.id === userId ? "justify-end" : "justify-start"
                } flex mb-4"`}
            >
                {message.from.id !== userId && (
                    // icon
                    <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                    />
                )}

                {/* message body */}
                <div
                    className={`${
                        message.from.id === userId
                            ? "mr-2 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl"
                            : " ml-2 rounded-tl-xl rounded-br-3xl rounded-tr-3xl"
                    } flex flex-col gap-y-2 py-3 px-4 bg-gray-200`}
                >
                    <div className="flex flex-col gap-y-1">
                        <div className="inline-flex gap-x-1 items-center">
                            <b>To:</b>
                            {message.to.name}
                        </div>
                        <div className="inline-flex gap-x-1 items-center">
                            <b>From:</b>
                            {message.from.name}
                        </div>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{ __html: message.payload }}
                    />
                    <div className="self-end">
                        {getDateFromBackend(message.updated_at)}
                    </div>
                </div>
                {message.from.id === userId && (
                    /* icon */
                    <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                    />
                )}
            </div>
        </div>
    );
};

export default Message;

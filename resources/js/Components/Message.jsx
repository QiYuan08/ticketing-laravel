import { getDateFromBackend } from "@/Utility/globalFunction";
import React from "react";
import AttachmentDisplay from "./AttachmentDisplay";
import { Avatar } from "@material-tailwind/react";
import { FaUserAlt } from "react-icons/fa";

const Message = ({ message, userId }) => {
    return (
        <div className="" key={userId}>
            <div
                className={`${
                    message.sender?.id ? "justify-end" : "justify-start"
                } flex mb-4"`}
            >
                {message.sender?.profilePicture ? (
                    <Avatar
                        src={message.sender.profilePicture}
                        alt="avatar"
                        size="md"
                    />
                ) : (
                    <div className="rounded-full border-[1px] border-gray-600 border-box p-1.5 h-9 w-9">
                        <FaUserAlt color="gray" size={23} />
                    </div>
                )}
                {/* message body */}
                <div
                    className={`${
                        message.sender?.id === userId
                            ? "mr-2 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl"
                            : " ml-2 rounded-tl-xl rounded-br-3xl rounded-tr-3xl"
                    } flex flex-col gap-y-2 py-3 px-4 bg-gray-200 ${
                        message.internal_node ? "bg-orange-200" : ""
                    } `}
                >
                    {message.internal_node && (
                        <div className="text-center italic">
                            **Internal message**
                        </div>
                    )}

                    <div className="flex flex-col gap-y-1">
                        <div className="inline-flex gap-x-1 items-center">
                            <b>To:</b>
                            {message.recipient.name ??
                                message.recipient.pic_name}
                        </div>
                        <div className="inline-flex gap-x-1 items-center">
                            <b>From:</b>
                            {message.sender?.pic_name ?? message.sender?.name}
                        </div>
                        {message.source_ticket && (
                            <div className="inline-flex gap-x-1 items-center">
                                <b>Merged from:</b>
                                {message.source_ticket}
                            </div>
                        )}
                    </div>
                    <div
                        dangerouslySetInnerHTML={{ __html: message.payload }}
                    />
                    <div className="flex flex-col justify-start gap-y-1 mt-3">
                        {message.attachment.map((item, idx) => {
                            return (
                                <AttachmentDisplay
                                    key={idx}
                                    name={item.attachment_name}
                                    size={item.attachment_size}
                                    isLink={true}
                                    link={item.link}
                                />
                            );
                        })}
                    </div>
                    <div className="self-end">
                        {getDateFromBackend(message.updated_at)}
                    </div>
                </div>
                {message.sender?.id === userId && (
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

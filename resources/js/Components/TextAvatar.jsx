import { Typography, Avatar } from "@material-tailwind/react";
import React from "react";
import { FaUserAlt } from "react-icons/fa";

const TextAvatar = ({ text, subtext, img }) => {
    return (
        <div className="flex items-center gap-4">
            {img ? (
                <Avatar src={img} alt="avatar" />
            ) : (
                <div className="rounded-3xl border-[1px] border-gray-600 border-box p-1.5">
                    <FaUserAlt color="gray" size={23} />
                </div>
            )}

            <div>
                <Typography variant="h6">{text}</Typography>
                <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                >
                    {subtext}
                </Typography>
            </div>
        </div>
    );
};

export default TextAvatar;

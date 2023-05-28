import { SUCCESS } from "@/Utility/constant";
import React from "react";
import { ToastContainer } from "react-toastify";

const Notification = ({ message, severity }) => {
    const colour = () => {
        switch (severity) {
            case SUCCESS:
                return "bg-green-300";
            case INFO:
                return "bg-lime-200";
            case ERROR:
                return "bg-red-500";
        }
    };

    return (
        <div
            className="right-3 top-12 z-99 fixed bg-white border-l-4 border-red p-4 py-1.5 rounded shadow-lg flex items-center justify-between delay-75 transition-all ease-in-out duration-500 -translate-x-5"
            role="alert"
        >
            <div className={`h-full w-1 ${colour()} absolute left-0`}></div>
            <div className="sm:text-left text-center sm:mb-0 mb-2">
                <p className={`font-bold mb-1 text-lg`}>{severity}</p>
                <p className="text-grey-dark inline-block">{message}</p>
            </div>
        </div>
    );
};

export default Notification;

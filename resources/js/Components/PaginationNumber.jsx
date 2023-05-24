import React from "react";

const PaginationNumber = ({ value, isActive, onClick }) => {
    return (
        <div
            className={`${
                isActive ? "bg-teal-500 text-white" : "text-teal-500 bg-white"
            } p-2 px-4 rounded-full cursor-pointer`}
            onClick={onClick}
        >
            {value}
        </div>
    );
};

export default PaginationNumber;

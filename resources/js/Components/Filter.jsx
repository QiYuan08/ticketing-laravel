import React, { useState } from "react";
import Checkbox from "./Checkbox";

const Filter = ({ filtered, setFiltered, element }) => {
    const [active, setActive] = useState(false);

    return (
        <div className="flex flex-col items-center space-x-2">
            <div className="relative">
                <button
                    onClick={() => setActive(!active)}
                    className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1"
                >
                    <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                />
                            </svg>
                        </div>
                        <div className="hidden sm:block">Filters</div>
                    </span>
                </button>
            </div>

            {/* filter content */}
            <div
                className={`${
                    active ? "flex flex-col" : "hidden"
                }  bg-white absolute z-10 top-20 p-2 min-w-[40px] w-max shadow-md rounded-md`}
            >
                {element.map((el, idx) => {
                    return (
                        <div className="mr-3 my-1" key={idx}>
                            {el}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Filter;

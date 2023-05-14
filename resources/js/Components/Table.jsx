import React from "react";
import SearchBox from "./SearchBox";

const Table = ({
    header,
    bodyRow,
    searchValue,
    searchRoute,
    haveFilter = true,
}) => {
    return (
        <div className="overflow-x-auto">
            {/* <div className="flex justify-between py-3 pl-2">
                    <SearchBox
                        searchValue={searchValue}
                        searchRoute={searchRoute}
                    />

                    {haveFilter && (
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
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
                                        <div className="hidden sm:block">
                                            Filters
                                        </div>
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}
                </div> */}

            <div className="p-1.5 w-full inline-block align-middle">
                <div className="overflow-x-scroll border rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll">
                        <thead className="bg-gray-50">
                            <tr>
                                {header.map((head, idx) => {
                                    return (
                                        <th
                                            key={idx}
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            {head}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="bg-white">{bodyRow}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;

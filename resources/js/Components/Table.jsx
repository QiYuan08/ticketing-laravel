import React from "react";
import SearchBox from "./SearchBox";

const Table = ({ header, bodyRow }) => {
    return (
        <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
                <div className="border rounded-lg">
                    <table className="table-auto min-w-full divide-y divide-gray-200 lg:table-fixed">
                        <thead className="bg-gray-50">
                            <tr>
                                {header.map((head, idx) => {
                                    return (
                                        <th
                                            key={idx}
                                            scope="col"
                                            className="px-3 py-3 text-sm font-bold text-left text-gray-500 uppercase"
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

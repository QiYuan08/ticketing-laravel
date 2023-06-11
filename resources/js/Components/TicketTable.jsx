import React from "react";
import Table from "./Table";
import StatusTag from "./StatusTag";
import { getDateFromBackend } from "@/Utility/globalFunction";
import { Link } from "@inertiajs/react";

const TicketTable = ({ data, pagination }) => {
    return (
        <div>
            <p className="pl-4 py-2.5 text-sm font-semibold text-gray-800">
                Page {pagination.current_page} of {pagination.last_page}
            </p>
            <Table
                searchValue={"Seach by ticket ID, requestor, type, subject"}
                header={[
                    "Ticket ID",
                    "Status",
                    "Subject",
                    "Type",
                    "Requestor",
                    "Assignee",
                    "Requested At",
                    "Priority",
                    "Edit",
                    "Delete",
                ]}
                bodyRow={
                    data && data.length > 0 ? (
                        data.map((row, idx) => {
                            return (
                                <tr
                                    className="odd:bg-gray-100 break-words"
                                    key={idx}
                                >
                                    <td className="px-2 py-4 text-sm text-center font-medium text-gray-800">
                                        {row.ticket_id}
                                    </td>
                                    <td className="px-2 py-4 text-sm font-medium text-gray-800  w-1 ">
                                        <StatusTag
                                            status={row.status?.name ?? ""}
                                        />
                                    </td>
                                    <td className="px-2 py-4 text-sm text-gray-800 w-3/12">
                                        {row.subject}
                                    </td>
                                    <td className="px-2 py-4 text-sm text-gray-800 ">
                                        {row.type?.name}
                                    </td>
                                    <td className="px-2 py-4 text-sm text-gray-800 w-1/6">
                                        {row.requestor.pic_name}
                                    </td>
                                    <td className="px-2 py-4 text-sm text-gray-800 w-1/6">
                                        {row.assignee?.name}
                                    </td>
                                    <td className="px-2 py-4 text-sm text-gray-800 w-2/12">
                                        {getDateFromBackend(row.created_at)}
                                    </td>
                                    <td className="px-2 py-4 text-sm text-gray-800">
                                        <StatusTag
                                            status={row.priority?.name}
                                        />
                                    </td>
                                    <td className="px-2 py-4 text-sm font-medium text-left ">
                                        <Link
                                            href={route("ticket.get", {
                                                ticketID: row.ticket_id,
                                            })}
                                            as="button"
                                            className="text-blue-700 hover:text-blue-800 "
                                            method="get"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                    <td className="px-2 py-4 text-sm font-medium text-left ">
                                        <Link
                                            href={route("ticket.delete", {
                                                ticketID: row.ticket_id,
                                            })}
                                            as="button"
                                            className="text-red-700 hover:text-red-800 "
                                            method="delete"
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr className="break-words">
                            <td
                                className="px-2 py-4 text-md text-center font-medium text-gray-900"
                                colSpan={10}
                            >
                                No Ticket Found
                            </td>
                        </tr>
                    )
                }
            />
        </div>
    );
};

export default TicketTable;

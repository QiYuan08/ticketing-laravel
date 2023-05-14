import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { getDateFromBackend } from "@/Utility/globalFunction";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-5">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg "></div>
                    <Table
                        searchValue={
                            "Seach by ticket ID, requestor, type, subject"
                        }
                        header={[
                            "Ticket ID",
                            "Ticket status",
                            "Subject",
                            "Type",
                            "Requestor",
                            "Requested At",
                            "Priority",
                            "Edit",
                            "Delete",
                        ]}
                        bodyRow={props.data.map((row, idx) => {
                            return (
                                <tr className="odd:bg-gray-100" key={idx}>
                                    <td className="px-6 py-4 text-sm  font-medium text-gray-800 whitespace-nowrap">
                                        {row.ticket_id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {row.status?.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {row.subject}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {row.type?.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"></td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {getDateFromBackend(row.updated_at)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                        {row.priority?.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                        <Link
                                            href={route("ticket", {
                                                ticketID: row.ticket_id,
                                            })}
                                            as="button"
                                            className="text-blue-700 hover:text-blue-800 "
                                            method="get"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                        <Link
                                            href={route("ticket", {
                                                ticketID: row.ticket_id,
                                            })}
                                            as="button"
                                            className="text-red-700 hover:text-red-800 "
                                            method="delete"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import Checkbox from "@/Components/Checkbox";
import Filter from "@/Components/Filter";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SearchBox from "@/Components/SearchBox";
import StatusTag from "@/Components/StatusTag";
import Table from "@/Components/Table";
import { useDebounce } from "@/Hooks/useDebounce";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { getDateFromBackend } from "@/Utility/globalFunction";
import { Head, Link, router, useForm } from "@inertiajs/react";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";

function Dashboard(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        all: true,
        high: true,
        medium: true,
        low: true,
        open: true,
        deleted: true,
        pending: true,
        solved: true,
        searchTerm: "",
    });

    const handleCheckbox = (event) => {
        setData(event.target.id, event.target.checked);
        debounceSearchAPI();
    };

    // debounce to call API
    const debounceSearchAPI = useDebounce(() => {
        console.log("calling APi ");
        router.visit(`/dashboard`, {
            method: "get",
            data: data,
            preserveScroll: true,
            preserveState: true,
        });
    });

    return (
        <>
            <Head title="Dashboard" />

            <Card>
                <CardBody>
                    <div className="max-w-8xl mx-auto sm:px-3 lg:px-4">
                        <div className="flex justify-between py-3 px-2">
                            <SearchBox
                                searchValue={"Search by ticket ID, subject"}
                                searchTerm={data.searchTerm}
                                setSearchTerm={(value) => {
                                    setData("searchTerm", value);
                                    debounceSearchAPI();
                                }}
                            />

                            <Filter
                                element={[
                                    <Checkbox
                                        labelText={"Priority High"}
                                        id="high"
                                        className="hover:before:opacity-0"
                                        checked={data.high}
                                        onChange={handleCheckbox}
                                    />,
                                    <Checkbox
                                        labelText={"Priority Medium"}
                                        id="medium"
                                        className="hover:before:opacity-0"
                                        checked={data.medium}
                                        onChange={handleCheckbox}
                                    />,
                                    <Checkbox
                                        labelText={"Priority Low"}
                                        id="low"
                                        className="hover:before:opacity-0"
                                        checked={data.low}
                                        onChange={handleCheckbox}
                                    />,
                                    <Checkbox
                                        labelText={"Status Open"}
                                        id="open"
                                        className="hover:before:opacity-0"
                                        checked={data.open}
                                        onChange={handleCheckbox}
                                    />,
                                    <Checkbox
                                        labelText={"Status Pending"}
                                        id="pending"
                                        className="hover:before:opacity-0"
                                        checked={data.pending}
                                        onChange={handleCheckbox}
                                    />,
                                    <Checkbox
                                        labelText={"Status Solved"}
                                        id="solved"
                                        className="hover:before:opacity-0"
                                        checked={data.solved}
                                        onChange={handleCheckbox}
                                    />,
                                    <Checkbox
                                        labelText={"Status Deleted"}
                                        id="deleted"
                                        className="hover:before:opacity-0"
                                        checked={data.deleted}
                                        onChange={handleCheckbox}
                                    />,
                                ]}
                            />
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg "></div>
                        <Table
                            header={[
                                "Ticket ID",
                                "Status",
                                "Subject",
                                "Type",
                                "Requestor",
                                "Assignee",
                                "Requested At",
                                "Priority",
                                "Action",
                            ]}
                            bodyRow={
                                props.data?.data?.length > 0 ? (
                                    props.data.data.map((row, idx) => {
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
                                                        status={
                                                            row.status?.name
                                                        }
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
                                                    {row.assignee.name}
                                                </td>
                                                <td className="px-2 py-4 text-sm text-gray-800 w-2/12">
                                                    {getDateFromBackend(
                                                        row.created_at
                                                    )}
                                                </td>
                                                <td className="px-2 py-4 text-sm text-gray-800">
                                                    <StatusTag
                                                        status={
                                                            row.priority?.name
                                                        }
                                                    />
                                                </td>
                                                <td className="flex items-center gap-2.5 justify-evenly px-2 py-4 text-sm font-medium text-left ">
                                                    <Link
                                                        href={route(
                                                            "ticket.get",
                                                            {
                                                                ticketID:
                                                                    row.ticket_id,
                                                            }
                                                        )}
                                                        as="button"
                                                        className="text-blue-700 hover:text-blue-800 "
                                                        method="get"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "ticket.delete",
                                                            row.ticket_id
                                                        )}
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
                                    <tr className="odd:bg-gray-100 break-words">
                                        <td
                                            colSpan={9}
                                            className="text-center p-2"
                                        >
                                            No ticket has been assigned to you
                                            yet
                                        </td>
                                    </tr>
                                )
                            }
                        />
                    </div>
                </CardBody>
                <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4 px-8">
                    <Pagination pagination={props.data} data={data} />
                    {/* <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <PrimaryButton>Previous</PrimaryButton>
                    <PrimaryButton>Next</PrimaryButton>
                </div> */}
                </CardFooter>
            </Card>
        </>
    );
}

Dashboard.layout = (page) => (
    <AuthenticatedLayout
        children={page}
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard (View and edit ticket assigned to you)
            </h2>
        }
    />
);

export default Dashboard;

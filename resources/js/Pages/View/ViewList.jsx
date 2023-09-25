import Checkbox from "@/Components/Checkbox";
import Filter from "@/Components/Filter";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SearchBox from "@/Components/SearchBox";
import TicketTable from "@/Components/TicketTable";
import { useDebounce } from "@/Hooks/useDebounce";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import React from "react";

const ViewList = (props) => {
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
        router.visit(route("views.list"), {
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

                            <div className="flex gap-x-2 flex-end">
                                <PrimaryButton
                                    className="h-[37px]"
                                    onClick={() =>
                                        router.get(
                                            route("ticket.create-new-ticket")
                                        )
                                    }
                                >
                                    New Ticket
                                </PrimaryButton>
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
                        </div>
                    </div>
                    <TicketTable
                        data={props.data.data}
                        pagination={props.data}
                        // alert={props.alert}
                    />
                </CardBody>
                <CardFooter>
                    <Pagination pagination={props.data} preserveState={true} />
                </CardFooter>
            </Card>
        </>
    );
};

ViewList.layout = (page) => (
    <Authenticated
        children={page}
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard (View and edit ticket assigned to you)
            </h2>
        }
    />
);

export default ViewList;

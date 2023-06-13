import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import StatusTag from "@/Components/StatusTag";
import Table from "@/Components/Table";
import TicketTable from "@/Components/TicketTable";
import { getDateFromBackend } from "@/Utility/globalFunction";
import { Link, router } from "@inertiajs/react";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import React from "react";

const CustomerTicketsTab = ({ tickets }) => {
    const generatePdf = () => {
        router.visit(route("utility.generate-ticket-pdf"), {
            method: "get",
            onSuccess: (response) => {
                console.log(response, response.data);
            },
        });
    };
    return (
        <Card>
            <CardBody>
                <div className="flex justify-end items-center px-4">
                    <PrimaryButton onClick={generatePdf}>
                        Download ticket
                    </PrimaryButton>
                </div>
                <div className="max-w-8xl mx-auto sm:px-2 lg:px-1.5">
                    <TicketTable data={tickets.data} pagination={tickets} />
                </div>
            </CardBody>
            <CardFooter>
                <Pagination pagination={tickets} preserveState={true} />
            </CardFooter>
        </Card>
    );
};

export default CustomerTicketsTab;

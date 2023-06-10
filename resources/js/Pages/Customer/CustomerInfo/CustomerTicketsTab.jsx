import Pagination from "@/Components/Pagination";
import StatusTag from "@/Components/StatusTag";
import Table from "@/Components/Table";
import TicketTable from "@/Components/TicketTable";
import { getDateFromBackend } from "@/Utility/globalFunction";
import { Link } from "@inertiajs/react";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import React from "react";

const CustomerTicketsTab = ({ tickets }) => {
    console.log(tickets);
    return (
        <Card>
            <CardBody>
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

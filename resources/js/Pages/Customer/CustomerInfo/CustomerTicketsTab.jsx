import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import StatusTag from "@/Components/StatusTag";
import Table from "@/Components/Table";
import TicketTable from "@/Components/TicketTable";
import { getDateFromBackend } from "@/Utility/globalFunction";
import { Link, router, useForm } from "@inertiajs/react";
import {
    Card,
    CardBody,
    CardFooter,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Button,
} from "@material-tailwind/react";
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import axios from "axios";

const CustomerTicketsTab = ({ customer_id, tickets }) => {
    const [open, setOpen] = React.useState(false);
    const { data, setData } = useForm({
        customer_id: customer_id,
        startDate: "",
        endDate: "",
    });

    const handleOpen = () => setOpen(!open);

    const generatePdf = () => {
        console.log(new Date(data.startDate).getTime());

        // router.visit(route("utility.generate-ticket-pdf"), {
        //     method: "post",
        //     data: data,
        //     onSuccess: (response) => {
        //         console.log(response, response.data);

        //         handleOpen();
        //     },
        // });
        const link = document.createElement("a");
        link.href = route("utility.generate-ticket-pdf", {
            customer_id: data.customer_id,
            startDate: data.startDate,
            endDate: data.endDate,
        });

        // link.setAttribute("download", "history.pdf");
        link.setAttribute("target", "blank");
        document.body.appendChild(link);
        link.click();

        // axios
        //     .post(route("utility.generate-ticket-pdf"), {
        //         responseType: "blob",
        //         data,
        //     })
        //     .then((response) => {
        //         const url = window.URL.createObjectURL(
        //             new Blob([response.data], { type: "application/pdf" })
        //         );
        //         const link = document.createElement("a");
        //         link.href = url;

        //         console.log(response, link, url);
        //         link.setAttribute("download", "history.pdf");
        //         document.body.appendChild(link);
        //         link.click();
        //     })
        //     .catch((error) => {
        //         console.error("Error generating PDF:", error);
        //     });

        // router.visit(route("utility.generate-ticket-pdf"), {
        //     method: "get",
        //     data: data,
        //     onSuccess: (response) => {
        //         console.log(response, response.data);

        //         handleOpen();
        //     },
        // });
    };
    return (
        <>
            <Card>
                <CardBody>
                    <div className="flex justify-end items-center px-4">
                        <PrimaryButton onClick={handleOpen}>
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

            {/* Dialog popup tab */}
            <Dialog open={open} handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader>Download ticket history</DialogHeader>
                    <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
                </div>
                <DialogBody divider>
                    <div className="flex justify-evenly items-center">
                        <InputLabel>Start Date</InputLabel>
                        <input
                            type="date"
                            onChange={(e) => {
                                setData("startDate", e.target.value);
                            }}
                        />

                        <InputLabel>End Date</InputLabel>
                        <input
                            type="date"
                            onChange={(e) => setData("endDate", e.target.value)}
                        />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <SecondaryButton
                        variant="outlined"
                        color="red"
                        onClick={handleOpen}
                    >
                        close
                    </SecondaryButton>
                    <PrimaryButton
                        variant="gradient"
                        color="green"
                        onClick={generatePdf}
                    >
                        Download
                    </PrimaryButton>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default CustomerTicketsTab;

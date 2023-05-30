import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Card,
    CardBody,
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
} from "@material-tailwind/react";
import React from "react";
import { BiCategoryAlt } from "react-icons/bi";
import TicketType from "./TicketType";

const Index = (props) => {
    console.log(props);
    const data = [
        {
            label: "Ticket Type",
            value: "type",
            icon: <BiCategoryAlt className="w-5 h-5" />,
            desc: <TicketType types={props.type} alert={props.alert} />,
        },
    ];

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Settings
                </h2>
            }
        >
            <Head title="Ticket Settings" />

            <div className="max-w-7xl mx-auto">
                <Tabs value="type" orientation="vertical">
                    <TabsHeader className="w-48 min-h-30 bg-white mr-5">
                        {data.map(({ label, value, icon }) => (
                            <div
                                key={value}
                                value={value}
                                className="bg-white p-3 m-0.5 rounded-md place-items-start z-1"
                            >
                                <div className="flex items-center gap-2 z-1">
                                    {icon}
                                    {label}
                                </div>
                            </div>
                        ))}
                    </TabsHeader>
                    <TabsBody>
                        <Card>
                            <CardBody>
                                {data.map(({ value, desc }) => (
                                    <TabPanel
                                        key={value}
                                        value={value}
                                        className="py-0"
                                    >
                                        {desc}
                                    </TabPanel>
                                ))}
                            </CardBody>
                        </Card>
                    </TabsBody>
                </Tabs>
            </div>
        </Authenticated>
    );
};

export default Index;

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
import React, { useEffect, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { MdMarkEmailUnread } from "react-icons/md";
import TicketType from "./TicketType";
import EmailTemplate from "./EmailTemplate";

const Index = (props) => {
    const [orientation, setOrientation] = useState("vertical");

    const data = [
        {
            label: "Ticket Type",
            value: "type",
            icon: <BiCategoryAlt className="w-5 h-5" />,
            desc: <TicketType types={props.type} alert={props.alert} />,
        },
        {
            label: "Email Template",
            value: "email",
            icon: <MdMarkEmailUnread className="w-5 h-5" />,
            desc: (
                <EmailTemplate
                    templates={props.mailTemplate}
                    alert={props.alert}
                />
            ),
        },
    ];

    useEffect(() => {
        // if it's mobile then use horizontal tab
        if (window.innerWidth <= 768) {
            setOrientation("horizontal");
        } else {
            setOrientation("vertical");
        }
    }, []);

    return (
        <>
            <Head title="Ticket Settings" />

            <div className="max-w-8xl mx-auto">
                <Tabs value="email" orientation={orientation}>
                    <TabsHeader className="w-48 min-h-30 bg-white mr-5">
                        {data.map(({ label, value, icon }) => (
                            <Tab key={value} value={value}>
                                <div className="flex items-center gap-2">
                                    {icon}
                                    {label}
                                </div>
                            </Tab>
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
        </>
    );
};

Index.layout = (page) => (
    <Authenticated
        children={page}
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Settings (Customize the behaviour of your apps)
            </h2>
        }
    />
);

export default Index;

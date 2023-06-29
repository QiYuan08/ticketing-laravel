import { useDebounce } from "@/Hooks/useDebounce";
import { Head, router, useForm } from "@inertiajs/react";
import {
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
} from "@material-tailwind/react";
import { AiOutlineHistory } from "react-icons/ai";
import { GrCircleInformation } from "react-icons/gr";
import CustomerInfoTab from "./CustomerInfoTab";
import CustomerTicketsTab from "./CustomerTicketsTab";
import Authenticated from "@/Layouts/AuthenticatedLayout";

const CustomerInfoIndex = (props) => {
    const tabs = [
        {
            label: "Customer Info",
            value: "info",
            icon: <GrCircleInformation size={20} />,
            desc: (
                <CustomerInfoTab
                    customer={props.data}
                    customerId={props.data.customer_id}
                    alert={props.alert}
                />
            ),
        },
        {
            label: "Ticket History",
            value: "tickets",
            icon: <AiOutlineHistory size={20} />,
            desc: (
                <CustomerTicketsTab
                    tickets={props.tickets}
                    customer_id={props.data.customer_id}
                />
            ),
        },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        searchTerm: null,
    });

    // debounce to call API
    const debounceSearchAPI = useDebounce(() => {
        console.log("calling APi ");
        router.visit(route("customer.list"), {
            method: "get",
            data: data,
            preserveScroll: true,
            preserveState: true,
        });
    });

    return (
        <>
            <Head title="Customer Details" />

            <div className="max-w-7xl mx-auto">
                <Tabs value={props.tab ?? "info"}>
                    <div className="max-w-3xl">
                        <TabsHeader>
                            {tabs.map(({ label, value, icon }) => (
                                <Tab key={value} value={value}>
                                    <div className="flex items-center gap-2">
                                        {icon}
                                        {label}
                                    </div>
                                </Tab>
                            ))}
                        </TabsHeader>
                    </div>
                    <TabsBody>
                        {tabs.map(({ value, desc }) => (
                            <TabPanel key={value} value={value}>
                                {desc}
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
            </div>
        </>
    );
};

CustomerInfoIndex.layout = (page) => (
    <Authenticated
        children={page}
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Customer Details (View and edit your customer detailed
                information)
            </h2>
        }
    />
);

export default CustomerInfoIndex;

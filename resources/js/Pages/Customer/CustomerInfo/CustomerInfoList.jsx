import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SearchBox from "@/Components/SearchBox";
import Table from "@/Components/Table";
import { useDebounce } from "@/Hooks/useDebounce";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { getDateFromBackend } from "@/Utility/globalFunction";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";

const CustomerInfoList = (props) => {
    let pagination = props.data;

    const { data, setData, post, processing, errors, reset } = useForm({
        searchTerm: null,
    });

    // debounce to call API
    const debounceSearchAPI = useDebounce(() => {
        console.log("calling APi ");
        router.visit(route("customer.info.list"), {
            method: "get",
            data: data,
            preserveScroll: true,
            preserveState: true,
        });
    });

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Customer Info (View and edit your customer detailed
                    information)
                </h2>
            }
        >
            <Head title="Customer Details" />
            <Card className="">
                <CardBody>
                    <div className="max-w-8xl mx-auto sm:px-3 lg:px-4">
                        <div className="flex justify-between py-3 px-2">
                            <SearchBox
                                searchValue={
                                    "Search by customer name, id, company"
                                }
                                searchRoute={""}
                                searchTerm={data.searchTerm}
                                setSearchTerm={(value) => {
                                    setData("searchTerm", value);
                                    debounceSearchAPI();
                                }}
                            />
                        </div>

                        <div className=" ">
                            <Table
                                searchValue={"Seach by email, name, role"}
                                searchRoute={"customer"}
                                haveFilter={false}
                                header={[
                                    "Customer ID",
                                    "PIC Name",
                                    "Phone Number",
                                    "Mobile Number",
                                    "Company Name",
                                    "Created On",
                                    "Updated On",
                                    "Action",
                                ]}
                                bodyRow={props.data.data.map(
                                    (customer, idx) => {
                                        return (
                                            <tr
                                                className="even:bg-gray-100 hover:shadow-gray-600"
                                                key={idx}
                                            >
                                                <td className="px-1 py-4 text-sm font-medium text-gray-800 text-center">
                                                    {customer.alias_customer_id}
                                                </td>
                                                <td
                                                    className="px-3 py-4 text-sm font-medium text-gray-800 hover:font-bold hover:cursor-pointer"
                                                    onClick={() =>
                                                        viewCustomerDetail(
                                                            customer.customer_id
                                                        )
                                                    }
                                                >
                                                    {customer.pic_name}
                                                </td>
                                                <td className="px-3 py-4 text-sm font-medium text-gray-800">
                                                    {customer.phone_number}
                                                </td>
                                                <td className="px-3 py-4 text-sm font-medium text-gray-800">
                                                    {customer.mobile_number}
                                                </td>
                                                <td className="px-3 py-4 text-sm font-medium text-gray-800">
                                                    {customer.company}
                                                </td>
                                                <td className="px-3 py-4 text-sm font-medium text-gray-800 w-1/6">
                                                    {getDateFromBackend(
                                                        customer.created_at
                                                    )}
                                                </td>
                                                <td className="px-3 py-4 text-sm font-medium text-gray-800 w-1/6">
                                                    {getDateFromBackend(
                                                        customer.updated_at
                                                    )}
                                                </td>
                                                <td className="flex items-center px-3 py-4 text-sm font-medium text-gray-800 text-center space-x-4 w-1/12 hover:font-semibold">
                                                    <Link
                                                        href={route(
                                                            "customer.info.details",
                                                            customer.customer_id
                                                        )}
                                                        method="get"
                                                        as="button"
                                                        className="text-blue-700 hover:text-blue-800 "
                                                    >
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            />
                        </div>
                    </div>
                </CardBody>
                <CardFooter>
                    <div className="flex justify-between items-center px-6 gap-1">
                        <div className="justify-self-start">
                            {`Page ${pagination.current_page} of ${pagination.last_page}`}
                        </div>
                        <Pagination pagination={pagination} data={data} />
                    </div>
                </CardFooter>
            </Card>
        </Authenticated>
    );
};

export default CustomerInfoList;

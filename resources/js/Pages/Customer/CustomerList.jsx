import PrimaryButton from "@/Components/PrimaryButton";
import SearchBox from "@/Components/SearchBox";
import Table from "@/Components/Table";
import { useDebounce } from "@/Hooks/useDebounce";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { getDateFromBackend } from "@/Utility/globalFunction";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import { debounce } from "lodash";
import React, { useCallback, useEffect } from "react";
import PaginationNumber from "@/Components/PaginationNumber";
import Pagination from "@/Components/Pagination";

const CustomerList = (props) => {
    let pagination = props.data;

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

    const viewCustomerDetail = (customerId) => {
        router.visit(route("customer.details", customerId), {
            method: "get",
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Customer (View and manage your customer )
                </h2>
            }
        >
            <Head title="Customer List" />

            <Card>
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

                            <PrimaryButton
                                onClick={() => {
                                    router.visit(route("customer.create"));
                                }}
                            >
                                Add Customer
                            </PrimaryButton>
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
                                                className="odd:bg-gray-100 cursor-pointer hover:shadow-gray-600"
                                                key={idx}
                                                onClick={() =>
                                                    viewCustomerDetail(
                                                        customer.customer_id
                                                    )
                                                }
                                            >
                                                <td className="px-1 py-4 text-sm font-medium text-gray-800 text-center">
                                                    {customer.alias_customer_id}
                                                </td>
                                                <td className="px-3 py-4 text-sm font-medium text-gray-800 ">
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
                                                <td className="px-3 py-4 text-sm font-medium text-gray-800 text-left space-x-4 w-1/12">
                                                    <Link
                                                        // href={route("customer", {
                                                        //     agentID: customer.id,
                                                        // })}
                                                        as="button"
                                                        className="text-blue-700 hover:text-blue-800 "
                                                        method="get"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        // href={route(
                                                        //     "customer.delete",
                                                        //     {
                                                        //         agentID:
                                                        //             customer.id,
                                                        //     }
                                                        // )}
                                                        as="button"
                                                        className="text-red-700 hover:text-red-800 "
                                                        method="delete"
                                                    >
                                                        Delete
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

export default CustomerList;

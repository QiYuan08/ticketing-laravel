import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SearchBox from "@/Components/SearchBox";
import Select from "@/Components/Select";
import Table from "@/Components/Table";
import { useDebounce } from "@/Hooks/useDebounce";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { getDateFromBackend } from "@/Utility/globalFunction";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";

const CustomerInfoList = (props) => {
    let pagination = props.data;

    const jobOrderDropdown = [];

    for (var i = 0; i <= 24; i += 0.5) {
        jobOrderDropdown.push({
            value: i,
            label: i.toString(), // You can format the label as needed
        });
    }

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
        <>
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
                        <div className="overflow-x-auto">
                            <div className="p-1.5 w-full inline-block align-middle">
                                <div className="border rounded-lg">
                                    <table className="table-auto min-w-full divide-y divide-gray-200 lg:table-fixed">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3 text-sm font-bold text-left text-gray-500 uppercase"
                                                >
                                                    Customer ID
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3 text-sm font-bold text-left text-gray-500 uppercase"
                                                    style={{ width: "15%" }}
                                                >
                                                    PIC Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3 text-sm font-bold text-center text-gray-500 uppercase"
                                                    style={{ width: "8%" }}
                                                >
                                                    Job Order
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3 text-sm font-bold text-left text-gray-500 uppercase"
                                                >
                                                    Email
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3 text-sm font-bold text-left text-gray-500 uppercase"
                                                >
                                                    Phone Number
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3 text-sm font-bold text-left text-gray-500 uppercase"
                                                >
                                                    Mobile Number
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3 text-sm font-bold text-left text-gray-500 uppercase"
                                                >
                                                    Company Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3 text-sm font-bold text-center text-gray-500 uppercase"
                                                    style={{ width: "12%" }}
                                                >
                                                    Updated On
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3 text-sm font-bold text-center text-gray-500 uppercase"
                                                    style={{ width: "8%" }}
                                                >
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {props.data.data.map(
                                                (customer, idx) => {
                                                    return (
                                                        <tr
                                                            className="even:bg-gray-100 hover:shadow-gray-600"
                                                            key={idx}
                                                        >
                                                            <td className="px-1 py-4 text-sm font-medium text-gray-800 text-center">
                                                                {
                                                                    customer.alias_customer_id
                                                                }
                                                            </td>

                                                            <td
                                                                className="px-3 py-4 text-sm font-medium text-gray-800 hover:font-bold hover:cursor-pointer"
                                                                onClick={() =>
                                                                    viewCustomerDetail(
                                                                        customer.customer_id
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    customer.pic_name
                                                                }
                                                            </td>
                                                            {console.log(
                                                                jobOrderDropdown.find(
                                                                    (el) =>
                                                                        el.value ===
                                                                        customer?.job_order
                                                                ),
                                                                customer.job_order
                                                            )}
                                                            <th
                                                                scope="col"
                                                                className="px-3 py-3 text-sm font-bold text-center text-gray-500 uppercase"
                                                            >
                                                                <Select
                                                                    items={
                                                                        jobOrderDropdown
                                                                    }
                                                                    selected={jobOrderDropdown.find(
                                                                        (el) =>
                                                                            el.value ==
                                                                            customer.job_order
                                                                    )}
                                                                    name="deduction_rate"
                                                                    identifier="value"
                                                                    setSelected={(
                                                                        value
                                                                    ) => {
                                                                        router.visit(
                                                                            route(
                                                                                "customer.info.update-job-order",
                                                                                customer.customer_id
                                                                            ),
                                                                            {
                                                                                method: "patch",
                                                                                data: {
                                                                                    jobOrder:
                                                                                        value.value,
                                                                                },
                                                                                preserveScroll: true,
                                                                                onSuccess:
                                                                                    () => {
                                                                                        open(
                                                                                            alert.success,
                                                                                            SUCCESS
                                                                                        );
                                                                                    },
                                                                                onError:
                                                                                    (
                                                                                        errors
                                                                                    ) => {
                                                                                        open(
                                                                                            errors.name,
                                                                                            ERROR
                                                                                        );
                                                                                    },
                                                                            }
                                                                        );
                                                                    }}
                                                                    render={(
                                                                        item
                                                                    ) => {
                                                                        return jobOrderDropdown.find(
                                                                            (
                                                                                el
                                                                            ) =>
                                                                                el.value ===
                                                                                item?.value
                                                                        )
                                                                            ?.label;
                                                                    }}
                                                                />
                                                            </th>
                                                            <td className="px-3 py-4 text-sm font-medium text-gray-800">
                                                                {customer.email}
                                                            </td>
                                                            <td className="px-3 py-4 text-sm font-medium text-gray-800">
                                                                {
                                                                    customer.phone_number
                                                                }
                                                            </td>
                                                            <td className="px-3 py-4 text-sm font-medium text-gray-800">
                                                                {
                                                                    customer.mobile_number
                                                                }
                                                            </td>
                                                            <td className="px-3 py-4 text-sm font-medium text-gray-800">
                                                                {
                                                                    customer.company
                                                                }
                                                            </td>
                                                            <td className="px-3 py-4 text-sm font-medium text-gray-800 text-center">
                                                                {getDateFromBackend(
                                                                    customer.updated_at
                                                                )}
                                                            </td>
                                                            <td className="flex justify-center items-center px-3 py-4 text-sm text-center font-medium text-gray-800 space-x-4 hover:font-semibold">
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className=" ">
                            {/* <Table
                                searchValue={"Seach by email, name, role"}
                                searchRoute={"customer"}
                                haveFilter={false}
                                header={[
                                    "Customer ID",
                                    "PIC Name",
                                    "Email",
                                    "Phone Number",
                                    "Mobile Number",
                                    "Company Name",
                                    "Updated On",
                                    "Action",
                                ]}
                                bodyRow={
                            /> */}
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
        </>
    );
};

CustomerInfoList.layout = (page) => (
    <Authenticated
        children={page}
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Customer Info (View and edit your customer detailed information)
            </h2>
        }
    />
);

export default CustomerInfoList;

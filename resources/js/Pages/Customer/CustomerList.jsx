import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SearchBox from "@/Components/SearchBox";
import Table from "@/Components/Table";
import { useNotificationContext } from "@/Context/NotificationContext";
import { useDebounce } from "@/Hooks/useDebounce";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { getDateFromBackend, isAdmin } from "@/Utility/globalFunction";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";

const CustomerList = (props) => {
    const { auth } = usePage().props;
    let pagination = props.data;

    const { data, setData, post, processing, errors, reset } = useForm({
        searchTerm: null,
    });

    // debounce to call API
    const debounceSearchAPI = useDebounce(() => {
        router.visit(route("customer.list"), {
            method: "get",
            data: data,
            preserveScroll: true,
            preserveState: true,
        });
    });

    const deleteCustomer = (customerId) => {
        router.delete(route("customer.delete", customerId), {
            onSuccess: () => {
                console.log("success");
            },
        });
    };

    const viewCustomerInfo = (customerId) => {
        router.visit(route("customer.info.details", customerId), {
            method: "get",
        });
    };

    return (
        <>
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

                            {isAdmin(auth.user.role.name) && (
                                <PrimaryButton
                                    onClick={() => {
                                        console.log(2);
                                        router.get(
                                            route(
                                                "customer.new",
                                                "7487f175-c868-3f80-9b9f-93184d41f44a"
                                            )
                                        );
                                    }}
                                >
                                    Add Customer
                                </PrimaryButton>
                            )}
                        </div>

                        <div className=" ">
                            <Table
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
                                bodyRow={props.data.data.map(
                                    (customer, idx) => {
                                        return (
                                            <tr
                                                className="even:bg-gray-100 hover:shadow-gray-600"
                                                key={idx}
                                            >
                                                <td
                                                    className="px-1 py-4 text-sm font-medium text-gray-800 text-center hover:font-bold cursor-pointer"
                                                    onClick={() =>
                                                        viewCustomerInfo(
                                                            customer.customer_id
                                                        )
                                                    }
                                                >
                                                    {customer.alias_customer_id}
                                                </td>
                                                <td
                                                    className="px-3 py-4 text-sm font-medium text-gray-800 hover:font-bold cursor-pointer"
                                                    onClick={() =>
                                                        viewCustomerInfo(
                                                            customer.customer_id
                                                        )
                                                    }
                                                >
                                                    {customer.pic_name}
                                                </td>
                                                <td className="px-3 py-4 text-sm font-medium text-gray-800">
                                                    {customer.email}
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
                                                        customer.updated_at
                                                    )}
                                                </td>
                                                <td className="flex items-center px-3 py-4 text-sm font-medium text-gray-800 text-left space-x-4 w-1/12 hover:font-semibold">
                                                    <Link
                                                        href={route(
                                                            "customer.details",
                                                            customer.customer_id
                                                        )}
                                                        method="get"
                                                        as="button"
                                                        className="text-blue-700 hover:text-blue-800 "
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        className="text-red-700 hover:text-red-800"
                                                        onClick={() =>
                                                            deleteCustomer(
                                                                customer.customer_id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
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
        </>
    );
};

CustomerList.layout = (page) => (
    <Authenticated
        children={page}
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Manage Customer (Manage your customer pool)
            </h2>
        }
    />
);

export default CustomerList;

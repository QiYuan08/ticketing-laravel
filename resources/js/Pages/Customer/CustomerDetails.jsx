import { useNotificationContext } from "@/Context/NotificationContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { Card, CardBody } from "@material-tailwind/react";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import CustomerDetailInput from "./CustomerDetailInput";
import Notification from "@/Components/Notification";
import { SUCCESS } from "@/Utility/constant";
import { toast } from "react-toastify";

const CustomerDetails = (props) => {
    const customer = props.customer;

    const { open } = useNotificationContext();
    const [edit, setEdit] = useState(false);
    const { data, setData, patch, errors } = useForm({
        customerId: customer.alias_customer_id,
        newCustomerId: customer.alias_customer_id,
        email: customer.email,
        picName: customer.pic_name,
        phoneNumber: customer.phone_number,
        mobileNumber: customer.mobile_number,
        companyName: customer.company,
        address: customer.company_address,
        // additionalInfo: customer.additional_info,
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleSubmit = () => {
        patch(route("customer.update", customer.customer_id), {
            data: data,
            preserveState: false,
            preserveScroll: true,
            onSuccess: () => {
                open(props.alert.success, SUCCESS);
            },
        });
    };

    return (
        <>
            <Head title="Customer Details" />

            <Card className="max-w-5xl mx-auto">
                <CardBody>
                    <div className="max-w-5xl mx-auto">
                        <div className="flex justify-between items-center px-5 sm:px-0">
                            <div className="">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">
                                    Customer Information
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                    Customer personal details and information.
                                </p>
                            </div>
                            <AiOutlineEdit
                                size={20}
                                className="md:mr-2 cursor-pointer"
                                onClick={() => setEdit(!edit)}
                            />
                        </div>
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <CustomerDetailInput
                                    edit={edit}
                                    value={data.newCustomerId}
                                    handleChange={handleOnChange}
                                    error={errors.newCustomerId}
                                    inputName="newCustomerId"
                                    field="Customer ID"
                                />

                                <CustomerDetailInput
                                    edit={edit}
                                    value={data.picName}
                                    handleChange={handleOnChange}
                                    error={errors.picName}
                                    inputName="picName"
                                    field="Full name"
                                />

                                <CustomerDetailInput
                                    edit={edit}
                                    value={data.email}
                                    handleChange={handleOnChange}
                                    error={errors.email}
                                    inputName="email"
                                    field="Email"
                                />

                                <CustomerDetailInput
                                    edit={edit}
                                    value={data.phoneNumber}
                                    handleChange={handleOnChange}
                                    inputName="phoneNumber"
                                    field="Phone Number"
                                />

                                <CustomerDetailInput
                                    edit={edit}
                                    value={data.mobileNumber}
                                    handleChange={handleOnChange}
                                    inputName="mobileNumber"
                                    field="Mobile Number"
                                />

                                <CustomerDetailInput
                                    edit={edit}
                                    value={data.companyName}
                                    handleChange={handleOnChange}
                                    inputName="companyName"
                                    field="Company Name"
                                />

                                <CustomerDetailInput
                                    edit={edit}
                                    value={data.address}
                                    handleChange={handleOnChange}
                                    inputName="address"
                                    field="Company Address"
                                />
                            </dl>
                        </div>

                        {/* save button */}
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="button"
                                className="text-sm font-semibold leading-6 text-gray-900"
                                onClick={() =>
                                    router.visit(route("customer.list"))
                                }
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!edit}
                                className="disabled:cursor-not-allowed disabled:opacity-50 rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
};

CustomerDetails.layout = (page) => (
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

export default CustomerDetails;

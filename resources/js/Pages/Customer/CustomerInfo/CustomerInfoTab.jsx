import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SearchBox from "@/Components/SearchBox";
import Table from "@/Components/Table";
import { useDebounce } from "@/Hooks/useDebounce";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { getDateFromBackend } from "@/Utility/globalFunction";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import CustomerDetailInput from "../CustomerDetailInput";
import TextEditor from "@/Components/TextEditor";

const CustomerInfoTab = ({ customer, customerId, alert }) => {
    const { data, setData, patch, processing, errors, reset } = useForm({
        additionalInfo: customer.additional_info,
    });

    const handleSaveInfo = () => {
        patch(route("customer.info.update", customerId), {
            data: data,
            onSuccess: (message) => {
                console.log(message, alert);
            },
        });
    };

    return (
        <div className="py-6 sm:grid lg:grid-cols-4 sm:gap-4 sm:px-0 max-w-8xl mx-auto">
            <Card className="order-2 lg:order-1 lg:col-span-3 w-full mx-auto">
                <CardBody>
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center px-5 sm:px-0">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">
                                Additional Information
                            </h3>
                        </div>
                        <div className="mt-3 sm:px-0 px-5 py-6">
                            <TextEditor
                                value={data.additionalInfo}
                                onChange={(value) =>
                                    setData("additionalInfo", value)
                                }
                                height={700}
                            />
                        </div>
                        <div className="flex justify-end">
                            <PrimaryButton onClick={handleSaveInfo}>
                                Save
                            </PrimaryButton>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card className="order-1 lg:order-2 lg:col-span-1 max-h-96">
                <CardBody className="flex flex-col flex-wrap">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                        Customer Information
                    </h3>
                    <CustomerDetailInput
                        value={customer.alias_customer_id}
                        field="Customer ID"
                        pY="py-2"
                    />
                    <CustomerDetailInput
                        value={customer.company}
                        field="Company Name"
                        pY="py-2"
                    />
                    <CustomerDetailInput
                        value={customer.pic_name}
                        field="PIC Name"
                        pY="py-2"
                    />
                    <CustomerDetailInput
                        value={getDateFromBackend(customer.created_at)}
                        field="Created At"
                        pY="py-2"
                    />
                    <CustomerDetailInput
                        value={getDateFromBackend(customer.updated_at)}
                        field="UpdatedAt"
                        pY="py-2"
                    />
                </CardBody>
            </Card>
        </div>
    );
};

export default CustomerInfoTab;

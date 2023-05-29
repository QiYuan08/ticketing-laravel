import TextEditor from "@/Components/TextEditor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Card, CardBody } from "@material-tailwind/react";
import React from "react";
import CustomerDetailInput from "./CustomerDetailInput";
import { getDateFromBackend } from "@/Utility/globalFunction";

const CustomerInfoDetails = (props) => {
    const { data, setData, errors, patch } = useForm({
        additionalInfo: props.data.additional_info,
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

            <div className="px-4 py-6 sm:grid lg:grid-cols-4 sm:gap-4 sm:px-0 max-w-8xl mx-auto">
                <Card className="order-2 lg:order-1 lg:col-span-3 w-full mx-auto">
                    <CardBody>
                        <div className="max-w-5xl mx-auto">
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
                        </div>
                    </CardBody>
                </Card>

                <Card className="order-1 lg:order-2 lg:col-span-1 max-h-96">
                    <CardBody className="flex flex-col flex-wrap">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                            FAQ Information
                        </h3>
                        <CustomerDetailInput
                            value={props.data.alias_customer_id}
                            field="Customer ID"
                            pY="py-2"
                        />
                        <CustomerDetailInput
                            value={props.data.company}
                            field="Company Name"
                            pY="py-2"
                        />
                        <CustomerDetailInput
                            value={props.data.pic_name}
                            field="PIC Name"
                            pY="py-2"
                        />
                        <CustomerDetailInput
                            value={getDateFromBackend(props.data.created_at)}
                            field="Created At"
                            pY="py-2"
                        />
                        <CustomerDetailInput
                            value={getDateFromBackend(props.data.updated_at)}
                            field="UpdatedAt"
                            pY="py-2"
                        />
                    </CardBody>
                </Card>
            </div>
        </Authenticated>
    );
};

export default CustomerInfoDetails;

import InputError from "@/Components/InputError";
import TextEditor from "@/Components/TextEditor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { Card, CardBody } from "@material-tailwind/react";

const AddCustomer = (props) => {
    const { data, setData, post, errors, reset } = useForm({
        email: "",
        customerId: "",
        picName: "",
        phoneNumber: "",
        mobileNumber: "",
        companyName: "",
        address: "",
        additionalInfo: "",
    });

    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submitForm = (event) => {
        event.preventDefault();

        post(route("customer.create"), {
            // data: data,
            preserveState: true,
        });
    };

    return (
        <>
            <Head title="Add Customer" />

            {/* Customer ID, Phone number, Mobile number, Company Name, Address. */}
            <Card className="max-w-5xl mx-auto">
                <CardBody>
                    <div className="sm:px-3 lg:px-4">
                        <form onSubmit={submitForm}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="col-span-6">
                                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                                Personal Information
                                            </h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                                Information about the company
                                                PIC
                                            </p>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="customerId"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Customer ID (*leave blank to
                                                auto-generate)
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="customerId"
                                                    name="customerId"
                                                    type="text"
                                                    defaultValue=""
                                                    value={data.customerId}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.customerId}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="picName"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Full Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="picName"
                                                    id="picName"
                                                    value={data.picName}
                                                    onChange={handleChange}
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.picName}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="phoneNumber"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Phone Number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="phoneNumber"
                                                    id="phoneNumber"
                                                    value={data.phoneNumber}
                                                    onChange={handleChange}
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.phoneNumber}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="mobileNumber"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Mobile Number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="mobileNumber"
                                                    id="mobileNumber"
                                                    value={data.mobileNumber}
                                                    onChange={handleChange}
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.mobileNumber}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-4 sm:col-start-1">
                                            <label
                                                htmlFor="companyName"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Email
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    value={data.email}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.email}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-4 sm:col-start-1">
                                            <label
                                                htmlFor="companyName"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Company Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="companyName"
                                                    id="companyName"
                                                    value={data.companyName}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.companyName}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label
                                                htmlFor="address"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Company address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    value={data.address}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.address}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="about"
                                        className="block text-base font-semibold leading-6 text-gray-900"
                                    >
                                        About
                                    </label>
                                    <p className="text-sm leading-6 text-gray-600">
                                        Additional customer details
                                    </p>
                                    <div className="mt-2">
                                        <TextEditor
                                            value={data.additionalInfo}
                                            height={300}
                                            onChange={(value) =>
                                                setData("additionalInfo", value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                    type="button"
                                    className="text-sm font-semibold leading-6 text-gray-900"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </CardBody>
            </Card>
        </>
    );
};

AddCustomer.layout = (page) => (
    <Authenticated
        children={page}
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Customer (View and manage your customer )
            </h2>
        }
    />
);

export default AddCustomer;

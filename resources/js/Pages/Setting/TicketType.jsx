import Table from "@/Components/Table";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Input, Option } from "@material-tailwind/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useNotificationContext } from "@/Context/NotificationContext";
import { ERROR, SUCCESS } from "@/Utility/constant";
import Select from "@/Components/Select";

const TicketType = ({ types, alert }) => {
    const { open } = useNotificationContext();

    const deductionRateDropdown = [
        {
            value: 0,
            label: 0.0,
        },
        {
            value: 0.5,
            label: 0.5,
        },
        {
            value: 1.0,
            label: 1.0,
        },
        {
            value: 1.5,
            label: 1.5,
        },
        {
            value: 2,
            label: 2.0,
        },
    ];

    const [openModal, setOpen] = useState(false);
    const [data, setData] = useState({
        type_id: "",
        deduction_rate: "",
        name: "",
    });

    const updateType = () => {
        if (data.type_id) {
            router.visit(route("settings.type.update", data.type_id), {
                method: "patch",
                data: data,
                preserveScroll: true,
                onSuccess: () => {
                    open(alert.success, SUCCESS);
                },
                onError: (errors) => {
                    open(errors.name, ERROR);
                },
            });
        } else {
            router.visit(route("settings.type.create"), {
                method: "post",
                data: data,
                preserveScroll: true,
                onSuccess: () => {
                    open(alert.success, SUCCESS);
                },
                onError: (errors) => {
                    open(errors.name, ERROR);
                },
            });
        }

        setOpen(false);
    };

    // changing the order will break the code for some reason
    const handleOpenModal = (type) => {
        setData((prev) => ({
            ...prev,
            type_id: type.type_id,
            deduction_rate: type.deduction_rate,
            name: type.name,
        }));
        setOpen(true);
    };

    const handleValueChange = (e) => {
        let field = e.target.name;
        let value = e.target.value;

        setData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDeleteType = (id) => {
        router.visit(route("settings.type.delete", id), {
            method: "delete",
            preserveState: false,
            onSuccess: () => {
                open(alert.success, SUCCESS);
            },
        });
    };

    return (
        <>
            <div className="flex flex-col flex-wrap px-1 py-1">
                <div className="flex justify-between items-center">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                        Ticket Type
                    </h3>
                    <PrimaryButton
                        onClick={() =>
                            handleOpenModal({ type_id: null, name: "" })
                        }
                    >
                        Add Type
                    </PrimaryButton>
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
                                            Ticket Type
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3 text-sm font-bold text-center text-gray-500 uppercase"
                                            style={{ width: "23%" }}
                                        >
                                            Deduction Rate
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3 text-sm font-bold text-center text-gray-500 uppercase"
                                            style={{ width: "18%" }}
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {types.data.map((type, idx) => {
                                        return (
                                            <tr
                                                className="even:bg-gray-100 hover:shadow-gray-600"
                                                key={idx}
                                            >
                                                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                                    {type.name}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-center text-gray-800 w-48">
                                                    {type.deduction_rate}
                                                </td>
                                                <td className="flex justify-center items-center px-6 py-4 text-sm font-medium text-gray-800 text-center space-x-4 hover:font-semibold">
                                                    <button
                                                        onClick={() =>
                                                            handleOpenModal(
                                                                type
                                                            )
                                                        }
                                                        className="text-blue-700 hover:text-blue-800 "
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="text-red-700 hover:text-red-800"
                                                        onClick={() =>
                                                            handleDeleteType(
                                                                type.type_id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal code */}
            <Transition.Root show={openModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xs">
                                    <div className="bg-white px-4 pb-2 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-base font-semibold leading-6 text-gray-900"
                                                >
                                                    {data.type_id
                                                        ? "Edit Ticket Type"
                                                        : "Add Ticket Type"}
                                                </Dialog.Title>
                                                <div className="flex flex-col gap-y-0.5 mt-2">
                                                    <p>Ticket Type</p>
                                                    <Input
                                                        value={data.name}
                                                        name="name"
                                                        onChange={
                                                            handleValueChange
                                                        }
                                                    />
                                                </div>
                                                <div className="mt-4 flex flex-col gap-y-0.5">
                                                    <p>Deduction Rate</p>
                                                    <Select
                                                        items={
                                                            deductionRateDropdown
                                                        }
                                                        selected={deductionRateDropdown.find(
                                                            (el) =>
                                                                el.value ===
                                                                data?.deduction_rate
                                                        )}
                                                        name="deduction_rate"
                                                        identifier="value"
                                                        setSelected={(
                                                            value
                                                        ) => {
                                                            handleValueChange({
                                                                target: {
                                                                    value: value.value,
                                                                    name: "deduction_rate",
                                                                },
                                                            });
                                                            // console.log(
                                                            //     value,
                                                            //     data
                                                            // );
                                                            // setData(
                                                            //     "deduction_rate",
                                                            //     value.value
                                                            // );
                                                        }}
                                                        render={(item) =>
                                                            deductionRateDropdown.find(
                                                                (el) =>
                                                                    el.value ===
                                                                    item?.value
                                                            )?.label
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-32">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 sm:ml-3 sm:w-auto"
                                            onClick={updateType}
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default TicketType;

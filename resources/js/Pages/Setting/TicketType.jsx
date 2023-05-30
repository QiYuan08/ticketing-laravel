import Table from "@/Components/Table";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useNotificationContext } from "@/Context/NotificationContext";
import { ERROR, SUCCESS } from "@/Utility/constant";

const TicketType = ({ types, alert }) => {
    const { open } = useNotificationContext();

    const [openModal, setOpen] = useState(false);
    const [data, setData] = useState({
        type_id: "",
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
            name: type.name,
        }));
        setOpen(true);
    };

    const handleValueChange = (e) => {
        setData((prev) => ({
            ...prev,
            name: e.target.value,
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

                <Table
                    header={["Ticket Type", "Action"]}
                    bodyRow={types.data.map((type, idx) => {
                        return (
                            <tr
                                className="even:bg-gray-100 hover:shadow-gray-600"
                                key={idx}
                            >
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 ">
                                    {type.name}
                                </td>
                                <td className="flex px-6 py-4 text-sm font-medium text-gray-800 text-left space-x-4 w-1/12 hover:font-semibold">
                                    <button
                                        onClick={() => handleOpenModal(type)}
                                        className="text-blue-700 hover:text-blue-800 "
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-700 hover:text-red-800"
                                        onClick={() =>
                                            handleDeleteType(type.type_id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                />
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
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon
                                                    className="h-6 w-6 text-red-600"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-base font-semibold leading-6 text-gray-900"
                                                >
                                                    {data.type_id
                                                        ? "Edit Ticket Type"
                                                        : "Add Ticket Type"}
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <Input
                                                        value={data.name}
                                                        onChange={
                                                            handleValueChange
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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

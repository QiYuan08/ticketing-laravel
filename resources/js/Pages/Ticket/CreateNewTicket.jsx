import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import { useNotificationContext } from "@/Context/NotificationContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { SUCCESS } from "@/Utility/constant";
import {
    getAttachmentSize,
    handleAttachmentDeleteUtil,
    handleAttachmentUtil,
} from "@/Utility/globalFunction";
import { Head, router, useForm } from "@inertiajs/react";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import { AiOutlineClose } from "react-icons/ai";

const ViewList = (props) => {
    const priority = props.priority;
    const agents = props.agents;
    const customers = props.customers;
    const type = props.type;

    const { open } = useNotificationContext();

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        message: "",
        requestor: "",
        assignee: "",
        priority: "",
        notify: false,
        type: "",
        attachment: [],
    });

    const handleFileChange = (event) => {
        const value = event.target.files;

        setData(
            "attachment",
            handleAttachmentUtil(value, data.attachment).concat()
        );
    };

    const deleteAttachment = (file) => {
        setData(
            "attachment",
            handleAttachmentDeleteUtil(file, data.attachment)
        );
    };

    {
        console.log(data.attachment);
    }

    const handleSave = () => {
        post(route("ticket.create-new-ticket"), {
            data: data,
            preserveScroll: true,
            onSuccess: () => {
                open(props.alert.success, SUCCESS);
                setData("attachment", []);
                reset(); // reset the form
            },
        });
    };

    return (
        <>
            <Head title="Create New Ticket" />

            <Card>
                <CardBody>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-3">
                                    <label
                                        htmlFor="about"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Requestor
                                    </label>
                                    <Select
                                        items={customers}
                                        selected={data.requestor}
                                        setSelected={(value) => {
                                            setData("requestor", value);
                                        }}
                                        identifier="customer_id"
                                        render={(item) => (
                                            <div className="flex flex-col">
                                                <p>{item?.pic_name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {item?.email}
                                                </p>
                                            </div>
                                        )}
                                    />
                                    <InputError
                                        message={errors.requestor}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="col-span-3">
                                    <label
                                        htmlFor="about"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Assignee
                                    </label>
                                    <Select
                                        items={agents}
                                        selected={data.assignee}
                                        setSelected={(value) => {
                                            setData("assignee", value);
                                        }}
                                        render={(item) => item?.name}
                                    />
                                    <InputError
                                        message={errors.assignee}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="about"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Subject
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={""}
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.title}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="about"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Message
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={5}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={""}
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    "message",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.message}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                {/* priority */}
                                <div className="col-span-2">
                                    <label
                                        htmlFor="about"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Priority
                                    </label>
                                    <Select
                                        items={priority}
                                        selected={data.priority}
                                        setSelected={(value) => {
                                            setData("priority", value);
                                        }}
                                        identifier="priority_id"
                                        render={(item) => item?.name}
                                    />
                                </div>

                                {/* type */}
                                <div className="col-span-2">
                                    <label
                                        htmlFor="about"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Type
                                    </label>
                                    <Select
                                        items={type}
                                        selected={data.type}
                                        setSelected={(value) => {
                                            setData("type", value);
                                        }}
                                        identifier="type_id"
                                        render={(item) => item?.name}
                                    />
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="cover-photo"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Attachment
                                    </label>
                                    <div className="flex flex-col justify-start px-2 py-2">
                                        <label class="w-64 flex flex-col items-center px-4 py-3 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue">
                                            <span class="mt-2 text-base leading-normal">
                                                Select a file
                                            </span>

                                            <input
                                                hidden
                                                multiple
                                                type="file"
                                                onChange={handleFileChange}
                                            />
                                        </label>

                                        <div className="mt-4 flex flex-col gap-y-2">
                                            {data.attachment.map(
                                                (attachment, idx) => {
                                                    return (
                                                        <div
                                                            className=""
                                                            key={idx}
                                                        >
                                                            <div className="flex items-center gap-x-1">
                                                                <p>
                                                                    {
                                                                        attachment.name
                                                                    }
                                                                </p>
                                                                <p>{`(${getAttachmentSize(
                                                                    attachment.size
                                                                )})`}</p>

                                                                <AiOutlineClose
                                                                    className="cursor-pointer"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        deleteAttachment(
                                                                            attachment
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <Checkbox
                                        labelText={"Notify customer"}
                                        id="medium"
                                        className="hover:before:opacity-0"
                                        checked={data.notify}
                                        onChange={(e) =>
                                            setData("notify", e.target.checked)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="flex justify-end">
                    <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
                </CardFooter>
            </Card>
        </>
    );
};

ViewList.layout = (page) => (
    <Authenticated
        children={page}
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Create New Ticket
            </h2>
        }
    />
);

export default ViewList;

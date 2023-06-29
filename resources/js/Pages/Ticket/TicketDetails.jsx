import Message from "@/Components/Message";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import TextAvatar from "@/Components/TextAvatar";
import TextEditor from "@/Components/TextEditor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    getAttachmentSize,
    handleAttachmentDeleteUtil,
    handleAttachmentUtil,
} from "@/Utility/globalFunction";
import { Link, router, useForm } from "@inertiajs/react";
import { BsThreeDots } from "react-icons/bs";
import {
    Button,
    IconButton,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Typography,
} from "@material-tailwind/react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsReplyFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import MergeTicketModal from "./MergeTicketModal";
import { useState } from "react";
import { ERROR, INFO } from "@/Utility/constant";
import { useNotificationContext } from "@/Context/NotificationContext";
import TemplateModal from "./TemplateModal";

const TicketDetails = (props) => {
    const ticket = props.data;
    const agents = props.agents;
    const type = props.type;
    const priority = props.priority;
    const status = props.status;
    const templates = props.templates;

    const { open } = useNotificationContext();
    const [openMerge, setOpenMerge] = useState(false);
    const [openTemplate, setOpenTemplate] = useState(false);
    const { data, setData, post, progress } = useForm({
        assignee: ticket.assignee,
        status: ticket.status,
        priority: ticket.priority,
        type: ticket.type,
        recepient: ticket.requestor,
        cc: [],
        message: "",
        attachment: [],
        internalNode: false,
    });

    const deleteAttachment = (file) => {
        setData(
            "attachment",
            handleAttachmentDeleteUtil(file, data.attachment)
        );
    };

    const handleAttachment = (event) => {
        setData(
            "attachment",
            handleAttachmentUtil(event.target.files, data.attachment).concat()
        );
        event.target.value = null;
    };

    const handleSubmit = () => {
        router.post(route("ticket.reply", ticket.ticket_id), data, {
            preserveState: false,
            preserveScroll: true,
        });
    };

    const goToCustomerDetails = () => {
        if (!ticket.requestor.unknown) {
            router.visit(
                route("customer.info.details", ticket.requestor.customer_id)
            );
        } else {
            open("Customer not found in customer list", INFO);
        }
    };

    const goToGeneratePdf = () => {
        router.visit(route("ticket.generate-site-pdf", ticket.ticket_id), {
            method: "get",
        });
    };

    return (
        <>
            {/* // TODO: finish the back button */}
            {/* <div
                className="pb-2 underline text-md font-semibold text-light-blue-800 cursor-pointer"
                onClick={() => }
            >
                Back
            </div> */}
            <div className="flex flex-col lg:flex-row bg-white min-h-full">
                {/* <Typography variant="h6">Ticket Details</Typography> */}
                {/* Sidebar */}
                <div className="flex flex-row lg:flex-col flex-wrap grow-[1] box-border lg:max-w-md">
                    <div className="p-3">
                        {/* requestor */}
                        <div
                            className="flex flex-col justify-items-center items-start ml-2 mt-2 lg:mt-2 gap-y-1 cursor-pointer"
                            onClick={goToCustomerDetails}
                        >
                            <Typography variant="h4">Requestor</Typography>
                            <TextAvatar
                                text={ticket.requestor.pic_name}
                                subtext="Customer"
                                img=""
                            />
                        </div>
                    </div>
                    {/* assignee */}
                    <div className="flex flex-col justify-items-center items-start ml-2 lg:mt-2 gap-y-1 p-3">
                        <Typography variant="h4">Assignee</Typography>

                        <Select
                            items={agents}
                            selected={data.assignee}
                            setSelected={(value) => {
                                setData("assignee", value);
                            }}
                            render={(item) => (
                                <TextAvatar
                                    text={item?.name ?? ""}
                                    subtext={item?.role?.name ?? ""}
                                    img=""
                                />
                            )}
                        />
                    </div>
                    <div className="py-2 border-t-[1px] lg:border-gray-500 mt-1 px-3">
                        <div className="flex flex-wrap gap-x-4 justify-between">
                            <div className="flex flex-col justify-start items-start gap-y-1">
                                <Typography variant="h5">Type</Typography>
                                <Select
                                    items={type}
                                    selected={data.type ?? ""}
                                    setSelected={(value) => {
                                        setData("type", value);
                                    }}
                                    render={(item) => item?.name}
                                    identifier="type_id"
                                />
                            </div>

                            <div className="flex flex-col justify-start items-start gap-y-1">
                                <Typography variant="h5">Priority</Typography>
                                <Select
                                    items={priority}
                                    selected={data.priority}
                                    setSelected={(value) => {
                                        setData("priority", value);
                                    }}
                                    identifier="priority_id"
                                    render={(item) => item.name}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Status */}
                    <div className="py-2 border-t-[1px] lg:border-gray-500 mt-1 px-3">
                        <div className="flex flex-col justify-start items-start gap-y-1">
                            <Typography variant="h5">Status</Typography>
                            <Select
                                items={status}
                                selected={data.status}
                                setSelected={(value) => {
                                    setData("status", value);
                                }}
                                render={(item) => item.name}
                                identifier="status_id"
                            />
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex flex-col grow-[10] border-0 lg:border-l-[1px] lg:border-gray-500 ">
                    {/* subject */}
                    <div className="flex justify-between items-center grow-[1] max-h-10 p-3 box-border">
                        <Typography variant="paragraph">
                            Ticket {ticket.ticket_id} : {ticket.subject}
                        </Typography>

                        <Menu placement="bottom-end">
                            <MenuHandler>
                                <IconButton
                                    color="white"
                                    style={{ boxShadow: "none", border: 0 }}
                                >
                                    <BsThreeDots size={22} />
                                </IconButton>
                            </MenuHandler>
                            <MenuList>
                                <MenuItem onClick={() => setOpenMerge(true)}>
                                    Merge Ticket To
                                </MenuItem>
                                <MenuItem onClick={() => setOpenTemplate(true)}>
                                    Template
                                </MenuItem>
                                <MenuItem onClick={goToGeneratePdf}>
                                    Generate Site Visit PDF
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>

                    {/* chat */}
                    <div className=" grow-[8] lg:border-y-[1px] border-gray-500 w-full px-5 h-72 md:h-[400px] overflow-auto">
                        <div className="flex flex-col my-4  gap-y-3">
                            {props.messages.map((message) => {
                                return (
                                    <Message
                                        message={message}
                                        userId={props.auth.user.id}
                                        key={message.id}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* input */}
                    <div className="flex flex-col grow-[2] min-h-max ">
                        {/* recipient and cc */}
                        <div
                            className="flex gap-x-3 items-center p-1 cursor-pointer"
                            onClick={() =>
                                setData("internalNode", !data.internalNode)
                            }
                        >
                            {data.internalNode ? (
                                <>
                                    <BiCommentDetail
                                        color="disabled"
                                        size={20}
                                    />
                                    Internal Note
                                </>
                            ) : (
                                <>
                                    <BsReplyFill color="disabled" size={20} />
                                    Public reply
                                </>
                            )}
                            <p className="ml-1">To:</p>
                            {data.recepient && (
                                <div className="inline-flex items-center rounded-sm bg-blue-gray-200 px-1">
                                    {data.recepient.email}
                                </div>
                            )}

                            {data.cc.map((recipient, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className="inline-flex items-center rounded-sm bg-blue-gray-200 px-1"
                                    >
                                        {recipient.email}
                                    </div>
                                );
                            })}
                        </div>
                        {/* text editor */}
                        <TextEditor
                            value={data.message}
                            onChange={(newValue, edtior) =>
                                setData("message", newValue)
                            }
                        />
                        {data.attachment.map((attach, idx) => {
                            return (
                                <div
                                    className="inline-flex min-w-max items-center justify-between px-5 bg-cyan-100 hover:cursor-pointer"
                                    key={idx}
                                >
                                    <div className="inline-flex items-center gap-x-2 attachment_text py-1">
                                        <p>{attach.name}</p>
                                        <p>{`(${getAttachmentSize(
                                            attach.size
                                        )})`}</p>
                                    </div>
                                    <div className="cursor-pointer">
                                        <MdDelete
                                            onClick={(e) =>
                                                deleteAttachment(attach)
                                            }
                                            size={23}
                                            color="#E11D48"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* submit */}
                    <div className="grow-[1] inline-flex items-center justify-end p-2 ">
                        <label
                            htmlFor="attachment"
                            className="mr-2 cursor-pointer"
                        >
                            <AiOutlinePaperClip size={30} />
                            <input
                                id="attachment"
                                className="hidden"
                                type="file"
                                onChange={handleAttachment}
                                multiple
                            />
                            <span id="imageName"></span>
                        </label>
                        <PrimaryButton onClick={handleSubmit}>
                            Submit
                        </PrimaryButton>
                    </div>
                </div>
            </div>

            {/* merge ticket modal */}
            <MergeTicketModal
                open={openMerge}
                ticket={ticket}
                handleMergeTicketOpen={setOpenMerge}
            />

            {/* email template modal */}
            <TemplateModal
                open={openTemplate}
                handleOpen={setOpenTemplate}
                templates={templates}
                ticket={ticket}
            />
        </>
    );
};

TicketDetails.layout = (page) => (
    <Authenticated
        children={page}
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Ticket Details (View the current ticket)
            </h2>
        }
    />
);

export default TicketDetails;

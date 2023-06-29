import { getDateFromBackend } from "@/Utility/globalFunction";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { router } from "@inertiajs/react";
import { Drawer, IconButton, Typography } from "@material-tailwind/react";
import { BsArrowDownRight } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import React from "react";

const MsgNotificationDrawer = ({
    messages,
    setShowNotification,
    showNotification,
}) => {
    const handleDelete = () => {};

    const handleLink = (ticketId, notificationId) => {
        router.get(
            route(`notification.read`, {
                ticketId: ticketId,
                notificationId: notificationId,
            })
        );

        setShowNotification(false);
    };

    return (
        <Drawer
            placement="right"
            open={showNotification}
            size={450}
            onClose={setShowNotification}
            className="bg-gray-300 overflow-y-auto"
        >
            <div className="flex-col gap-y-4 items-center ">
                <div className="p-4 mb-6 flex items-center justify-between bg-white">
                    <Typography variant="h5" color="blue-gray">
                        Message notification
                    </Typography>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => setShowNotification(false)}
                    >
                        <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                    </IconButton>
                </div>
                {messages.length === 0 && (
                    <div className="flex justify-center">
                        <p className="text-center">
                            No new notification at the moment...
                        </p>
                    </div>
                )}

                {messages &&
                    messages.map((msg, idx) => {
                        return (
                            <div
                                key={idx}
                                className="flex flex-col gap-y-3 m-3 rounded-md p-3 bg-white hover:shadow-lg cursor-pointer"
                                onClick={() =>
                                    handleLink(msg.data.ticket_id, msg.id)
                                }
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-x-3 items-center">
                                        {msg.data.new ? (
                                            <AiOutlinePlus />
                                        ) : (
                                            <BsArrowDownRight />
                                        )}

                                        <div className="flex flex-col">
                                            <p className="font-semibold text-lg">
                                                {msg.data.subject}
                                            </p>
                                            Ticket No : {msg.data.ticket_id}
                                            <p className="text-gray-600 text-sm">
                                                {getDateFromBackend(
                                                    msg.data.time
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </Drawer>
    );
};

export default MsgNotificationDrawer;

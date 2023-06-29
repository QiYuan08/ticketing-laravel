import { XMarkIcon } from "@heroicons/react/24/outline";
import { Drawer, IconButton, Typography } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";

const MessageNotificationContext = React.createContext();

export function MessageNotificationProvider({ children }) {
    const [userId, setUserId] = useState();
    const [message, setMessage] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    if (userId) {
        window.Echo.private(`App.Models.User.${userId}`).notification(
            (notification) => {
                setMessage([notification].concat(message));
            }
        );
    }

    useEffect(() => {}, []);

    return (
        <MessageNotificationContext.Provider
            value={{
                message,
                setMessage,
                showNotification,
                setShowNotification,
                setUserId,
            }}
        >
            {children}
        </MessageNotificationContext.Provider>
    );
}

export function useMessageNotificationContext() {
    return useContext(MessageNotificationContext);
}

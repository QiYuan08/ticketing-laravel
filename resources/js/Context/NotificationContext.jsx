import Notification from "@/Components/Notification";
import { ERROR, INFO, SUCCESS } from "@/Utility/constant";
import React, { useContext, useState } from "react";

const NotificationContext = React.createContext();

export function NotificationProvider({ children, alert }) {
    const [toast, setToast] = useState([]);

    console.log(alert);

    const open = (message, severity, timeout = 2000) => {
        const id = Date.now();

        setToast([
            {
                component: (
                    <Notification message={message} severity={severity} />
                ),
                id: id,
            },
            ...toast,
        ]);

        setTimeout(() => close(id), timeout);
    };

    const close = (id) => {
        setToast((toast) => toast.filter((toast) => toast.id !== id));
    };

    const value = {
        open,
        close,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
            {toast.map((to, idx) => {
                return <div key={idx}>{to.component}</div>;
            })}
        </NotificationContext.Provider>
    );
}

export function useNotificationContext() {
    return useContext(NotificationContext);
}

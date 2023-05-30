import {
    ADMIN,
    AGENT,
    PRIORITY_HIGH,
    PRIORITY_LOW,
    PRIORITY_MEDIUM,
    TICKET_STATUS_DELETED,
    TICKET_STATUS_PENDING,
    TICKET_STATUS_SOLVED,
} from "@/Utility/constant";
import React from "react";

const StatusTag = ({ status }) => {
    let colour = "";
    let text = "";

    switch (status) {
        case TICKET_STATUS_SOLVED:
            text = "SOLVED";
            colour = "bg-tag-green text-white";
            break;

        case TICKET_STATUS_PENDING:
            text = "PENDING";
            colour = "bg-tag-orange text-orange-900";
            break;

        case TICKET_STATUS_DELETED:
            text = "DELETED";
            colour = "bg-tag-dark-red text-white";
            break;

        case AGENT:
            text = "Agent";
            colour = "bg-tag-dark-red text-white";
            break;

        // case CUSTOMER_ROLE:
        //     text = "Customer";
        //     colour = "tag-green";
        //     break;

        case ADMIN:
            text = "Admin";
            colour = "bg-tag-red text-white";
            break;

        case PRIORITY_LOW:
            text = "Low";
            colour = "bg-tag-light-green text-white";
            break;

        case PRIORITY_MEDIUM:
            text = "Medium";
            colour = "bg-tag-bright-orange text-white";
            break;

        case PRIORITY_HIGH:
            text = "High";
            colour = "bg-tag-bright-red text-white";
            break;

        default:
            text = "OPEN";
            colour = "bg-tag-red text-white";
    }

    return (
        <div>
            <span className={`py-0.5 px-1 w-8 ${colour}  rounded-sm`}>
                {text}
            </span>
        </div>
    );
};

export default StatusTag;

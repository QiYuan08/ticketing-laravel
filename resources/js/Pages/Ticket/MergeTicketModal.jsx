import { useDebounce } from "@/Hooks/useDebounce";
import { getDateFromBackend } from "@/Utility/globalFunction";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { router, useForm } from "@inertiajs/react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Textarea,
} from "@material-tailwind/react";
import { propTypesDismiss } from "@material-tailwind/react/types/components/dialog";
import { Fragment, useState } from "react";
import { TiArrowDownThick } from "react-icons/ti";

const MergeTicketModal = ({ ticket, open, handleMergeTicketOpen }) => {
    const [selectedTicket, setSelectedTicket] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [result, setResult] = useState([]);
    const [merge, setMerged] = useState(false);
    const [mergerMsg, setMergerMsg] = useState("");
    const [combinedMsg, setCombinedMsg] = useState("");

    const reviewMerge = () => {
        setMergerMsg(
            `This ticket was closed and merged into ticket #${selectedTicket.ticket_id} "${selectedTicket.subject}"`
        );
        setCombinedMsg(
            `Ticket #${selectedTicket.ticket_id} "${selectedTicket.subject}" was closed and merged into this ticket.`
        );

        setMerged(true);
    };

    const confirmMerge = () => {
        router.visit(
            route("ticket.merge-ticket", {
                combinedTicket: selectedTicket.ticket_id,
                mergerTicket: ticket.ticket_id,
            }),
            {
                method: "post",
                data: {
                    mergerMsg: mergerMsg,
                    combinedMsg: combinedMsg,
                },
                preserveScroll: true,
            }
        );
    };

    const setQuery = (event) => {
        setSearchTerm(event.target.value);
        debounceSearchAPI();
    };

    const debounceSearchAPI = useDebounce(() => {
        console.log("calling APi ");
        router.visit(route("ticket.get-id-list"), {
            method: "post",
            data: { searchTerm: searchTerm },
            preserveScroll: true,
            preserveState: true,
            onSuccess: (response) => {
                setResult(response.props.additionalInfo?.sessionData ?? []);
                console.log(response.props.additionalInfo?.sessionData);
            },
        });
    });

    return (
        <Dialog
            open={open}
            size={"md"}
            handler={handleMergeTicketOpen}
            // dismiss={new Prototype.propTypesDismiss({ outsidePress: false })}
        >
            <DialogHeader className="justify-center">Merge ticket</DialogHeader>
            <DialogBody>
                {merge ? (
                    <div className=" flex flex-col items-center gap-4">
                        <h2 className="text-center w-full p-4 py-2 bg-amber-100">{`You are about to merge ticket #${ticket.ticket_id} into ticket ${selectedTicket.ticket_id}`}</h2>
                        <div className="w-full flex gap-2 bg-gray-300 rounded-md shadow-md border-2 border-solid border-gray-100 p-2">
                            <div className="border-r-2  border-solid border-gray-500 pr-2">{`#${ticket.ticket_id}`}</div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">{`${getDateFromBackend(
                                    ticket.created_at
                                )} ${ticket.requestor.pic_name}`}</p>
                                <p className="font-semibold text-gray-800">
                                    {ticket.subject}
                                </p>
                                <span className="border-gray-400 border-t-2  block mt-2">
                                    Ticket will be updated with the following
                                    comment
                                </span>
                                <textarea
                                    size="lg"
                                    rows="5"
                                    cols="60"
                                    className="mt-1 w-full box-border"
                                    value={mergerMsg}
                                    onChange={(e) =>
                                        setMergerMsg(e.target.value)
                                    }
                                ></textarea>
                            </div>
                        </div>

                        <TiArrowDownThick size={40} />

                        <div className="w-full flex gap-2 bg-gray-300 rounded-md shadow-md border-2 border-solid border-gray-100 p-2">
                            <div className="border-r-2  border-solid border-gray-500 pr-2">{`#${ticket.ticket_id}`}</div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">{`${getDateFromBackend(
                                    selectedTicket.created_at
                                )} ${selectedTicket.pic_name}`}</p>
                                <p className="font-semibold text-gray-800">
                                    {selectedTicket.subject}
                                </p>
                                <span className="border-gray-400 border-t-2  block mt-2">
                                    Ticket will be updated with the following
                                    comment
                                </span>
                                <textarea
                                    size="lg"
                                    rows="5"
                                    cols="60"
                                    className="mt-1 w-full box-border"
                                    value={combinedMsg}
                                    onChange={(e) =>
                                        setCombinedMsg(e.target.value)
                                    }
                                ></textarea>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        {/* upper part */}
                        <div className="w-full flex gap-2 bg-gray-300 rounded-md shadow-md border-2 border-solid border-gray-100 p-2">
                            <div className="border-r-2  border-solid border-gray-500 pr-2">{`#${ticket.ticket_id}`}</div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">{`${getDateFromBackend(
                                    ticket.created_at
                                )} ${ticket.requestor.pic_name}`}</p>
                                <p className="font-semibold text-gray-800">
                                    {ticket.subject}
                                </p>
                            </div>
                        </div>

                        <TiArrowDownThick size={40} />

                        {/* lower part */}
                        <div className="w-full flex flex-col gap-2 bg-gray-300 rounded-md shadow-md border-2 border-solid border-gray-100 p-2">
                            <h2 className="font-semibold text-gray-700">
                                Please enter the ticket number to merge into
                            </h2>
                            <Combobox
                                value={selectedTicket}
                                onChange={setSelectedTicket}
                                nullable
                            >
                                <div className="relative mt-1">
                                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                        <Combobox.Input
                                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                            displayValue={(ticket) =>
                                                `${ticket?.ticket_id ?? ""} - ${
                                                    ticket?.subject ?? ""
                                                }`
                                            }
                                            onChange={setQuery}
                                        />
                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </Combobox.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                        // afterLeave={() => setQuery("")}
                                    >
                                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {result.length === 0 &&
                                            searchTerm !== "" ? (
                                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                    Nothing found.
                                                </div>
                                            ) : (
                                                result.map((ticket) => (
                                                    <Combobox.Option
                                                        key={ticket.ticket_id}
                                                        className={({
                                                            active,
                                                        }) =>
                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                active
                                                                    ? "bg-teal-600 text-white"
                                                                    : "text-gray-900"
                                                            }`
                                                        }
                                                        value={ticket}
                                                    >
                                                        {({
                                                            selected,
                                                            active,
                                                        }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${
                                                                        selected
                                                                            ? "font-medium"
                                                                            : "font-normal"
                                                                    }`}
                                                                >
                                                                    {`${ticket.ticket_id} - ${ticket.subject}`}
                                                                </span>
                                                                {selected ? (
                                                                    <span
                                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                            active
                                                                                ? "text-white"
                                                                                : "text-teal-600"
                                                                        }`}
                                                                    >
                                                                        <CheckIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Combobox.Option>
                                                ))
                                            )}
                                        </Combobox.Options>
                                    </Transition>
                                </div>
                            </Combobox>
                        </div>
                    </div>
                )}
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={
                        merge
                            ? () => setMerged(false)
                            : () => handleMergeTicketOpen(false)
                    }
                    className="mr-1"
                >
                    <span>{merge ? "Back" : "Cancel"}</span>
                </Button>
                <Button
                    variant="gradient"
                    color="green"
                    onClick={merge ? confirmMerge : reviewMerge}
                >
                    <span>{merge ? "Confirm and Merge" : "Merge"}</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default MergeTicketModal;

import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextEditor from "@/Components/TextEditor";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import {
    Button,
    Checkbox,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Textarea,
} from "@material-tailwind/react";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const GenerateSiteVisitPdf = (props) => {
    let ticket = props.ticket;
    var date = new Date();

    var formatedDate = `${date.getFullYear()}-${
        date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    }- ${date.getDate() < 9 ? "0" + date.getDate() : date.getDate()}`;

    var formatedTime = `${
        date.getHours() < 9 ? "0" + date.getHours() : date.getHours()
    } : ${
        date.getMinutes() < 9 ? "0" + date.getMinutes() : date.getMinutes()
    } : ${date.getSeconds() < 9 ? "0" + date.getSeconds() : date.getSeconds()}`;

    const sigCanvas = useRef();
    const [imageURL, setImageURL] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const { data, setData, post, errors } = useForm({
        company: ticket.requestor.company ?? "",
        picName: ticket.requestor.pic_name ?? "",
        email: ticket.requestor.email ?? "",
        contact:
            ticket.requestor.phone_number ??
            ticket.requestor.mobile_number ??
            "",
        Date: formatedDate,
        time: formatedTime,
        customerId: ticket.requestor.alias_customer_id,
        engineer: "",
        service: false,
        workOrder: false,
        others: false,
        othersText: "",
        problem: "",
        detail: "",
        requestorName: ticket.requestor.pic_name,
        maintenancePlan: false,
        adHoc: false,
        adHocFee: "",
        imageURL: "",
    });

    console.log(data.problem);

    const handleInputChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const createSignature = () => {
        const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");

        setData("imageURL", URL);
        setImageURL(URL);
        setOpenModal(false);
    };

    const handleSubmit = () => {
        post(route("ticket.post-generate-site-pdf", ticket.ticket_id));
    };

    console.log(errors);

    return (
        <div>
            <>
                <div className="grid grid-cols-[1fr] md:grid-cols-2 gap-3 rounded-sm bg-white p-2 md:p-4">
                    <div className="p-2 border-2 border-gray-500">
                        <div className="grid grid-cols-2 gap-y-3">
                            <label className="font-semibold">
                                Company Name
                            </label>
                            <input
                                className="p-2 border-gray-300 border-2 rounded-md leading-3"
                                value={data.company}
                                name="company"
                                onChange={handleInputChange}
                            />
                            <InputError
                                message={errors.company}
                                className="mt-2"
                            />

                            <label className="font-semibold">PIC</label>
                            <input
                                className="p-2 border-gray-300 border-2 rounded-md leading-[5px]"
                                value={data.picName}
                                name="picName"
                                onChange={handleInputChange}
                            />
                            <InputError
                                message={errors.picName}
                                className="mt-2"
                            />

                            <label className="font-semibold">Email</label>
                            <input
                                className="p-2 border-gray-300 border-2 rounded-md leading-[5px]"
                                name="email"
                                value={data.email}
                                onChange={handleInputChange}
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />

                            <label className="font-semibold">
                                Contact Number
                            </label>
                            <input
                                className="p-2 border-gray-300 border-2 rounded-md leading-[5px]"
                                value={data.contact}
                                name="contact"
                                onChange={handleInputChange}
                            />
                            <InputError
                                message={errors.contact}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="p-2 border-2 border-gray-500">
                        <div className="grid grid-cols-2 gap-y-3">
                            <label className="font-semibold">Date</label>
                            <input
                                // type="date"
                                className="p-2 border-gray-300 border-2 rounded-md leading-5"
                                value={data.Date}
                                disabled={true}
                                name="Date"
                                onChange={handleInputChange}
                            />
                            <InputError
                                message={errors.Date}
                                className="mt-2"
                            />

                            <label className="font-semibold">Time</label>
                            <input
                                className="p-2 border-gray-300 border-2 rounded-md leading-[5px]"
                                value={data.time}
                                name="time"
                                disabled={true}
                                onChange={handleInputChange}
                            />
                            <InputError
                                message={errors.time}
                                className="mt-2"
                            />

                            <label className="font-semibold">Customer ID</label>
                            <input
                                className="p-2 border-gray-300 border-2 rounded-md leading-[5px]"
                                value={data.customerId}
                                name="customerId"
                                onChange={handleInputChange}
                            />
                            <InputError
                                message={errors.customerId}
                                className="mt-2"
                            />

                            <label className="font-semibold">Engineer</label>
                            <input
                                className="p-2 border-gray-300 border-2 rounded-md leading-[5px]"
                                value={data.engineer}
                                name="engineer"
                                onChange={handleInputChange}
                            />
                            <InputError
                                message={errors.engineer}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center md:col-span-2  border-2 border-gray-500 px-1">
                        <p className="font-semibold">Service Type:</p>
                        <Checkbox
                            onChange={(e) =>
                                setData("service", e.target.checked)
                            }
                            label="Service Order"
                        />
                        <Checkbox
                            onChange={(e) =>
                                setData("workOrder", e.target.checked)
                            }
                            label="Job Order"
                        />
                        <Checkbox
                            value="others"
                            onChange={(e) =>
                                setData("others", e.target.checked)
                            }
                            label="Others"
                        />
                        <div className="flex items-center gap-x-1 w-48">
                            :
                            <Input
                                value={data.othersText}
                                name="othersText"
                                onChange={handleInputChange}
                                variant="standard"
                            />
                        </div>
                    </div>

                    <div className="flex gap-x-1 items-center md:col-span-2 mx-auto font-semibold text-lg">
                        <p>Ticket No:</p>
                        <p>{props.ticket.ticket_id}</p>
                    </div>

                    <div className="flex flex-col md:col-span-2">
                        <p className="font-semibold text-base">Problem</p>
                        <TextEditor
                            value={data.problem}
                            onChange={(msg) => setData("problem", msg)}
                        />
                        {/* <Textarea
                            value={data.problem}
                            name="problem"
                            onChange={handleInputChange}
                        /> */}
                        <InputError message={errors.problem} className="mt-2" />
                    </div>

                    <div className="flex flex-col md:col-span-2">
                        <p className="font-semibold text-base">Details</p>
                        <TextEditor
                            value={data.detail}
                            onChange={(msg) => setData("detail", msg)}
                        />
                        {/* <Textarea
                            size="lg"
                            value={data.detail}
                            name="detail"
                            onChange={handleInputChange}
                        /> */}
                    </div>

                    <div className="flex items-center md:col-span-2 gap-x-2">
                        <p className="min-w-max">Requestor Name</p>
                        <Input
                            value={data.requestorName}
                            onChange={handleInputChange}
                            name="requestorName"
                        />
                    </div>
                    <div className="md:flex justify-between md:col-span-2">
                        {/* signature area */}
                        <div className="flex flex-col p-2 border-2 border-gray-500 w-full h-48 md:w-56">
                            {imageURL && (
                                <img
                                    src={imageURL}
                                    alt="signature"
                                    className="h-4/5"
                                />
                            )}

                            <PrimaryButton
                                className="self-end"
                                onClick={() => setOpenModal(true)}
                            >
                                Sign
                            </PrimaryButton>
                        </div>

                        <div className="flex flex-col p-2 border-2 border-gray-500 mt-2 ">
                            <Checkbox
                                value="maintenance"
                                onChange={(e) =>
                                    setData("maintenancePlan", e.target.checked)
                                }
                                label="Maintenance Plan"
                            />
                            <div className="flex items-center gap-x-2">
                                <Checkbox
                                    value="adHoc"
                                    onChange={(e) =>
                                        setData("adHoc", e.target.checked)
                                    }
                                    className="min-w-max"
                                    label="Ad Hoc:"
                                />
                                S$
                                <Input
                                    variant="standard"
                                    name="adHocFee"
                                    value={data.adHocFee}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <PrimaryButton
                        className="md:col-start-2 mt-2 w-36 text-center justify-self-end"
                        onClick={handleSubmit}
                    >
                        Generate PDF
                    </PrimaryButton>
                </div>
            </>

            {/* signature modal */}
            <Dialog open={openModal} handler={setOpenModal} size="xl">
                <DialogBody>
                    <SignatureCanvas
                        penColor="black"
                        ref={sigCanvas}
                        canvasProps={{ className: "w-full h-64" }}
                    />
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button
                        value="outlined"
                        onClick={() => sigCanvas.current.clear()}
                    >
                        Clear
                    </Button>
                    <Button onClick={createSignature}>Save</Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

GenerateSiteVisitPdf.layout = (page) => (
    <Authenticated
        children={page}
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Generate Site Visit Pdf
            </h2>
        }
    />
);

export default GenerateSiteVisitPdf;

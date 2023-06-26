import TextEditor from "@/Components/TextEditor";
import { router } from "@inertiajs/react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Option,
    Select,
} from "@material-tailwind/react";
import { useState } from "react";

const TemplateModal = ({ open, handleOpen, templates, ticket }) => {
    const [selected, setSelected] = useState();

    const handleEdit = (value) => {
        setSelected((prev) => ({
            ...prev,
            content: value,
        }));
    };

    const sendMessage = () => {
        let data = {
            internalNode: false,
            message: selected.content,
            recepient: ticket.requestor,
        };

        router.post(route("ticket.reply", ticket.ticket_id), data, {
            preserveState: false,
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={open} size={"md"} handler={handleOpen}>
            <DialogHeader className="justify-center">
                Select template
            </DialogHeader>
            <DialogBody>
                <Select
                    size="md"
                    label="Select Version"
                    onChange={(idx) => setSelected(templates[idx])}
                >
                    {templates.map((template, idx) => {
                        return (
                            <Option value={idx}>
                                {template.template_name}
                            </Option>
                        );
                    })}
                </Select>

                <div className="mt-2">
                    <TextEditor
                        value={selected?.content}
                        onChange={handleEdit}
                    />
                </div>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => handleOpen(false)}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={sendMessage}>
                    <span>Send</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default TemplateModal;

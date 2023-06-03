import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextEditor from "@/Components/TextEditor";
import { useNotificationContext } from "@/Context/NotificationContext";
import { SUCCESS } from "@/Utility/constant";
import { router, useForm } from "@inertiajs/react";
import { Input, Option, Select } from "@material-tailwind/react";
import React, { useState } from "react";

const EmailTemplate = ({ templates, alert }) => {
    const { open } = useNotificationContext();

    const [modal, setModal] = useState(false);
    const [editedTemplate, setEditedTemplate] = useState("");
    const [editedTemplateId, setEditedTemplateId] = useState("");
    const { data, setData, post, errors } = useForm({
        templateName: "",
    });

    const handleTemplateChange = (id) => {
        let template = templates.find((template) => template.template_id == id);

        setEditedTemplate(template.content);
        setEditedTemplateId(id);
    };

    const handleSaveTemplate = () => {
        router.patch(
            route("settings.mail-template.update", editedTemplateId),
            { template: editedTemplate },
            {
                preserveScroll: true,
                // preserveState: true
                onSuccess: () => {
                    open("Email template updated", SUCCESS);
                },
            }
        );
    };

    const handleCreateTemplate = (event) => {
        event.preventDefault();

        post(route("settings.mail-template.store"), {
            data: data,
            preserveScroll: true,
            onSuccess: () => {
                open(`${data.templateName} template created`, SUCCESS);
                setModal(false);
            },
        });
    };

    const handleDeleteTemplate = () => {
        router.delete(
            route("settings.mail-template.delete", editedTemplateId),
            {
                onSuccess: () => {
                    setEditedTemplate("");
                    setEditedTemplateId("");
                    open("Template Delete", SUCCESS);
                },
            }
        );
    };

    return (
        <div className="flex flex-col flex-wrap px-1 py-1 gap-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Email Template
                </h3>
                <PrimaryButton onClick={() => setModal(true)}>
                    Add Template
                </PrimaryButton>
            </div>

            <Select
                label="Select Template"
                onChange={(value) => handleTemplateChange(value)}
            >
                {templates.map((template) => {
                    return (
                        <Option
                            value={template.template_id}
                            key={template.template_id}
                        >
                            {template.template_name}
                        </Option>
                    );
                })}
            </Select>

            <div className="mt-2">
                <h3>Template</h3>
                <TextEditor
                    height={600}
                    value={editedTemplate}
                    onChange={(value) => setEditedTemplate(value)}
                />
            </div>

            {editedTemplateId && (
                <div className="mt-2 flex justify-end items-center gap-x-4">
                    <SecondaryButton
                        onClick={handleDeleteTemplate}
                        className="hover:bg-red-600 hover:text-white"
                    >
                        Delete
                    </SecondaryButton>
                    <PrimaryButton onClick={handleSaveTemplate}>
                        Save
                    </PrimaryButton>
                </div>
            )}

            {/* code for modal */}
            <Modal
                show={modal}
                onClose={() => setModal(false)}
                children={
                    <div className="flex flex-col gap-y-2 px-2 py-4">
                        <form onSubmit={handleCreateTemplate}>
                            <div className="">
                                <label className="font-xs" htmlFor="name">
                                    Template Name
                                </label>
                                <InputError message={errors.templateName} />
                                <div className="mt-2">
                                    <Input
                                        id="name"
                                        value={data.templateName}
                                        onChange={(e) =>
                                            setData(
                                                "templateName",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <PrimaryButton type="submit">
                                    Save
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                }
                title="Add new template"
            />
        </div>
    );
};

export default EmailTemplate;

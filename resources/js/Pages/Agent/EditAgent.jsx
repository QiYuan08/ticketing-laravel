import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import WarningButton from "@/Components/WarningButton";
import { useNotificationContext } from "@/Context/NotificationContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { ADMIN, AGENT, SUCCESS } from "@/Utility/constant";
import { Transition } from "@headlessui/react";
import { Head, router, useForm } from "@inertiajs/react";
import { Card, CardBody, Option, Select } from "@material-tailwind/react";
import React from "react";

const EditAgent = (props) => {
    let agent = props.agent;
    let agentList = props.agentList;

    const { open } = useNotificationContext();

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: agent.name,
            role: agent.role_id,
        });

    const submit = (e) => {
        e.preventDefault();

        console.log(agent);
        patch(route("agent.update", agent.id));
    };

    const passwordReset = () => {
        router.visit(route("password.email"), {
            method: "post",
            data: {
                email: agent.email,
            },
            onSuccess: () => {
                open("Password reset link send", SUCCESS);
            },
        });
    };

    return (
        <>
            <Head title="Agent List" />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className={""}>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Profile Information
                                </h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Update the agent's profile information and
                                    email address.
                                </p>

                                <form
                                    onSubmit={submit}
                                    className="mt-6 space-y-6"
                                >
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Name"
                                        />

                                        <TextInput
                                            id="name"
                                            className="mt-1 block w-full"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required
                                            isFocused
                                            autoComplete="name"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.name}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                        />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            disabled
                                            defaultValue={agent.email}
                                            className="mt-1 block w-full text-gray-500"
                                            required
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.email}
                                        />
                                    </div>

                                    <div>
                                        <Select
                                            name="role"
                                            className="mt-1 block "
                                            variant="outlined"
                                            value={data.role}
                                            label="Select Role"
                                            onChange={(role) =>
                                                setData("role", role)
                                            }
                                        >
                                            {agentList.map((agent, idx) => {
                                                return (
                                                    <Option
                                                        key={idx}
                                                        value={agent.role_id}
                                                    >
                                                        {`${agent.name} (${agent.description})`}
                                                    </Option>
                                                );
                                            })}
                                        </Select>
                                    </div>

                                    <div className="flex justify-end items-center gap-4">
                                        <WarningButton
                                            className="bg-red-500"
                                            type="button"
                                            onClick={passwordReset}
                                        >
                                            Reset password
                                        </WarningButton>

                                        <PrimaryButton disabled={processing}>
                                            Save
                                        </PrimaryButton>

                                        <Transition
                                            show={recentlySuccessful}
                                            enterFrom="opacity-0"
                                            leaveTo="opacity-0"
                                            className="transition ease-in-out"
                                        >
                                            <p className="text-sm text-gray-600">
                                                Saved.
                                            </p>
                                        </Transition>
                                    </div>
                                </form>
                            </header>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

EditAgent.layout = (page) => (
    <Authenticated
        children={page}
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Agent (View and manage your team)
            </h2>
        }
    />
);

export default EditAgent;

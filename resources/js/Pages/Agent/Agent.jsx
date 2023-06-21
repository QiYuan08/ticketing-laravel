import PrimaryButton from "@/Components/PrimaryButton";
import SearchBox from "@/Components/SearchBox";
import StatusTag from "@/Components/StatusTag";
import Table from "@/Components/Table";
import { useDebounce } from "@/Hooks/useDebounce";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { getDateFromBackend } from "@/Utility/globalFunction";
import { Head, Link, router } from "@inertiajs/react";
import { Card, CardBody } from "@material-tailwind/react";
import { useState } from "react";

const Agent = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    // debounce to call API
    const debounceSearchAPI = useDebounce(() => {
        router.visit(route("agent.get"), {
            method: "get",
            data: { searchTerm: searchTerm },
            preserveScroll: true,
            preserveState: true,
        });
    });

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Agent (View and manage your team)
                </h2>
            }
        >
            <Head title="Agent List" />
            <Card>
                <CardBody>
                    <div className="max-w-8xl mx-auto py-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between py-3 px-2">
                            <SearchBox
                                searchValue={"Search by agent name, email"}
                                setSearchTerm={(value) => {
                                    setSearchTerm(value);
                                    debounceSearchAPI();
                                }}
                            />

                            <PrimaryButton
                                onClick={() => {
                                    router.visit("/new-agent");
                                }}
                            >
                                Add User
                            </PrimaryButton>
                        </div>

                        <div className=" ">
                            <Table
                                searchValue={"Seach by email, name, role"}
                                searchRoute={"agent"}
                                haveFilter={false}
                                header={[
                                    "Name",
                                    "Email",
                                    "Created On",
                                    "Updated On",
                                    "Role",
                                    "Action",
                                ]}
                                bodyRow={props.data.map((agents, idx) => {
                                    return (
                                        <tr
                                            className="odd:bg-gray-100"
                                            key={idx}
                                        >
                                            <td className="px-3 py-4 text-sm font-medium text-gray-800 ">
                                                {agents.name}
                                            </td>
                                            <td className="px-3 py-4 text-sm font-medium text-gray-800">
                                                {agents.email}
                                            </td>
                                            <td className="px-3 py-4 text-sm font-medium text-gray-800 w-1/6">
                                                {getDateFromBackend(
                                                    agents.created_at
                                                )}
                                            </td>
                                            <td className="px-3 py-4 text-sm font-medium text-gray-800 w-1/6">
                                                {getDateFromBackend(
                                                    agents.updated_at
                                                )}
                                            </td>
                                            <td className="px-3 py-4 text-sm font-medium text-gray-800 ">
                                                <StatusTag
                                                    status={agents.role.name}
                                                />
                                            </td>
                                            <td className="px-3 py-4 text-sm font-medium text-gray-800 text-left space-x-3">
                                                <Link
                                                    href={route(
                                                        "agent.update-view",
                                                        agents.id
                                                    )}
                                                    as="button"
                                                    className="text-blue-700 hover:text-blue-800 "
                                                    method="get"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "agent.delete",
                                                        {
                                                            agentID: agents.id,
                                                        }
                                                    )}
                                                    as="button"
                                                    className="text-red-700 hover:text-red-800 "
                                                    method="delete"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Authenticated>
    );
};

export default Agent;

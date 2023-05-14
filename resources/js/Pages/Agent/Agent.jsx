import PrimaryButton from "@/Components/PrimaryButton";
import SearchBox from "@/Components/SearchBox";
import Table from "@/Components/Table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { getDateFromBackend } from "@/Utility/globalFunction";
import { Head, Link, router } from "@inertiajs/react";

const Agent = (props) => {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Agent
                </h2>
            }
        >
            <Head title="Agent List" />
            <div className="max-w-8xl mx-auto py-4 sm:px-6 lg:px-8">
                <div className="flex justify-between py-3 px-2">
                    <SearchBox searchValue={""} searchRoute={""} />

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
                            "Agent ID",
                            "Name",
                            "Email",
                            "Created On",
                            "Updated On",
                            "Role",
                            "Action",
                        ]}
                        bodyRow={props.data.map((agents, idx) => {
                            console.log(agents);
                            return (
                                <tr className="odd:bg-gray-100" key={idx}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {agents.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {agents.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {agents.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {getDateFromBackend(agents.created_at)}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {getDateFromBackend(agents.updated_at)}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {agents.role.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        Edit
                                    </td>
                                </tr>
                            );
                        })}
                    />
                </div>
            </div>
        </Authenticated>
    );
};

export default Agent;

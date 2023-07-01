import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head, router, usePage } from "@inertiajs/react";
import { FaUserAlt } from "react-icons/fa";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import { Avatar } from "@material-tailwind/react";

function Edit({ mustVerifyEmail, status }) {
    let user = usePage().props.auth.user;

    const [profilePic, setProfilePic] = useState(user.profilePic);

    const handleUpload = (event) => {
        router.post(route("agent.update-photo", user.id), {
            data: { file: event.target.files[0] },
            preserveScroll: true,
        });
    };

    console.log(user);
    return (
        <>
            <Head title="Profile" />

            <div className="  max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col items-center gap-y-5 p-4 sm:p-8 bg-white shadow sm:rounded-lg w-full">
                    {user.profilePicture ? (
                        <Avatar
                            src={user.profilePicture}
                            alt="avatar"
                            size="xxl"
                        />
                    ) : (
                        <div className="m-auto rounded-full border-[1px] border-gray-600 border-box p-7 w-28 h-28">
                            <FaUserAlt color="gray" size={60} />
                        </div>
                    )}
                    <div class="flex items-center justify-center bg-grey-lighter">
                        <label class="w-64 flex flex-col items-center px-4 py-3 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue">
                            <span class="mt-2 text-base leading-normal">
                                Select a file
                            </span>

                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={handleUpload}
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="pb-12 pt-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </>
    );
}

Edit.layout = (page) => (
    <AuthenticatedLayout
        children={page}
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Profile
            </h2>
        }
    />
);

export default Edit;

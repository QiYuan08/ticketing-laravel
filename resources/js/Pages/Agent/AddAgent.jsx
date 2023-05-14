import { useState } from "react";
import {
    Stepper,
    Step,
    Button,
    Typography,
    Select,
    Option,
} from "@material-tailwind/react";
import {
    CogIcon,
    UserIcon,
    BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import { ADMIN, AGENT } from "@/Utility/constant";

const AddAgent = (props) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        role: "",
        password: "",
        password_confirmation: "",
    });

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post("/new-agent", {
            preserveScroll: true,
        });
    };

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

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
            <div className="w-4/5 py-4 px-8 mx-auto">
                <Stepper
                    activeStep={activeStep}
                    isLastStep={(value) => setIsLastStep(value)}
                    isFirstStep={(value) => setIsFirstStep(value)}
                >
                    <Step onClick={() => setActiveStep(0)}>
                        <UserIcon className="h-5 w-5" />
                        <div className="absolute -bottom-[4.5rem] w-max text-center">
                            <Typography
                                variant="h6"
                                color={activeStep === 0 ? "blue" : "blue-gray"}
                            >
                                Personal Details
                            </Typography>
                            <Typography
                                color={activeStep === 0 ? "blue" : "gray"}
                                className="font-normal"
                            >
                                Your name and email address.
                            </Typography>
                        </div>
                    </Step>
                    <Step onClick={() => setActiveStep(1)}>
                        <CogIcon className="h-5 w-5" />
                        <div className="absolute -bottom-[4.5rem] w-max text-center">
                            <Typography
                                variant="h6"
                                color={activeStep === 1 ? "blue" : "blue-gray"}
                            >
                                Security Details
                            </Typography>
                            <Typography
                                color={activeStep === 1 ? "blue" : "gray"}
                                className="font-normal"
                            >
                                Your new password.
                            </Typography>
                        </div>
                    </Step>
                </Stepper>
                <div className="mt-32 flex flex-col justify-between">
                    <form onSubmit={submit}>
                        {activeStep === 0 && (
                            <>
                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-3/5"
                                        autoComplete="current-email"
                                        onChange={handleOnChange}
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-3/5"
                                        autoComplete="current-email"
                                        onChange={handleOnChange}
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4 w-3/5">
                                    <InputLabel htmlFor="role" value="Role" />

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
                                        <Option value={ADMIN}>
                                            Admin (Can manage all settings)
                                        </Option>
                                        <Option value={AGENT}>
                                            Agent (Can edit/create tickets)
                                        </Option>
                                    </Select>

                                    <InputError
                                        message={errors.role}
                                        className="mt-2"
                                    />
                                </div>
                            </>
                        )}

                        {activeStep === 1 && (
                            <>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={handleOnChange}
                                        required
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                    />

                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={handleOnChange}
                                        required
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>
                            </>
                        )}

                        <div className="mt-4 flex justify-between">
                            <Button onClick={handlePrev} disabled={isFirstStep}>
                                Prev
                            </Button>
                            {isLastStep ? (
                                <Button type="submit">Submit</Button>
                            ) : (
                                <Button
                                    onClick={handleNext}
                                    disabled={isLastStep}
                                >
                                    Next
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
};

export default AddAgent;

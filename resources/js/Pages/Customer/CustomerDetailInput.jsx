import InputError from "@/Components/InputError";
import React from "react";

const CustomerDetailInput = ({
    value,
    handleChange,
    field,
    inputName,
    edit,
    pY = "py-6",
    error = "",
}) => {
    return (
        <div className={`${pY} px-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0`}>
            <dt className="text-sm font-medium leading-6 text-gray-900">
                {field}
            </dt>
            {edit ? (
                <div className="sm:col-span-2">
                    <input
                        type="text"
                        name={inputName}
                        value={value}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    />
                    <InputError message={error} />
                </div>
            ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {value}
                </dd>
            )}
        </div>
    );
};

export default CustomerDetailInput;

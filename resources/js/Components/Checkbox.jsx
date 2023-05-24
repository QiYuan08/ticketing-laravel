export default function Checkbox({ className = "", labelText, ...props }) {
    return (
        <div className="inline-flex items-center gap-2">
            <input
                {...props}
                type="checkbox"
                className={
                    "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " +
                    className
                }
            />
            <label className="">{labelText}</label>
        </div>
    );
}

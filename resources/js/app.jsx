import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

import { ThemeProvider } from "@material-tailwind/react";
import { NotificationProvider } from "./Context/NotificationContext";
import { MessageNotificationProvider } from "./Context/MailNotificationContext";
import Authenticated from "./Layouts/AuthenticatedLayout";

import.meta.glob(["../images/**"]);

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const page = resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        );
        page.then((module) => {
            module.default.layout = module.default.layout || DefaultLayoutFile;
        });
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider>
                <NotificationProvider>
                    <App {...props} />
                </NotificationProvider>
            </ThemeProvider>
        );
    },
    progress: {
        color: "#14b8a6",
    },
});

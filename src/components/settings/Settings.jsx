import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const defaultConfig = {
    theme: "dark",
    lang: "es"
};

export default function Settings({toggleDark}) {
    const [config, setConfig] = useLocalStorage("config", defaultConfig);

    const toggleMode = (event) => {
        event.preventDefault();
        setConfig((oldConfig) => ({
            ...oldConfig,
            theme: oldConfig.theme === "light" ? "dark" : "light",
        }));
        toggleDark();
    }

    return (
        <div className="text-right">
            <hr style={{ marginTop: 20, marginBottom: 20 }} />
            <h1 className="text-3xl text-cyan-800 font-semibold mb-4 dark:text-cyan-400">APP SETTINGS</h1>
            <p className="text-sm">Actual Config: <span className="italic">{config.theme}</span></p>
            <button className="btn mt-4" type="button" onClick={toggleMode}>
                Toggle Darkmode
            </button>
        </div>
    );
}
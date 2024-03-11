import React, { useState, useEffect } from "react"
import TaskList from "./lists/TaskList";
import Settings from "./settings/Settings";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
    const [dark, setDark] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        setDark(false);
    }, [])

    const toggleDark = () => setDark(!dark);
    return (
        <div className={`${dark ? " dark" : ""}`} >
            <div className={`h-screen p-4 flex flex-col bg-gray-100 dark:bg-slate-800 transition
            dark:text-gray-50`}>
                <TaskList showSettings={showSettings} setShowSettings={setShowSettings}></TaskList>
                <AnimatePresence
                    initial={false}
                    mode="wait"
                    onExitComplete={() => null}
                >
                    {showSettings &&
                        <motion.div
                            initial={{ y: '100vh' }}
                            animate={{ y: '0' }}
                            exit={{ y: '100vh' }}
                        >
                            <Settings toggleDark={toggleDark}></Settings>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div >
    )

}

export default App;
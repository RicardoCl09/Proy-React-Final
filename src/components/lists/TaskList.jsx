import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { addTask, getTasks, toggleComplete } from '../../firebase/taskController';

const TaskList = ({ showSettings, setShowSettings }) => {

    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        getTasks()
            .then(tasks => setTaskList([...tasks]))
            .catch((e) => console.error(e));
    }, [])


    const addNewTask = () => {
        if (newTask === "") return;
        // Añadir nueva tarea a Firestore
        const task = { task: newTask, completed: false }
        addTask(task)
            .then(() => {
                // Cuando se haya añadido -> Mostrar todas en el estado tasklist
                return setTaskList([...taskList, task]);
            })
            .catch((e) => console.error(e))
            .finally(() => setNewTask(""))
        // setTaskList([...taskList, { task: newTask, completed: false }]);
        // setNewTask("");
        return true;
    }

    const isTasksEmpty = () => taskList.length === 0;

    const editNewItem = (e) => setNewTask(e.target.value);

    const removeItem = (index) => {
        const newTaskList = taskList.filter((t, i) => i !== index);
        setTaskList(newTaskList);
    }

    const toggleCompleteItem = (index) => {
        // let newTaskList = taskList;
        let task = taskList.find(t => t.id === index);
        // Actualizar la base de datos
        toggleComplete(task)
            .then(async () => {
                const newTaskList = await getTasks();
                return setTaskList([...newTaskList]);
            })
            .catch((e) => console.error(e))
        // newTaskList[index].completed = !newTaskList[index].completed;
        // setTaskList([...newTaskList]);

    }

    const insertNewItemOnEnterKey = (e) => e.key === "Enter" && addNewTask();

    return (
        <>
            <header className='flex justify-between'>
                <h1 className='text-3xl text-sky-700 font-semibold dark:text-sky-300'>Task List v2 - Hosted on: Firebase</h1>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='btn' onClick={() => setShowSettings(!showSettings)}>{!showSettings ? "Show Settings" : "Hide Settings"}</motion.button>
            </header>
            <div className='my-4'>
                <input
                    className='shadow py-1 px-2 rounded-lg outline-none transition-all duration-300 
                    focus:ring-2 mr-2 dark:bg-slate-700'
                    value={newTask}
                    onKeyDown={insertNewItemOnEnterKey}
                    onChange={editNewItem}
                    placeholder='New Task'
                    type='text'
                />
                <button className='btn' onClick={addNewTask}>
                    Create task
                </button>
            </div>
            {isTasksEmpty() ? (
                <p>Task List is Empty</p>
            ) : (
                <ul>
                    {taskList.map((item, index) => (
                        <motion.li
                            initial={{ x: "100vw" }}
                            animate={{ x: 0 }}
                            key={index}>
                            <label className='cursor-pointer'>
                                <input
                                    type='checkbox'
                                    onClick={() => toggleCompleteItem(item.id)}
                                    checked={item.completed}
                                    onChange={() => { }}
                                />
                                <span className={`ml-2 text-gray-800 text-sm italic 
                            ${item.completed && "line-through"} dark:text-gray-100`}>
                                    {item.task}
                                </span>
                            </label>
                        </motion.li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default TaskList;

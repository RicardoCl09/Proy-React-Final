import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore"
import { db } from "."


export const addTask = (task) => {
    return addDoc(collection(db, 'tasks'), task)
}

export const getTasks = async () => {
    const querySnapshot = await getDocs(collection(db, 'tasks'))
    const tasks = querySnapshot.docs.map((doc) => {
        return {...doc.data(), id: doc.id}
    })
    return tasks
}

export const toggleComplete = (task) => {
    return setDoc(doc(db, 'tasks', task.id), {
        ...task,
        completed: !task.completed
    })
}
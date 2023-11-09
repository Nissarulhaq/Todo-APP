import { createContext, useContext, useState } from 'react'
const Mycontext = createContext();

export const Myprovider = ({ children }) => {
    const [todo, settodo] = useState('')
    const [todolist, setTodolist] = useState([]);
    const [personallist, setpersonallist] = useState([]);
    const [taskidcounter, settaskidcounter] = useState(new Date().getTime());
    const [usertype, setusertype] = useState('work')
    const [VisibleModal, setVisibleModal] = useState(false)
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false)
    const [complete, setcomplete] = useState([])
    const [Incomplete, setIncomplete] = useState([])
    const [RecycledTaskList, setRecycledTaskList] = useState([])

    return (
        <Mycontext.Provider value={{
            todo, settodo,
            todolist, setTodolist,
            personallist, setpersonallist,
            taskidcounter, settaskidcounter,
            usertype, setusertype,
            VisibleModal, setVisibleModal,
            date, setDate,
            open, setOpen,
            complete, setcomplete,
            Incomplete, setIncomplete,
            RecycledTaskList,setRecycledTaskList,
        }}>

            {children}
        </Mycontext.Provider>
    )
}


export const useMyContext = () => {
    return useContext(Mycontext);
}


import { View, StatusBar, Text, TextInput, StyleSheet, TouchableOpacity, Alert, FlatList, Modal, KeyboardAvoidingView, useColorScheme } from 'react-native'
import React, { useEffect, useRef, } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { useMyContext } from './WholeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';



const Home = () => {
    const Flastlistref = useRef(null);

    const {
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
        RecycledTaskList, setRecycledTaskList,
    } = useMyContext()

    useEffect(() => {
        const Alltasks = ([...todolist, ...personallist])
        const completeTask = Alltasks.filter(item => item.completed === true)
        const IncompleteTask = Alltasks.filter(item => item.completed === false)
        setcomplete(completeTask)
        setIncomplete(IncompleteTask)
    }, [todolist, personallist])

    // Function for Saving Data to Async Storage  
    const saveData = async () => {

        if (todo.trim() === '') {
            Alert.alert('please enter task')
            return;
        }

        const formattedDate = date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
        const newTask = {
            id: taskidcounter,
            text: todo,
            completed: false,
            currentdate: formattedDate,
            deleted: false,
        }

        if (usertype === 'personal') {
            const updatedList = ([...personallist, newTask])
            try {
                await AsyncStorage.setItem('PersonalData', JSON.stringify(updatedList));
                setpersonallist(updatedList)
                settaskidcounter(taskidcounter + 1)
                settodo('');
                Flastlistref.current.scrollToEnd({ animated: true })

            }
            catch (e) {
                console.warn('Error occored during Setting Data ')
            }
        }

        if (usertype === 'work') {
            const updatedList = ([...todolist, newTask])
            try {
                await AsyncStorage.setItem('WorkData', JSON.stringify(updatedList));
                setTodolist(updatedList)
                settaskidcounter(taskidcounter + 1)
                settodo('');
                Flastlistref.current.scrollToEnd({ animated: true })
            }
            catch (e) {
                console.warn('Error occored during Setting Data ')
            }

        }


    };

    // Function for Getting Data from Async Storage 
    const getData = async () => {

        if (usertype === 'personal') {
            try {
                const storedData = await AsyncStorage.getItem('PersonalData')
                if (storedData !== null) {
                    setpersonallist(JSON.parse(storedData));
                }
                console.log('text  is :' + storedData)
            }
            catch (e) {
                console.log('Error occored during Getting data from async storage')
            }
        }

        if (usertype === 'work') {
            try {
                const storedData = await AsyncStorage.getItem('WorkData')
                if (storedData !== null) {
                    setTodolist(JSON.parse(storedData));
                }
                console.log('text  is :' + storedData)
            }
            catch (e) {
                console.log('Error occored during Getting data from async storage')
            }
        }
    }

    // const fulldata= getData() confused now 
    useEffect(() => {
        getData();
    }, [usertype]);

    const handleInputChange = (text) => {
        settodo(text)
    }
    // Function for Deleting Single Task
    const deletetask = async (taskid) => {

        try {
            if (usertype === 'personal') {
                const personaltask = await AsyncStorage.getItem('PersonalData')
                Alert.alert('Confirm Deleteion', 'Are you sure Want to Delete your Task ?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('canceled'),
                            style: 'cancel'
                        },
                        {
                            text: 'Delete',
                            onPress: async () => {
                                if (personaltask !== null) {
                                    const personaltasks = JSON.parse(personaltask)
                                    const updatedTasks = personaltasks.filter((task) => (task.id !== taskid))
                                    const RecycledTask = personaltasks.filter((task) => {
                                        if (task.id === taskid) {
                                            task.deleted = true;
                                        }
                                        return task;
                                    })
                                    console.log('Recycled Task ' + JSON.stringify(RecycledTask));
                                    // let recyclebin=[...recyclebin, ...RecycledTask]
                                    await AsyncStorage.setItem('PersonalData', JSON.stringify(updatedTasks))
                                    setpersonallist(updatedTasks)
                                }
                            }
                        }
                    ],
                    { cancelable: false }
                )
            }

            if (usertype === 'work') {
                const worktask = await AsyncStorage.getItem('WorkData')
                Alert.alert('Confirm Deleteion', 'Are you sure Want to Delete your Task ?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('canceled'),
                            style: 'cancel'
                        },
                        {
                            text: 'Delete',
                            onPress: async () => {
                                if (worktask !== null) {
                                    const Worktasks = JSON.parse(worktask)
                                    const updatedTasks = Worktasks.filter((task) => (task.id !== taskid))
                                    await AsyncStorage.setItem('WorkData', JSON.stringify(updatedTasks))
                                    setTodolist(updatedTasks)
                                }
                            }
                        }
                    ],
                    { cancelable: false }
                )

            }

        } catch (e) {
            console.log('error during deleting the data ')
        }

    }


    const RecycledTask = async (taskid) => {
        try {
            if (usertype === 'personal') {
                const personaltask = await AsyncStorage.getItem('PersonalData')
                Alert.alert('Confirm Deleteion', 'Are you sure Want to Delete your Task ?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('canceled'),
                            style: 'cancel'
                        },
                        {
                            text: 'Move To Recyle-Bin',
                            onPress: async () => {
                                if (personaltask !== null) {
                                    const personaltasks = JSON.parse(personaltask)
                                    const RecycledTask = personaltasks.filter((task) => {
                                        if (task.id === taskid) {
                                            task.deleted = true;
                                        }
                                        return task;
                                    })
                                    // console.log('Recycled Task ' + JSON.stringify(RecycledTask));
                                    setRecycledTaskList = [...RecycledTaskList, RecycledTask]
                                    // await AsyncStorage.setItem('RecycledTask', JSON.stringify(RecycledTask))

                                }
                            }
                        }
                    ],
                    { cancelable: false }
                )
            }

            if (usertype === 'work') {
                const worktask = await AsyncStorage.getItem('WorkData')
                Alert.alert('Confirm Deleteion', 'Are you sure Want to Delete your Task ?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('canceled'),
                            style: 'cancel'
                        },
                        {
                            text: 'Delete',
                            onPress: async () => {
                                if (worktask !== null) {
                                    const Worktasks = JSON.parse(worktask)
                                    const RecycledTask = Worktasks.filter((task) => {
                                        if (task.id === taskid) {
                                            task.deleted = true;
                                        }
                                        return task;
                                    })
                                    // console.log('Recycled Task ' + JSON.stringify(RecycledTask));
                                    setRecycledTaskList = [...RecycledTaskList, RecycledTask]
                                    await AsyncStorage.setItem('RecycledTask', JSON.stringify(RecycledTask))
                                }
                            }
                        }
                    ],
                    { cancelable: false }
                )

            }

        } catch (e) {
            console.log('error during deleting the data ')
        }

    }

    // Function for Deleting All Tasks 
    const DeleteAllTasks = async () => {
        try {
            if (todolist.length <= 0 && personallist.length <= 0) {
                Alert.alert("No Tasks to Delete !")
                return
            }

            Alert.alert('Confirm Deletion', 'Are you sure you want to Delete all Your Tasks ? ',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancelled'),
                        style: 'cancel',
                    },
                    {
                        text: 'Delete',
                        onPress: async () => {
                            await AsyncStorage.removeItem("PersonalData")
                            await AsyncStorage.removeItem("WorkData")
                            setTodolist([]);
                            setpersonallist([]);
                            console.log('All Tasks deleted Successfully')
                        },
                    },
                ],
                { cancelable: false }
            );

        }
        catch (e) {
            console.log('error while deleting all elements ')
        }
    }

    // Fuction for Check Box 
    const taskdone = async (taskid) => {

        try {

            if (usertype === 'personal') {
                const personaltask = await AsyncStorage.getItem('PersonalData')
                if (personaltask !== null) {
                    const PTask = JSON.parse(personaltask)
                    const updatedTasks = PTask.map((item) => {
                        if (item.id === taskid) {
                            item.completed = !item.completed;
                        }
                        return item;
                    });
                    await AsyncStorage.setItem('PersonalData', JSON.stringify(updatedTasks))
                    setpersonallist(updatedTasks);

                }
            }

            if (usertype === 'work') {
                const worktask = await AsyncStorage.getItem('WorkData')
                if (worktask !== null) {
                    const WTask = JSON.parse(worktask)
                    const updatedTasks = WTask.map((item) => {
                        if (item.id === taskid) {
                            item.completed = !item.completed;
                        }
                        return item;
                    });
                    await AsyncStorage.setItem('WorkData', JSON.stringify(updatedTasks))
                    setTodolist(updatedTasks);

                }
            }

        }
        catch (e) {
            console.log('error during taskdone ')
        }
    }
    const colorTheme = useColorScheme();

    return (
        <View style={[
            styles.Container, { backgroundColor: colorTheme === 'dark' ? 'black' : 'white' }
        ]}>
            {/* Status bar  */}
            <StatusBar barStyle={'dark-content'} backgroundColor={'#E1DA00'} />

            {/*  Worktype Picker and Delete all button */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, }}>
                {/* worktype picker */}
                <View style={{ flex: 1, }}>
                    <Picker
                        style={{ fontWeight: 'bold', marginStart: 5, color: colorTheme === 'light' ? 'black' : 'white' }}
                        selectedValue={usertype}
                        mode='dropdown'
                        itemStyle={{ color: colorTheme === 'dark' ? 'black' : 'white' }}
                        dropdownIconColor={'#E1DA00'}
                        onValueChange={(item) => setusertype(item)
                            // setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Work" value="work" />
                        <Picker.Item label="Personal" value="personal" />
                    </Picker>
                </View>
                {/* Delete all button */}
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginEnd: 22, }}>
                    <TouchableOpacity style={styles.DelallBtn} onPress={DeleteAllTasks}>
                        <Text style={{ fontWeight: 'bold', color: 'black', textAlign: 'center', fontSize: 10, }}>
                            <Ionicons name="beer-outline" size={30} color="#000" />
                            Delete All</Text>
                    </TouchableOpacity>
                </View>

            </View>

            {/* Flatlist and Creat Button  */}
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <FlatList
                    // style={{ flexGrow: 0, marginTop: 10, }}
                    ref={Flastlistref}
                    data={usertype === 'personal' ? personallist : todolist}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.Taskcontainer}>
                            <View style={styles.Taskitem}>
                                <Text style={{
                                    textDecorationLine: item.completed ? 'line-through' : 'none',
                                    color: item.completed ? '#E1DA00' : 'white',
                                    color: colorTheme === 'light' ? 'black' : 'white',
                                    fontWeight: item.completed ? 'normal' : 'bold',
                                    fontSize: 20,
                                }} >{item.text}

                                </Text>
                                <Text style={{ color: colorTheme === 'light' ? 'black' : 'white', }}>
                                    {item.currentdate}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                                <BouncyCheckbox
                                    fillColor="green"
                                    unfillColor="#ffffff"
                                    iconStyle={{ borderColor: 'green' }}
                                    innerIconStyle={{ borderWidth: 1 }}
                                    size={32}
                                    isChecked={item.completed ? true : false}
                                    onPress={() => taskdone(item.id)}
                                />

                                <TouchableOpacity style={[styles.EditBtn, { backgroundColor: '#E1DA00', width: 48, }]} onPress={() => deletetask(item.id)} >
                                    <Text style={styles.BtnText}>
                                        <Ionicons name="trash-outline" size={32} color="#000" />
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>


                    )}
                />
                {/* {todolist.length <= 0 ? <Fallback /> : null} */}
                {/* Create Task button and Model */}
                <View style={{ marginVertical: 2, marginHorizontal: 5 }}>
                    <TouchableOpacity style={{ backgroundColor: '#E1DA00', height: 50, borderRadius: 10, justifyContent: 'center' }}
                        onPress={() => setVisibleModal(true)}
                    >
                        <Text style={{ textAlign: 'center', color: 'black', fontSize: 22, fontWeight: 'bold' }}>
                            Create Task
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
            {/* Flatlist View Container ends here  */}

            {/* This is Modal container  */}
            <View>
                <KeyboardAvoidingView
                    behavior="padding"  // Adjust the view when the keyboard appears
                    style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Modal
                        presentationStyle='overFullScreen'
                        animationType="slide"
                        transparent={true}
                        visible={VisibleModal}
                        onRequestClose={() => setVisibleModal(!VisibleModal)}
                    >

                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>

                            {/* Input Box and Add Button */}
                            <View style={{ backgroundColor: colorTheme === 'dark' ? 'black' : 'white', height: 'auto', width: '99%', borderRadius: 10, padding: 5, gap: 10, marginBottom: 1, }}>

                                <View>
                                    <TextInput placeholder='Add Your Task' style={styles.Inputbox} onChangeText={(item) => handleInputChange(item)} value={todo} />
                                </View>

                                <View>

                                    {/* Touchable opacity for date picker */}
                                    <View >
                                        <TouchableOpacity onPress={() => setOpen(true)} style={{
                                            height: 40, borderColor: 'wheat', borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5,
                                            marginBottom: 5,
                                        }} >
                                            <Text style={{ fontWeight: 'bold', }}>

                                                {date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Date Picker Container  */}
                                    <View>
                                        <DatePicker
                                            modal='datetime'
                                            format="DD-MM-YYYY"
                                            minimumDate={date}
                                            androidVariant='nativeAndroid'
                                            open={open}
                                            date={date}
                                            onConfirm={(date) => {
                                                setDate(date)
                                                setOpen(false)
                                            }}
                                            onCancel={() => {
                                                setOpen(false)
                                            }}
                                        />
                                    </View>
                                </View>

                                {/* Add buttons and close button in modal */}
                                <View style={{ flexDirection: 'row', marginBottom: 5, }}>

                                    {/* Close Button */}
                                    <View style={{ flex: 1, marginStart: 80, }}>
                                        <TouchableOpacity style={styles.Btn}
                                            onPress={() => setVisibleModal(false)}>
                                            <Text style={{ color: 'gray', fontSize: 25, }}>
                                                <Entypo name="back" size={30} color="#000" style={{}} />
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* Save button */}
                                    <View style={{ flex: 1, textAlign: 'center' }}>
                                        <TouchableOpacity style={[styles.Btn, { backgroundColor: '#E1DA00', }]}
                                            onPress={saveData}>
                                            <Text style={{ color: 'gray', fontSize: 15, }}>
                                                <MaterialIcons name="library-add-check" size={30} color="#000" style={{}} />
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </Modal>
                </KeyboardAvoidingView>
            </View>

        </View>
    )
}

export default Home

const styles = StyleSheet.create({

    Container: {
        flex: 1,
        backgroundColor: 'gray',
    },

    Inputbox: {
        height: 65,
        borderColor: 'wheat',
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 20,
        marginHorizontal: 5,
        marginTop: 40,
        marginBottom: 5,
    },

    Btn: {
        backgroundColor: '#FFBD33',
        height: 52,
        width: 80,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },

    Taskitem: {
        borderWidth: 2,
        borderColor: 'wheat',
        borderRadius: 10,
        fontWeight: 'bold',
        width:"66%",
        fontSize: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginVertical: 5,
        height: 'auto',

    },

    Taskcontainer: {
        flexDirection: "row",
    },

    EditBtn: {
        backgroundColor: 'wheat',
        height: 40,
        width: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop: 6,
        elevation: 3, // For Android shadow
        shadowColor: 'rgba(0, 0, 0, 0.3)', // For iOS shadow
        shadowOpacity: 0.8,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    DelallBtn: {
        backgroundColor: '#E1DA00',
        height: 'auto',
        width: '25%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // marginEnd: 15,
        // marginTop: 15,
    },

    BtnText: {
        color: 'black',
        fontWeight: 'bold'
    },

})
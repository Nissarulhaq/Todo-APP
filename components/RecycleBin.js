import { StyleSheet, Text, View, useColorScheme, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useMyContext } from './WholeContext'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RecycleBin = () => {
    const {
        usertype,
        todolist,
        personallist,
        RecycledTaskList, setRecycledTaskList,
    } = useMyContext()
    const colorTheme = useColorScheme();

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
                                    // const updateddelete= JSON.stringify(RecycledTask)
                                    // setRecycledTaskList([...RecycledTaskList, updateddelete])
                                    // await AsyncStorage.setItem('RecycledTask', updateddelete)

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
                                    setRecycledTaskList = ([...RecycledTaskList, RecycledTask])
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

    return (
        <View style={{ backgroundColor: colorTheme === 'dark' ? 'black' : 'white', flex: 1, }}>
            <View style={{ marginVertical: 5, }}>
                <Text style={{ color: colorTheme === 'light' ? 'black' : 'white', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
                    RecycleBin
                </Text>
            </View>

            {/* Flatlist and Creat Button  */}
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <FlatList
                    data={RecycledTaskList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.Taskcontainer}>
                            <View style={styles.Taskitem} >
                                <View style={{ flex: 1 }}>
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
                                {/* <View style={{ justifyContent: 'center', alignItems: "center" , }}>

                                    <TouchableOpacity style={[styles.EditBtn, { backgroundColor: '#E1DA00', width: 48, }]}  >
                                        <Text style={styles.BtnText}>
                                            <MaterialIcons name="settings-backup-restore" size={32} color="#000" />
                                        </Text>
                                    </TouchableOpacity>

                                </View> */}
                            </View>
                        </View>
                    )}
                />
                {/* Restore All Button */}
                <View style={{ marginVertical: 2, marginHorizontal: 5 }}>
                    <TouchableOpacity style={{ backgroundColor: '#E1DA00', height: 50, borderRadius: 10, justifyContent: 'center' }}
                    >
                        <Text style={{ textAlign: 'center', color: 'black', fontSize: 22, fontWeight: 'bold', }}>
                            Restore All
                            <MaterialIcons name="settings-backup-restore" size={20} color="#000" style={{}} />
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
            {/* Flatlist View Container ends here  */}
        </View>
    )
}

export default RecycleBin


const styles = StyleSheet.create({
    Container: {
        flex: 1,

    },
    Taskcontainer: {
        flexDirection: "row",
    },

    Taskitem: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: 'wheat',
        borderRadius: 10,
        fontWeight: 'bold',
        width: 400,
        fontSize: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginVertical: 5,
        height: 'auto'
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

})
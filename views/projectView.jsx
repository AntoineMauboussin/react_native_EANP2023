import { styles } from '../styles';
import React, { useContext,useEffect, useState } from 'react';
import {Column} from '../components/column';
import {TaskView} from '../views/taskView';
import { UserContext } from '../context'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert,Modal, Pressable, FlatList,ScrollView,Keyboard } from 'react-native';
import { getColumnsFromProject, getTasksFromColumns, addColumn, addTask, deleteColumn, deleteTask, editColumn, editTask } from '../api/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

//vue de la liste des tâches dans un projet, la majorité des CRUD sont accessibles à partir de cette vue sous forme de boutons ouvrant une modale
export function ProjectView(props) {

    const [newColumn, setNewColumn] = useState("");
    const [newTask, setNewTask] = useState("");
    const [id, setId] = useState(props.route.params.project[0]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalCenterVisible, setModalCenterVisible] = useState(false);
    const {columns, setColumns, refresh, setRefresh} = useContext(UserContext);
    const [modalRole, setModalRole] = useState("")
    const [currentColumn, setCurrentColumn] = useState("")
    const [currentTask, setCurrentTask] = useState("")
    const [currentColumnName, setCurrentColumnName] = useState("")
    const [currentTaskName, setCurrentTaskName] = useState("")

    //chargement des données du projet
    useEffect(() => {
        setColumns(null)
        getColumnsFromProject(id).then((res) => {
            let cnt = res.length
            res.forEach((el,key) => {
                getTasksFromColumns(el[0]).then((resTask) => {
                    el.push(resTask)
                    cnt === key+1 ? setColumns(res):null
                }).catch(err => Alert.alert(err.message))
            });
        }).catch(err => Alert.alert(err.message))
    }, [refresh]);

    function addColumnUI(){
        Keyboard.dismiss()
        setModalCenterVisible(false)
        if(newColumn === ""){return}
        addColumn(newColumn, id).then(setRefresh(!refresh)).catch(err => Alert.alert(err.message))
    }

    function delColumnUI(){
        Keyboard.dismiss()
        setModalCenterVisible(false)
        deleteColumn(currentColumn).then(setRefresh(!refresh)).catch(err => Alert.alert(err.message))
        getTasksFromColumns(currentColumn).then(res => {res.forEach(el => deleteTask(el[0]))}).catch(err => Alert.alert(err.message))
    }

    function editColumnUI(){
        Keyboard.dismiss()
        setModalCenterVisible(false)
        editColumn(newColumn, currentColumn).then(setTimeout(() => { setRefresh(!refresh) }, 1)).catch(err => Alert.alert(err.message))
    }

    function addTaskUI(){
        Keyboard.dismiss()
        setModalCenterVisible(false)
        if(newTask === ""){return}
        addTask(newTask, currentColumn).then(setRefresh(!refresh)).catch(err => Alert.alert(err.message))
    }

    function delTaskUI(){
        Keyboard.dismiss()
        setModalCenterVisible(false)
        deleteTask(currentTask).then(setRefresh(!refresh)).catch(err => Alert.alert(err.message))
    }

    function editTaskUI(){
        Keyboard.dismiss()
        setModalCenterVisible(false)
        editTask(newTask, currentTask).then(setTimeout(() => { setRefresh(!refresh) }, 1)).catch(err => Alert.alert(err.message))
    }
    
    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () =>(<View>
                <Modal
                    style={styles.modalContainer}
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(false);
                    }}
                >
                    <Pressable style={styles.modalCenteredContainer} onPress={() => setModalVisible(false)}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => {setModalVisible(false); setModalCenterVisible(true)}}>
                                <Text style={styles.modalText}>Ajouter un groupe de tâche</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalText}>Fermer</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Modal>
                <TouchableOpacity onPress={() => {setModalRole("addColumn");setModalVisible(true)}}><Icon style={styles.headerLeft} name="ellipsis-v"></Icon></TouchableOpacity>
            </View>),
        });
    }, [props.navigation,modalVisible]);

    return (
        <ScrollView style={styles.projectView}>
            <Modal
                style={styles.modalContainer}
                animationType="fade"
                transparent={true}
                visible={modalCenterVisible}
                onRequestClose={() => {
                setModalCenterVisible(false);
                }}
            >
                <Pressable style={styles.modalCenteredContainer} onPress={() => setModalCenterVisible(false)}>
                    {modalRole === "addColumn" ?
                    <View style={styles.modalCenteredView}>
                        <TextInput style={styles.modalInput} onChangeText={(value) => setNewColumn(value)} placeholder={"Nouveau groupe de tâches"}></TextInput>
                        <TouchableOpacity style={styles.modalButton} onPress={() => addColumnUI()}>
                            <Text style={styles.modalText}>Valider</Text>
                        </TouchableOpacity>
                    </View> :
                    modalRole === "addTask" ? 
                    <View style={styles.modalCenteredView}>
                        <TextInput style={styles.modalInput} onChangeText={(value) => setNewTask(value)} placeholder={"Contenu de la nouvelle tâche"}></TextInput>
                        <TouchableOpacity style={styles.modalButton} onPress={() => addTaskUI()}>
                            <Text style={styles.modalText}>Valider</Text>
                        </TouchableOpacity>
                    </View> :
                    modalRole === "delColumn" ? 
                    <View style={styles.modalCenteredView}>
                        <Text style={styles.modalText}>Confirmer la suppression du groupe de tâches ?</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => delColumnUI()}>
                            <Text style={styles.modalText}>Valider</Text>
                        </TouchableOpacity>
                    </View> :
                    modalRole === "delTask" ? 
                    <View style={styles.modalCenteredView}>
                        <Text style={styles.modalText}>Confirmer la suppression de la tâche ?</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => delTaskUI()}>
                            <Text style={styles.modalText}>Valider</Text>
                        </TouchableOpacity>
                    </View> : 
                    modalRole === "editColumn" ? 
                    <View style={styles.modalCenteredView}>
                        <TextInput style={styles.modalInput} onChangeText={(value) => setNewColumn(value)} defaultValue={currentColumnName}></TextInput>
                        <TouchableOpacity style={styles.modalButton} onPress={() => editColumnUI()}>
                            <Text style={styles.modalText}>Valider</Text>
                        </TouchableOpacity>
                    </View> :
                    modalRole === "editTask" ? 
                    <View style={styles.modalCenteredView}>
                        <TextInput style={styles.modalInput} onChangeText={(value) => setNewTask(value)} defaultValue={currentTaskName}></TextInput>
                        <TouchableOpacity style={styles.modalButton} onPress={() => editTaskUI()}>
                            <Text style={styles.modalText}>Valider</Text>
                        </TouchableOpacity>
                    </View> :
                    modalRole === "setImage" ? 
                    <View style={styles.modalCenteredView}>
                        <TextInput style={styles.modalInput} onChangeText={(value) => setNewTask(value)} defaultValue={currentTaskName}></TextInput>
                        <TouchableOpacity style={styles.modalButton} onPress={() => editTaskUI()}>
                            <Text style={styles.modalText}>Valider</Text>
                        </TouchableOpacity>
                    </View> : null
                    }
                </Pressable>
            </Modal>
            {columns !== null ? columns.map(function(tab, key){
                return <Column setTaskName={setCurrentTaskName} setColumnName={setCurrentColumnName} setTask={setCurrentTask} setModalRole={setModalRole} setColumn={setCurrentColumn} toggleModal={setModalCenterVisible} navigation={props.navigation} id={tab[0]} name={tab[1]} key={key} tasks={tab[2]} />;
            }) : ""}
            <TouchableOpacity onPress={() => {setModalRole("addColumn");setModalCenterVisible(true)}}><Icon style={styles.bigPlus} name="plus"></Icon></TouchableOpacity>
        </ScrollView>
    )
}
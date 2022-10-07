import { styles } from '../styles';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert,Modal, Pressable, FlatList,ScrollView,Keyboard } from 'react-native';
import { getColumnsFromProject, getProjects } from '../api/firebase';
import React, { useContext,useEffect, useState } from 'react';
import {Project} from '../components/project';
import { UserContext } from '../context'
import Icon from 'react-native-vector-icons/FontAwesome';
import { addProject } from '../api/firebase';

//vue de la list des projets (premiere vue après connexion)
export function TableListView(props) {
    
    const { projects, setProjects, refresh, setRefresh, setUser } = useContext(UserContext);
    const [modalCenterVisible, setModalCenterVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [newProject, setNewProject] = useState("");

    //options au niveau du header permettant de se déconnecter
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
                            <TouchableOpacity style={styles.modalButton} onPress={() => {setModalVisible(false);disconnect()}}>
                                <Text style={styles.modalText}>Se déconnecter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalText}>Fermer</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Modal>
                <TouchableOpacity onPress={() => {setModalVisible(true)}}><Icon style={styles.headerLeft} name="ellipsis-v"></Icon></TouchableOpacity>
            </View>),
        });
    }, [props.navigation,modalVisible]);

    function disconnect(){
        setUser(null)
    }

    function addProjectUI(){
        Keyboard.dismiss()
        setModalCenterVisible(false)
        if(newProject === ""){return}
        addProject(newProject).then(setRefresh(!refresh)).catch(err => Alert.alert(err.message))
    }

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
                    <View style={styles.modalCenteredView}>
                        <TextInput style={styles.modalInput} onChangeText={(value) => setNewProject(value)} placeholder={"Nouveau projet"}></TextInput>
                        <TouchableOpacity style={styles.modalButton} onPress={() => addProjectUI()}>
                            <Text style={styles.modalText}>Valider</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
            {projects !== null ? projects.map(function(tab, key){
                return <Project navigation={props.navigation} id={tab[0]} name={tab[1]} key={key} />;
            }) : null}
            <TouchableOpacity onPress={() => {setModalCenterVisible(true)}}><Icon style={styles.bigPlus} name="plus"></Icon></TouchableOpacity>
            
        </ScrollView>
    )
}
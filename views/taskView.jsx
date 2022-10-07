import { styles } from '../styles';
import { Login } from '../components/login';
import { useContext, useState, useEffect } from 'react';
import {Task} from '../components/task';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert,Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteTask } from '../api/firebase';
import { UserContext } from '../context'

//vue d'une tâche unique accessible à partir de la liste des tâches dans un projet
export function TaskView(props) {

    const [name, setName] = useState(props.route.params.name);
    const [id, setId] = useState(props.route.params.id);
    const [uri, setUri] = useState(props.route.params.uri);
    const [modalVisible, setModalVisible] = useState(false);
    const {refresh,setRefresh} = useContext(UserContext);

    function deleteTaskUI(id){
        deleteTask(id).then().catch(err => Alert.alert(err.message))
        setModalVisible(false)
        setRefresh(!refresh)
    }

    //options au niveau du header permettant de supprimer la tâche
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
                            <TouchableOpacity style={styles.modalButton} onPress={() => deleteTaskUI(id)}>
                                <Text style={styles.modalText}>Supprimer la tâche</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalText}>Fermer</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Modal>
                <TouchableOpacity onPress={() => setModalVisible(true)}><Icon style={styles.headerLeft} name="ellipsis-v"></Icon></TouchableOpacity>
            </View>),
        });
    }, [props.navigation,modalVisible]);

    return (
        <SafeAreaView>
            <Task view={"detail"} id={id} name={name} imageUri={uri} />
        </SafeAreaView>
    )
}
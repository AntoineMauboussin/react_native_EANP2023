import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert,Image } from 'react-native';
import { styles } from '../styles';
import { useContext, useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { editTaskImage } from '../api/firebase';
import { UserContext } from '../context'

const Stack = createStackNavigator();

//composant d'une tâche simple
export function Task(props) {
    const [image, setImage] = useState(props.imageUri);
    const {refresh, setRefresh} = useContext(UserContext);

    function openModal(role) {
        props.setModalRole(role);
        props.setTask(props.id)
        props.setTaskName(props.name)
        props.toggleModal(true)
    }

    function goToTask(){
        props.navigation.navigate(props.id)
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.cancelled) {
            editTaskImage(result.uri, props.id).then(()=> setRefresh(!refresh))
            return result
        }
    }

    return (
        props.view === "list" ? 
        <TouchableOpacity onPress={() => {goToTask()}} style={styles.task}>
            <TouchableOpacity style={styles.imageTask} onPress={() => pickImage().then((res) => {setImage(res.uri)}).catch(err => {})}><Icon style={styles.iconTask} name="file-image-o"></Icon></TouchableOpacity>
            <TouchableOpacity style={styles.pencilTask} onPress={() => openModal("editTask")}><Icon style={styles.iconTask} name="pencil"></Icon></TouchableOpacity>
            <TouchableOpacity style={styles.crossTask} onPress={() => openModal("delTask")}><Icon style={styles.iconTask} name="times"></Icon></TouchableOpacity>
            <Text style={styles.taskText} onPress={() => {goToTask()}}>{props.name}</Text>
            {image !== undefined ? <Image style={styles.image} source={{ uri: image }} />: null}
        </TouchableOpacity>
        :
        <View style={styles.taskView}>
            <Text style={styles.taskViewText}>{props.name}</Text>
            {image !== undefined ? <Image style={styles.image} source={{ uri: image }} />: null}
        </View>
    )
}
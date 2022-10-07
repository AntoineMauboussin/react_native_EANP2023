import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert,Modal, Pressable } from 'react-native';

import { styles } from '../styles';
import { useContext, useState } from 'react';
import {Task} from './task';
import Icon from 'react-native-vector-icons/FontAwesome';

//composant d'un groupe de tâches
export function Column(props) {

    function openModal(role) {
        props.setModalRole(role)
        props.setColumn(props.id)
        props.setColumnName(props.name)
        props.toggleModal(true)
    }

    return (
        <View style={styles.column}>
            <TouchableOpacity style={styles.plus} onPress={() => openModal("addTask")}><Icon style={styles.icon} name="plus"></Icon></TouchableOpacity>
            <TouchableOpacity style={styles.pencil} onPress={() => openModal("editColumn")}><Icon style={styles.icon} name="pencil"></Icon></TouchableOpacity>
            <TouchableOpacity style={styles.cross} onPress={() => openModal("delColumn")}><Icon style={styles.icon} name="times"></Icon></TouchableOpacity>
            <Text style={styles.columnText}>{props.name}</Text>
            {props.tasks !== undefined ? props.tasks.map(function(tab, key){
                return <Task setTaskName={props.setTaskName} view={"list"} toggleModal={props.toggleModal} setModalRole={props.setModalRole} setTask={props.setTask} navigation={props.navigation} imageUri={tab[2]} id={tab[0]} name={tab[1]} key={key} />;
            }): null}
        </View>
    )
}
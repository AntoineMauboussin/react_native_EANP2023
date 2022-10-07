import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles';
import { useContext, useState } from 'react';
import { UserContext } from '../context'

//composant représentant un projet dans la liste des projets
export function Project(props) {

    function goToProject(){
        props.navigation.navigate(props.name)
    }

    return (
        <TouchableOpacity style={styles.project} onPress={() => goToProject()}>
            <Text>{props.name}</Text>
        </TouchableOpacity>
    )
}
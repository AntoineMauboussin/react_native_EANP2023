import { createStackNavigator } from '@react-navigation/stack';
import { TableListView } from '../views/tableListView';
import React, { useContext,useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert,Modal, Pressable } from 'react-native';
import { getProjects } from '../api/firebase';
import { UserContext } from '../context'
import { TaskView } from '../views/taskView';
import { ProjectView } from '../views/projectView';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../styles';

const Stack = createStackNavigator();

//routeur par empilement, créé des routes en fonction des tâches présentes dans le projet
export function TableRouter({projects}) {
    const {columns, setColumns} = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);

    function generateNavTab(){
        let tasks = []
        columns.forEach(el => {
            el[2] !== undefined ? el[2].forEach(task => {
                tasks.push(task)
            }) : null
        })

        return tasks
    }

    return (
        <Stack.Navigator TabBarPosition="bottom" >
            <Stack.Screen name="Liste des projets" component={TableListView} />
            {projects !== null ? projects.map(function(tab, key){
                return <Stack.Screen name={tab[1]} key={key} component={ProjectView} initialParams={{"project":tab}}/>;
            }) : null}
            {columns !== null ? generateNavTab().map(function(tab,key){
                return <Stack.Screen name={tab[0]} key={"2-"+key} options={{ title: "Détails"}} component={TaskView} initialParams={{"uri":tab[2],"name":tab[1],"id":tab[0]}}/>;
            }) : null}
        </Stack.Navigator>
    )
}
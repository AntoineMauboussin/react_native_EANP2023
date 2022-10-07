import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { UserContext } from './context'
import { NavigationContainer } from '@react-navigation/native'
import { UserRouter } from './router/userRouter';
import { TableRouter } from './router/tableRouter';
import { getProjects } from './api/firebase';

export default function App() {

  //variable globales utilisés en contexte
  const [projects, setProjects] = useState(null);
  const [columns, setColumns] = useState(null);
  const [refresh, setRefresh] = useState(false)
  const [user, setUser] = useState(null);
  
  //charge les données de projets
  useEffect(() => {
    getProjects().then((res) => {setProjects(res)}).catch(err => Alert.alert(err.message))
  }, [refresh]);


  //retourne vers l'interface de connexion ou l'interface de projets en fonction de si un utilisateur est connecté
  return (
      <UserContext.Provider value={{ user, setUser, projects, setProjects, columns, setColumns, refresh, setRefresh}} >
        <NavigationContainer>
          {(user) ? <TableRouter projects={projects}></TableRouter> : <UserRouter></UserRouter>}
        </NavigationContainer>
      </UserContext.Provider>
  );
}

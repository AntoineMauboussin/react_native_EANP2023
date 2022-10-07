import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert,Keyboard } from 'react-native';
import { styles } from '../styles';
import { useContext, useState } from 'react';
import { UserContext } from '../context'
import { connectUser } from '../api/firebase';

//composant de la connexion
export function Login() {

    const { setUser } = useContext(UserContext);
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    function loginUser(){
        Keyboard.dismiss()
        connectUser(email, password).then((res) => setUser(res)).catch(err => Alert.alert("Combinaison e-mail / mot de passe invalide"))
    }

    return (
        <SafeAreaView>
            <TextInput style={styles.formInput} onChangeText={(value) => setEmail(value)} placeholder={"E-mail"} />
            <TextInput style={styles.formInput} secureTextEntry={true} onChangeText={(value) => setPassword(value)} placeholder={"Mot de passe"} />
            <TouchableOpacity onPress={loginUser}>
                <Text style={styles.formButton}>Se connecter</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
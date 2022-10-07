import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { styles } from '../styles';
import { useContext, useState } from 'react';
import { UserContext } from '../context'
import { createUser } from '../api/firebase';

//composant de l'inscription
export function Signin() {

    const { setUser } = useContext(UserContext);
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    function signinUser(){
        Keyboard.dismiss()
        createUser(email, password).then((res) => setUser(res)).catch(err => Alert.alert("Mot de passe : 6+ caractères, le format de l'e-mail doit être valide"))
    }

    return (
        <SafeAreaView>
            <TextInput style={styles.formInput} onChangeText={(value) => setEmail(value)} placeholder={"E-mail"} />
            <TextInput style={styles.formInput} secureTextEntry={true} onChangeText={(value) => setPassword(value)} placeholder={"Mot de passe"} />
            <TouchableOpacity onPress={signinUser}>
                <Text style={styles.formButton}>S'inscrire</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
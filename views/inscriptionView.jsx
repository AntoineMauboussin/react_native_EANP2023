import { styles } from '../styles';
import { Text, Alert, Keyboard, SafeAreaView } from 'react-native'
import { Signin } from '../components/signin';

export function InscriptionView() {
    
    return (
        <SafeAreaView style={styles.form}>
            <Signin/>
        </SafeAreaView>
    )
}
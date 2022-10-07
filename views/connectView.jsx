import { styles } from '../styles';
import { Text, Alert, Keyboard, SafeAreaView } from 'react-native'
import { Login } from '../components/login';

export function ConnectView() {
    
    return (
        <SafeAreaView style={styles.form}>
            <Login/>
        </SafeAreaView>
    )
}
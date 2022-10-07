import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { ConnectView } from '../views/connectView';
import { InscriptionView } from '../views/inscriptionView';

const Tab = createMaterialTopTabNavigator()

export function UserRouter() {
    return (
        <Tab.Navigator tabBarPosition="bottom">
            <Tab.Screen name="connect" component={ConnectView} />
            <Tab.Screen name="inscription" component={InscriptionView} />
        </Tab.Navigator>
    )
}
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/user/HomeScreen";
import MenuScreen from "../screens/user/MenuScreen";
import ProfileScreen from "../screens/user/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function UserNavigator(){

    return (

        <Tab.Navigator>


            <Tab.Screen
                name="Inicio"
                component={HomeScreen}
            />


            <Tab.Screen
                name="Menu"
                component={MenuScreen}
            />


            <Tab.Screen
                name="Perfil"
                component={ProfileScreen}
            />


        </Tab.Navigator>

    );

}
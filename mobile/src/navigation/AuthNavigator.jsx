import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OptionScreen from "../screens/auth/OptionScreen";
import LoginScreen from "../screens/auth/LoginScreen";

//User
import UserScreenEmail from "../screens/auth/RegisterScreen-Email";
import UserScreenPassword from "../screens/auth/RegisterScreen-Password";
import UserScreenCode from "../screens/auth/RegisterScreen-Code";

//Buffet
import BuffetScreenEmail from "../screens/auth/RegisterScreen-Email";
import BuffetScreenPassword from "../screens/auth/RegisterScreen-Password";
import BuffetScreenCode from "../screens/auth/RegisterScreen-Code";
import BuffetScreenSuccess from "../screens/auth/SuccessScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator(){

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >

            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />


            <Stack.Screen
                name="Register"
                component={RegisterScreen}
            />

        </Stack.Navigator>

    );

}
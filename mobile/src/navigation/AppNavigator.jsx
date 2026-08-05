import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import UserNavigator from "./UserNavigator";
import BuffetNavigator from "./BuffetNavigator";

export default function AppNavigator(){

    // Esto después viene del contexto de autenticación
    // const { user } = useAuth();
    const isLoggedIn = false;


    return (

        <NavigationContainer>

            {
                isLoggedIn 
                ? 
                <UserNavigator />
                :
                <AuthNavigator />
            }

        </NavigationContainer>

    );

}
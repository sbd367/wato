import { View, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import GlobalState from "../store/stateStore";
import { Overlay, Card, Input, Button } from "react-native-elements";
import { Text } from "react-native-elements";
const LoginModal = (props) => {
    const gState = useContext(GlobalState);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = () => {
       gState.logIn(username, password);
    }
    const createNewUser = () => {
        gState.createUser(username, password);
    }
    return(
        <View>
            <Overlay isVisible={!gState.isLoggedIn}>
                <Card>
                <Text>Login</Text>
                <Input onChangeText={(val, ind)=>setUsername(val)} label='username' value={username}/>
                <Input onChangeText={(val, ind)=>setPassword(val)} label='password' value={password}/>
                <Button title='Login' onPress={loginUser}/>
                <Button title='Create an account' onPress={createNewUser}/>
                </Card>
            </Overlay>
        </View>
    )
};
const styles = StyleSheet.create({
    
})
export default LoginModal;
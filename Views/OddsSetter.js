import { View, StyleSheet } from "react-native";
import { Button, Card, ListItem } from "react-native-elements";
import { useState } from "react";
import axios from "axios";
const OddsSetter = () => {
    const [odds, setOdds] = useState(0);
    const [users, setUsers] = useState([]);
    const [usersLoaded, setUsersLoaded] = useState(false);
    const getUsers = () => {
        console.log('runs')
        axios.get('http://05e3-67-4-153-189.ngrok.io/api/v1/user')
        .then(res => {
            if(usersLoaded === false){
                let results = res.data;
                results.forEach(res => {
                    console.log(res)
                    setUsers(user => ([
                        ...user,
                        res
                    ]));
                });
                setUsersLoaded(true);
            }
        });
    }
    const addFriend = (userId) => {
        //POST request for friend invite.
    }
    return(
        <View>
            <Card>
                {
                    users.map((user, ind) => (
                        <ListItem
                            key={ind}
                            title='this'
                            subtitle={`W:${user.wins} L:${user.loss}`}
                            bottomDivider
                            onPress={addFriend(user)}
                        />
                    ))
                }
                <Button title='press for users' onPress={getUsers}/>
                <Button title='Add Friend' onPress={addFriend}/>
            </Card>
        </View>
    );
}
const styles = StyleSheet.create({
    selection: {
        height: 60, 
        width: 150,
        alignSelf: 'center'
    },
    topText: {
        color: 'black',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 50,
        fontSize: 22,
        fontWeight: 'bold',
    }
})
export default OddsSetter;
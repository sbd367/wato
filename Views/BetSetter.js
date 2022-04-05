import { useEffect, useState } from "react"
import { View } from "react-native";
import { Button, Input, Card, Text } from "react-native-elements"
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const BetSetter = () => {
    const [bet, setBet] = useState('');
    const [wager, setWager] = useState(0);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [opponent, setOpponent] = useState("");

    useEffect(() => {
        axios.get('http://05e3-67-4-153-189.ngrok.io/api/v1/user')
        .then(res => {
            let results = res.data[0];
            setUser(user => ({
                ...user,
                ...results
            }));
            setUsers(user => [
                ...user,
                ...res.data
            ]);

        });
    }, []);

    const setTheBet = (value) => {
        return setBet(value);
    }
    const makeTheBet = () => {
        axios.post('http://05e3-67-4-153-189.ngrok.io/api/v1/bet', {
            betName: bet,
            wagers: [wager, 0],
            users: [user.id, opponent]
        }).then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <View>
            <Card>
                <Card.Title>What are the odds...</Card.Title>
                <Input 
                    placeholder="You type some random text"
                    onChangeText={value => setTheBet(value)}
                    />
                <Text h2>1 in...</Text>
                <Picker onValueChange={(itemValue, ind) => {setWager(parseInt(itemValue))}}>
                    <Picker.Item label="1 (I'm gonna do that)" value={1}/>
                    <Picker.Item label="2" value={2}/>
                    <Picker.Item label="3" value={3}/>
                    <Picker.Item label="4" value={4}/>
                    <Picker.Item label="5" value={5}/>
                    <Picker.Item label="6" value={6}/>
                    <Picker.Item label="7" value={7}/>
                </Picker>
                <Text h3>Who are you betting?</Text>
                <Picker onValueChange={(itemValue, ind) => {setOpponent(itemValue)}}>
                    {
                        users.map((u, i) => (
                            <Picker.Item key={i} label={u.username} value={u.id}/>
                        ))
                    }
                </Picker>
                <Button title="Set the odds" onPress={makeTheBet}/>
            </Card>
        </View>
    )
}
export default BetSetter;
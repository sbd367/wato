import { View, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { Card } from "react-native-elements";
import { Text, Button } from "react-native-elements";
import axios from "axios";
import GlobalState from "../store/stateStore";

const StatsPage = (props) => {
    const gState = useContext(GlobalState);
    const [wins, setWins] = useState(0);
    const [loss, setLoss] = useState(0);
    const getStats = () => {
       axios.get('http://localhost:8080/api/v1/user').then(res => {
           console.log(gState);
           let win = res.data[0].wins,
            losses = res.data[0].loss;
           setLoss(losses.toString());
           setWins(win.toString());
           console.log(wins)
       }).catch(error => {
           console.log(error);
       });
    }
    return(
        <View>
        <Text style={styles.topText} h4 h4Style={{color: 'black'}}>Stats: {props.user.username}</Text>
            <Card>
                <Card.Title>Wins: {wins}</Card.Title>
                <Card.Title>Losses: {loss}</Card.Title>
                <Button onPress={getStats} title='get stats'  />
            </Card>
        </View>
    )
};
const styles = StyleSheet.create({
    topText: {
        color: 'black',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 50,
        fontSize: 22,
        fontWeight: 'bold',
    }
})
export default StatsPage;
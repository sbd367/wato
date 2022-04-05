import { View, StyleSheet } from "react-native";
import { useContext } from "react";
import { Card } from "react-native-elements";
import { Text} from "react-native-elements";
import GlobalState from "../store/stateStore";

const StatsPage = () => {
    const {userData} = useContext(GlobalState);
    return(
        <View>
        <Text style={styles.topText} h4 h4Style={{color: 'black'}}>Stats: {userData.username}</Text>
            <Card>
                <Card.Title>Wins: {userData.wins}</Card.Title>
                <Card.Title>Losses: {userData.loss}</Card.Title>
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
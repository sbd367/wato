import { View, StyleSheet } from "react-native";
import { PickerIOS } from "@react-native-picker/picker";
import { Text } from "react-native-elements";
import { useState } from "react";
const OddsSetter = () => {
    const [odds, setOdds] = useState(0);
    return(
        <View>
            <Text style={styles.topText} h4 h4Style={{color: 'black'}}>Enter a bet and set the odds.</Text>
            <PickerIOS
            selectedValue={odds}
            style={styles.selection}
            onValueChange={(itemValue, ind) => {setOdds(parseInt(itemValue))}}
            >
                <PickerIOS.Item label='0' value={0}/>
                <PickerIOS.Item label='1' value={1}/>
                <PickerIOS.Item label='2' value={2}/>
                <PickerIOS.Item label='3' value={3}/>
                <PickerIOS.Item label='4' value={4}/>
                <PickerIOS.Item label='5' value={5}/>
            </PickerIOS>
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
import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button,} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import NumericInput from './numericInput';
import Icon from 'react-native-vector-icons/Feather';

export default function Layer(props) {
    const [nodeNumber, setNodeNumber] = useState(0);
    const [activation, setActivation] = useState('relu');

    const data = ["relu", 'sine', 'tanh']

    const onNodeChange = number => {
        if(!isNaN(number) && number < 100 && number > 0){
            setNodeNumber(number);
            const current = props.json;
            current[props.number] = [nodeNumber, activation]
            props.set(current);
        } else {
            alert("Please enter only number");
        }
    }

    return (
        <View style={styles.container}>
            <Text>Layer {props.number + 1}</Text>
            <View style={styles.activation}>
                <Text>Activation Function</Text>
                <Picker
                selectedValue={activation}
                    style={{height: "100%", width: 100}}
                    onValueChange={(itemValue, itemIndex) =>
                        setActivation(itemValue)
                    }
                    mode="dropdown"
                    >
                    <Picker.Item label="ReLu" value="relu" />
                    <Picker.Item label="Tanh" value="tanh" />
                    <Picker.Item label="Sine" value="sine" />
                </Picker>
            </View>
            <View style={styles.nodeInput}>
                <Text style={{fontSize: 30}}>Number of Nodes</Text>
                <NumericInput style={{height: 100}} value={nodeNumber} onChange={setNodeNumber}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: "#F08080",
        borderRadius:10,
        margin: 10,
        alignItems: "center",
        justifyContent: "space-around",
        display: "flex",
        height: 300,
        fontSize: 100
    },
    nodeInput: {
        height: 100,
        backgroundColor:"#CD5C5C",
        width: '90%',
        borderRadius:10,
        justifyContent: "space-around",
        alignItems: "center"
    },
    activation: {
        height: 100,
        justifyContent:'center',
        alignItems: 'center'
    }
})
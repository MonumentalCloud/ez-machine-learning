import React, {useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function NumericInput(props) {
    const number = props.value;

    const minus = () => {
        if(number > 0) {
            props.onChange(number - 1);
        }
    }
    const plus = () => {
        if(number < 101) {
            props.onChange(number + 1);
        }
    }

    return (
        <View style={styles.container}>
            <Icon.Button style={styles.button} name="minus" size={30} onPress={minus}/>
            <TextInput maxLength={3} onChangeText={input => props.onChange(input)}>{number}</TextInput>
            <Icon.Button style={styles.button} name="plus" size={30} onPress={plus}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '5%',
        backgroundColor: "#F08080",
        width: 150,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderRadius: 10,
    },
    button: {
       backgroundColor: "#E9967A",
       width: '100%',
       height: '100%'
    }
})
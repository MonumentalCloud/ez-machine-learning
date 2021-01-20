import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, TextInput, SafeAreaView, Text, Button, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Layer from './components/layer.js';
import NumericInput from './components/numericInput.js';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('window').width;

export default function App() {
  const [layerNumber, setLayerNumber] = useState(0);
  const [finalJSON, setFinalJSON] = useState([]);

  function onLayerChanged(number) {
    if(number >= 0 && number <= 100) {
      setLayerNumber(number);
      console.log(layerNumber);
    } else {
      alert("please enter a number!")
    }
  }

  const onSubmit = () => {
    // fetch("http://localhost:19002/", {
    //   method: "POST",
    //   headers: {
    //     Authorization: "Token Something"
    //   },
    //   body: {
    //     layers: layerNumber,
    //     content:{},

    //   }
    // })
    // .then(response => console.log(response))
    // .catch(err => console.log(err))
    console.log(finalJSON)
  }

  const myIcon = (<Icon name="rocket" size={30} color="#900" />)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scroller}>
        <NumericInput value={layerNumber} onChange={onLayerChanged} />
        {myIcon}
        <ScrollView style={{width: "100%", height: '100%'}}>

        {Array.from(Array(layerNumber).keys()).map((layer) => <Layer style={{justifyContent:"center", alignItems: "center"}} key={layer} number={layer} set={setFinalJSON} json={finalJSON}/>)}
        </ScrollView>
      </View>
      <Button title="Submit" onPress={onSubmit}></Button>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#CD5C5C',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 100
  },
  scroller: {
    width: '100%',
    height: '90%',
    backgroundColor: "#CD5C5C",
    justifyContent: 'center',
    alignItems: 'center'
  }
});

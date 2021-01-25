import React, {useState} from 'react';
import styles from './layer.module.css';
import Dense from '../Dense/dense';
import Pooling from '../Pooling/pooling';
import Convolutional from '../Convolutional/convolutional';
import { FormGroup, Form, Input, Button,  } from 'reactstrap';

export default function Layer(props) {
    const [layerType, setLayerType] = useState(props.thisLayer[0]);

    function renderSwitch(layerType) {
        const current = props.json;
        switch(layerType) {
            case 'MaxPooling':
            //     current[props.number] = {'type':'pooling',
            //     'poolSize': 1,
            //     'stride': 1
            // };
            //     props.set(current);
                return <Pooling number={props.number} json={props.json} set={props.set} />
            case 'Convolutional':
                // current[props.number] = {
                //     'type' : 'convolution',
                //     'activation': 'relu',
                //     'kernelSize' : 1,
                //     'stride' : 1
                // };
                // props.set(current);
                return <Convolutional number={props.number} json={props.json} set={props.set} />
            default:
                // current[props.number] = {
                //     'type': 'dense',
                //     'node' : 1,
                //     'activation':'relu'
                // };
                // props.set(current);
                return <Dense number={props.number} json={props.json} set={props.set}/> 
        }
    }

    return (
        <div key={props.key} className={styles.container}>
            <Form className={styles.layer}>
                <FormGroup>
                    <label>Types of Layer</label><br/>
                    <Input type="select" name="select" id="activationselect" onChangeCapture={e => setLayerType(e.target.value)}>
                    <option>Dense</option>
                    <option>MaxPooling</option>
                    <option>Convolutional</option>
                    </Input>
                </FormGroup>
            </Form>
            {renderSwitch(layerType)}
        </div>
    )
}
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
                return <Pooling number={props.number} json={props.json} set={props.set} />
            case 'Convolutional':
                return <Convolutional number={props.number} json={props.json} set={props.set} />
            default:
                return <Dense number={props.number} json={props.json} set={props.set}/> 
        }
    }

    return (
        <div key={props.key} className={styles.container}>
            <label style={{alignItems: 'center'}}>Layer {props.number}</label><br/>
            <Form className={styles.layer}>
                <FormGroup>
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
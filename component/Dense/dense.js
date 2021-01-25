import React, {useEffect, useState} from 'react';
import styles from './dense.module.css';
import { FormGroup, Form, Input } from 'reactstrap';

export default function Dense(props) {
    const [node, setNode] = useState(1);
    const [activation, setActivation] = useState('relu');

    useEffect(() => {const current = props.json.slice();
    current[props.number] = {
        'type': 'dense',
        'node' : node,
        'activation': activation
    };
    props.set(current);},[node, activation])

    const handleNode = (e) => {
        const value = parseInt(e.target.value);
        if(value) {
            if(value> 100) {
                setNode(10);
            } else if(value < 0){
                setNode(0);
            } else {
                setNode(value);
            }
        } else {
            setNode(0);
        }
    }

    const handleActivation = (e) => {
        setActivation(e.target.value);
    }

    return (
        <div key={props.key} className={styles.container}>

            <Form className={styles.layer}>
                <FormGroup>
                <label className=" form-control-label" htmlFor="example-number-input">
                    Number of Nodes
                </label>
                <br />
                <Input
                    defaultValue="0"
                    id="node-input"
                    type="number"
                    value={node}
                    onChange={handleNode}
                    max={100}
                    min={0}

                ></Input>
                </FormGroup>
                <FormGroup>
                    <label>Activation Function</label><br/>
                    <Input type="select" name="select" id="activationselect" value={activation} onChange={handleActivation}>
                    <option>Relu</option>
                    <option>Tanh</option>
                    <option>Sine</option>
                    </Input>
                </FormGroup>
        </Form>
        </div>
    )
}
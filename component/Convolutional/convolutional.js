import styles from './convolutional.module.css';
import React, {useEffect, useState} from 'react';
import { FormGroup, Form, Input } from 'reactstrap';

export default function Convolutional(props) {
    const [activation, setActivation] = useState('relu');    
    const [kernelSize, setKernelSize] = useState(1);
    const [stride, setStride] = useState(1);
    
    useEffect(() => {const current = props.json.slice();
    current[props.number] = {
        'type' : 'convolution',
        'activation': activation,
        'kernelSize' : kernelSize,
        'stride' : stride
    };
    props.set(current);},[activation, kernelSize, stride])


    const handleActivation = (e) => {
        setActivation(e.target.value);
        onChange();
    }
    const handleKernel = (e) => {
        const value = parseInt(e.target.value);
        if(value) {
            if(value> 100) {
                setKernelSize(10);
            } else if(value < 1){
                setKernelSize(1);
            } else {
                setKernelSize(value);
            }
        } else {
            setKernelSize(1);
        }
    }

    const handleStride = (e) => {
        if(e.target.value > poolSize) {
            alert('Stride cannot be bigger than kernel size!')
        } else {

            setStride(e.target.value);
        }
    }

    return (
        <div key={props.key} className={styles.container}>

            <Form className={styles.layer}>
                <FormGroup>
                    <label>Activation Function</label><br/>
                    <Input type="select" name="select" id="activationselect" value={activation} onChange={handleActivation}>
                    <option>Relu</option>
                    <option>Tanh</option>
                    <option>Sine</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                <label className=" form-control-label" htmlFor="example-number-input">
                    Kernel Size: {kernelSize} X {kernelSize}
                </label>
                <br />
                <Input
                    defaultValue="0"
                    id="node-input"
                    type="number"
                    value={kernelSize}
                    onChange={handleKernel}
                    max={100}
                    min={0}

                ></Input>
                </FormGroup>
                <FormGroup>
                <label className=" form-control-label" htmlFor="example-number-input">
                    Stride Size: {stride} X {stride}
                </label>
                <br />
                <Input
                    defaultValue="0"
                    id="node-input"
                    type="number"
                    value={stride}
                    onChange={handleStride}
                    max={10}
                    min={0}

                ></Input>
                </FormGroup>
        </Form>
        </div>
    )
}
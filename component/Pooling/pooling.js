import styles from './pooling.module.css';
import React, {useEffect, useState} from 'react';
import { FormGroup, Form, Input } from 'reactstrap';

export default function Pooling(props) {
    const [poolSize, setPoolSize] = useState(1);
    const [stride, setStride] = useState(1);

    // const onChange = () => {
    //     let current = props.json.slice();
    //     current[props.number] = {'type':'pooling',
    //     'poolSize': poolSize,
    //     'stride': stride
    // };
    //     props.set(current);
    //     console.log(current, current[0]);
    // }

    useEffect(() => {

        const current = props.json.slice();
        current[props.number] = {'type':'pooling',
            'poolSize': poolSize,
            'stride': stride
        };
        props.set(current);
    },[poolSize, stride])

    const handleSize = (e) => {
        const value = parseInt(e.target.value);
        if(value) {
            if(value> 100) {
                setPoolSize(10);
            } else if(value < 1){
                setPoolSize(1);
            } else {
                setPoolSize(value);
            }
        } else {
            setPoolSize(1);
        }
    }

    const handleStride = (e) => {
        if(e.target.value > poolSize) {
            alert('Stride cannot be bigger than poolsize!')
        } else {

            setStride(e.target.value);
        }
    }

    return (
        <div key={props.key} className={styles.container}>

            <Form className={styles.layer}>
                <FormGroup>
                <label className=" form-control-label" htmlFor="example-number-input">
                    Pool Size
                </label>
                <br />
                <Input
                    defaultValue="0"
                    id="node-input"
                    type="number"
                    value={poolSize}
                    onChange={handleSize}
                    max={10}
                    min={0}

                ></Input>
                </FormGroup>
                <FormGroup>
                <label className=" form-control-label" htmlFor="example-number-input">
                    Stride Size
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
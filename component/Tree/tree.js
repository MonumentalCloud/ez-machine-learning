import React, {useState} from 'react';
import styles from './tree.module.css';
import LayerNodeGroup from './layerNodeGroup/layerNodeGroup';
import { FormGroup, Form, Input, Button,  } from 'reactstrap';

export default function Tree(props) {

    return (
        <div className={styles.container}>
            {props.json.map(layerData => <LayerNodeGroup layerData={layerData}/>)}
        </div>
    )
}
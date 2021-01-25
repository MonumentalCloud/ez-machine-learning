import React from 'react';
import Node from './Node/node';
import styles from './layerNodeGroup.module.css'

export default function LayerNodeGroup(props) {

    const handleNodeType = () => {
        const data = props.layerData
        switch(data['type']) {
            case 'dense':
                return [...Array(data['node']).keys()].map(() => <Node />)
            case 'convolution':
                return [...Array(data['kernel']).keys()].map(() => <Node />)
            default:
                return [...Array(data['poolSize']).keys()].map(() => <Node />)
        }
    }

    return(
        <div className={styles.container}>
            {handleNodeType()}
        </div>
    )
}
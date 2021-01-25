import React, {useEffect, useState} from 'react';
import {signIn, signOut, useSession} from 'next-auth/client';
import { FormGroup, Form, Input, Button } from 'reactstrap';
import styles from './main.module.css';
import Layer from '../layer/layer.js';
import Tree from '../Tree/tree.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';


export default function Main(props) {
    const [session, loading] = useSession();
    
    const [layer, setLayer] = useState(0);
    const [finalJSON, setFinalJSON] = useState([]);

    useEffect(() => {
        console.log(finalJSON)
    },[finalJSON])

    function handleRemove() {
        let current = finalJSON.slice();
        current.splice(-1, 1);
        setFinalJSON(current);
        setLayer(current.length);
    }

    const handleAdd = () => {
        if(layer < 10 ) {

            setLayer(layer + 1);
            const current = finalJSON;
            current.push({
                'type': 'dense',
                'node' : 1,
                'activation':'relu'
            })
        }
    }

    const handleClick = (e) => {
        e.preventDefault(); 
        const value = parseInt(e.target.value);
        if(value) {
            if(value> 10) {
                setLayer(10);
            } else if(value < 0){
                setLayer(0);
            } else {
                setLayer(value);
            }
        } else {
            setLayer(0);
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(finalJSON)
        return null;
    }

    return (
    <div className={styles.container}>
        <div className={styles.user}>
            {session.user.image && <img src={session.user.image} style={{width: '25px', borderRadius: "3px"}} />}
            <p>Hello! Welcome {session.user.name}</p>
            <button onClick={signOut}>Sign Out</button>
        </div>

        <div className={styles.layerVisualizer}>
            {finalJSON.map((layer, index) => <Layer handleRemove={handleRemove} thisLayer={layer} setLayer={setLayer} key={index} number={index} json={finalJSON} set={setFinalJSON}/>)}
        </div>

        <div className={styles.layer}>
            <Button onClick={handleAdd} className={styles.button}><FontAwesomeIcon icon={faPlus} className={styles.buttonIcon}/></Button>
                <label className=" form-control-label" htmlFor="example-number-input">
                    Layer Number: {layer}
                </label>
                <br />            
            <Button onClick={handleRemove} className={styles.button}> <FontAwesomeIcon icon={faMinus} className={styles.buttonIcon}/></Button>
        </div>

        <div className={styles.tree}>
            <Tree json={finalJSON}/>
        </div>
        <div>
            <button type='submit' onClick={e => handleSubmit(e)}>Submit</button>
        </div>

    </div>
    )
}

import React, {useEffect, useState} from 'react';
import {signIn, signOut, useSession} from 'next-auth/client';
import { FormGroup, Form, Input, Button } from 'reactstrap';
import styles from './main.module.css';
import Layer from '../layer/layer.js';
import Tree from '../Tree/tree.js';
import StartPage from '../startPage/startPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'

export default function Main(props) {
    const [session, loading] = useSession();
    
    const [layer, setLayer] = useState(0);
    const [finalJSON, setFinalJSON] = useState([]);
    const [token, setToken] = useState();
    const [initiate, setInitiate] = useState(false);
    const [id, setId] = useState();

    const url = 'https://postmanai.herokuapp.com'

    useEffect(() => {
        console.log(finalJSON)
    },[finalJSON])

    useEffect(() => {
        if(session) {

            fetch(`${url}/register`, {
                method:'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(rawResp => rawResp.json())
            .then(resp => setToken(resp))
            .catch(err => console.log(err));
        }
    },[session])

    function handleRemove() {
        let current = finalJSON.slice();
        current.splice(-1, 1);
        setFinalJSON(current);
        setLayer(current.length);
        // fetch(`https://postmanai.heroku.com/poplayer?modelid=${id}`, {
        //     method: 'DEL',
        //     headers: {
        //         apikey: token
        //     }
        // })
        // .catch(err => console.log(err))
    }

    const handleAdd = () => {
        if(layer < 10 ) {

            setLayer(layer + 1);
            const current = finalJSON;
            current.push({
                'type': 'dense',
                'node' : 1,
                'activation':'relu'
            });
        }
    }

    const handleSubmit = () => {
        finalJSON.map((layerData, index) => {
            if(layerData['type'] === 'dense') {
                fetch(`${url}/appenddenselayer?modelid=${id}&units=${layerData['node']}&activation=${layerData['activation']}&use_bias=true&name=dense-layer${index}`, {
                    method: 'POST',
                    headers: {
                        apikey: token
                    }
                })

            } else if(layerData['type'] === 'embedding') {
                fetch(`${url}/appendembeddinglayer?modelid=${id}&input_dim=${layerData['input_dim']}&output_dim=${layerData['output_dim']}&input_len=${layerData['input_len']}&mask_zero=false`, {
                    method: 'POST',
                    headers: {
                        apikey: token
                    }
                })
            }
        })
    }

    return (
    <div className={styles.container}>
        <div className={styles.user}>
            {session.user.image && <img src={session.user.image} style={{width: '25px', borderRadius: "3px"}} />}
            <p>Hello! Welcome {session.user.name}</p>
            <button style={{backgroundColor: "#748dc3", border: "none", fontWeight: "100", color: "white", borderRadius: "2px"}} onClick={signOut}>Sign Out</button>
        </div>

        {
            true?
        (<div>
        <div className={styles.layerVisualizer}>
            {finalJSON.map((layer, index) => <Layer handleRemove={handleRemove} thisLayer={layer} setLayer={setLayer} key={index} number={index} json={finalJSON} set={setFinalJSON}/>)}
        </div>

        <div className={styles.layer}>
            <Button onClick={handleAdd} className={styles.button}><FontAwesomeIcon icon={faPlus} className={styles.buttonIcon}/></Button>
                <label className=" form-control-label" htmlFor="example-number-input">
                    {layer}
                </label>     
            <Button onClick={handleRemove} className={styles.button}> <FontAwesomeIcon icon={faMinus} className={styles.buttonIcon}/></Button>
        </div>

        <div className={styles.tree}>
            <Image src="/nn.png" width="970" height="600"/>
            {/* <Tree json={finalJSON}/> */}
        </div>
        <button type="submit" onClick={handleSubmit} className={styles.done}>I'm done!</button>
        </div>) :
        <StartPage id={id} setId={setId} setInitiate={setInitiate} token={token}/>
        }


    </div>
    )
}

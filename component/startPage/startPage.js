import React, {useState} from 'react';
import styles from './startPage.module.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default function StartPage(props) {
    const setId = props.setId
    const id = props.id
    const[name, setName] = useState();
    const[model, setModel] = useState();
    const[desc, setDesc] = useState();

    const handleInitiate = (e) => {
        e.preventDefault()
        fetch(`https://postmanai.herokuapp.com/createmodel?id=${id}&name=${name}&model=${model}&desc=${desc}`, {
            method: 'PUT',
            headers: {
                apikey: props.token
            }
        })
        .then(resp => {
            if(resp.status === 201) {
                props.setInitiate(true);
            } else {
                alert('That id is already taken!')
            }
        })
        .catch(err => console.log(err))
    }

    const handleModel = type => {
        switch(type) {
            case 'Regression':
                setModel('reg')
                break;
            case 'Bayes Net':
                setModel('bn')
                break;
            default:
                setModel('nn')
                break;
        }
    }


    return (
        <div className={styles.container}>
            <Form className={styles.form} onSubmit={e => handleInitiate(e)}>
                <FormGroup>
                    <Label>Id</Label><br/>
                    <Input type="textarea" name="text" id="exampleText" onChange={e => setId(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Name your model!</Label><br/>
                    <Input type="textarea" name="text" id="exampleText" onChange={e => setName(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Model</Label><br/>
                    <Input type="select" name="select" id="exampleSelect" onChange={e => handleModel(e.target.value)}>
                    <option>Regression</option>
                    <option>Bayes Net</option>
                    <option>Neural Net</option>
                    </Input>                
                </FormGroup>
                <FormGroup>
                    <Label>Describe your Model</Label><br/>
                    <Input type="textarea" name="text" id="exampleText" onChange={e => setDesc(e.target.value)}/>
                </FormGroup>
                <Button type="submit">Let's make a model!</Button>
            </Form>
        </div>
    )
}
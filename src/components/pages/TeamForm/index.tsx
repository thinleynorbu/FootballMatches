import React, { useState } from 'react';
import { createUseStyles } from "react-jss";
import { useHistory } from 'react-router-dom';
import { Button } from '../../atoms/Button';
import { TextField } from '../../atoms/Input';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { API } from '../../../api';
import { Alert } from '../../atoms/Alert';

let useStyles = createUseStyles((theme: any) => {
    return {
        container: {
            display: 'flex',
            paddingTop: 30,
            width: "100%"
        },
        header: {
            fontSize: 24,
            fontWeight: 600,
            marginBottom: 24
        },
        form: {
            width: "60%"
        },
        input: {
            marginBottom: 15
        },
        row: {
            display: 'flex',
            justifyContent: "space-between",
            marginBottom: 25
        },
        submit: {
            marginTop: 15,
            width: "25%"
        },
        formWrapper: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        },
        backButton: {
            marginRight: 50,
            fontSize: 22,
            marginLeft: 15
        }
    };
});

const TeamForm = () => {
    const classes = useStyles();
    const history = useHistory()
    const [formValue, setFormValue] = useState("" as string);
    const [formError, setFormError] = useState("" as string);

    const handleChange = (data: any) => {
        setFormValue(data.target.value);
    }

    const validate = async () => {
        let toContinue = true;
        if (formValue === "") {
            setFormError("Required")
            return false
        }
        const data = await API.get('/teams')
        if (data.data.length > 0) {
            data.data.forEach((item: any) => {
                if (item.name.toUpperCase() === formValue.toUpperCase()) {
                    setFormError("Team already exists")
                    toContinue = false;
                }
            })
        }
        return toContinue;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const isValid = await validate();
            console.log(isValid, "idvla")
            if (isValid) {
                await API.post('/teams', { name: formValue })
                Alert("Team added", "success")
                history.push('/')
            }
        } catch (err) {
            Alert("Error occured", "error")
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.backButton}>
                <ArrowLeftOutlined onClick={() => history.goBack()} />
            </div>
            <div className={classes.formWrapper}>
                <div className={classes.header}>
                    Add Team
                </div>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        onChange={handleChange}
                        name={"teamName"}
                        wrapperClass={classes.input}
                        placeholder={"Team Name"}
                        label={"Team Name"}
                        type="text"
                        editValue={formValue}
                        error={formError}
                    />

                    <Button
                        htmlType={"submit"}
                        className={classes.submit}
                        type={"primary"}
                    >
                        Submit
                </Button>
                </form>
            </div>
        </div>
    )
}

export default TeamForm;
import React, { EventHandler, useEffect, useState } from 'react';
import { createUseStyles } from "react-jss";
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../../atoms/Button';
import { DatePickerComponent } from '../../atoms/Datepicker';
import { TextField } from '../../atoms/Input';
import { ArrowLeftOutlined } from '@ant-design/icons';

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
            justifyContent: "space-between"
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

const MatchForm = () => {
    const classes = useStyles();
    const params = useParams();
    const history = useHistory()
    const { id }: any = useParams();
    const [formValue, setFormValue] = useState({});

    useEffect(() => {
        if (id) {

        }
    }, [])

    const handleChange = (data: any, date?: any) => {
        if (date) {
            setFormValue({ ...formValue, [data]: date })
            return;
        }
        setFormValue({ ...formValue, [data.target.name]: data.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
    }
    console.log(formValue, "als;kdfj")
    return (
        <div className={classes.container}>
            <div className={classes.backButton}>
                <ArrowLeftOutlined onClick={() => history.goBack()} />
            </div>
            <div className={classes.formWrapper}>
                <div className={classes.header}>
                    {id ? "Edit Match" : " Add Match"}
                </div>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.row}>
                        <TextField
                            onChange={handleChange}
                            name={"homeTeam"}
                            wrapperClass={classes.input}
                            placeholder={"Home Team"}
                            label={"Home Team"}
                            type="text"
                        />
                        <TextField
                            wrapperClass={classes.input}
                            label={"Score"}
                            name={"homeScore"}
                            placeholder={"Score"}
                            onChange={handleChange}
                            type="number"
                            positive
                        />
                    </div>
                    <div className={classes.row}>
                        <TextField
                            wrapperClass={classes.input}
                            label={"Away Team"}
                            name={"awayTeam"}
                            placeholder={"Away Team"}
                            onChange={handleChange}
                            type="text"
                        />
                        <TextField
                            wrapperClass={classes.input}
                            label={"Score"}
                            name={"awayScore"}
                            placeholder={"Score"}
                            type="number"
                            onChange={handleChange}
                            positive
                        />
                    </div>
                    <DatePickerComponent
                        label={"Match Date"}
                        name={"date"}
                        onClear={() => console.log("clear")}
                        onChange={handleChange}
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

export default MatchForm;
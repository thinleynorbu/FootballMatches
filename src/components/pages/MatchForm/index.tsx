import React, { EventHandler } from 'react';
import { createUseStyles } from "react-jss";
import { Button } from '../../atoms/Button';
import { DatePickerComponent } from '../../atoms/Datepicker';
import { TextField } from '../../atoms/Input';

let useStyles = createUseStyles((theme: any) => {
    return {
        container: {
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 30,
            flexDirection: 'column',
            alignItems: 'center'
        },
        header: {
            fontSize: 24,
            fontWeight: 600,
            marginBottom: 24
        },
        form: {
            width: "60%",
            margin: 'auto'
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
        }
    };
});

const MatchForm = () => {
    const classes = useStyles();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                Add Match
            </div>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.row}>
                    <TextField
                        wrapperClass={classes.input}
                        placeholder={"Home Team"}
                        label={"Home Team"}
                        type="text"
                    />
                    <TextField
                        wrapperClass={classes.input}
                        label={"Score"}
                        placeholder={"Score"}
                        type="number"
                        positive
                    />
                </div>
                <div className={classes.row}>
                    <TextField
                        wrapperClass={classes.input}
                        label={"Away Team"}
                        placeholder={"Away Team"}
                        type="text"
                    />
                    <TextField
                        wrapperClass={classes.input}
                        label={"Score"}
                        placeholder={"Score"}
                        type="number"
                        positive
                    />
                </div>
                <DatePickerComponent
                    label={"Match Date"}
                    onClear={() => console.log("clear")}
                    onChange={() => console.log('falksd')}
                />
                <Button
                    htmlType={"submit"}
                    className={classes.submit}
                    type={"primary"}
                >Submit</Button>
            </form>
        </div>
    )
}

export default MatchForm;
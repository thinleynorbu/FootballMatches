import React from 'react';
import ResultTable from '../../molecules/ResultTable';
import { Button } from '../../atoms/Button';
import { useHistory } from 'react-router-dom';
import { createUseStyles } from "react-jss";



let useStyles = createUseStyles((theme: any) => {
    return {
        container: {
            paddingTop: 30,
            width: "100%"
        },
        addButton: {
            display: 'flex',
            marginRight: 20,
            marginLeft: "auto",
            marginBottom: 20
        }
    };
});




const Result = () => {
    const history = useHistory();
    const classes = useStyles()

    const handleTabChange = () => {

    }
    return (
        <div className={classes.container}>
            <Button type={"primary"} className={classes.addButton} onClick={() => history.push('match-form')}>Add Match</Button>
            <ResultTable />
        </div>
    )
}

export { Result }
import React, { useEffect, useState } from 'react';
import ResultTable from '../../molecules/ResultTable';
import { Button } from '../../atoms/Button';
import { useHistory } from 'react-router-dom';
import { createUseStyles } from "react-jss";
import { API } from '../../../api';



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


interface ResultData {
    key: string
    homeTeam: string
    date: string
    awayTeam: string
    homeScore: number
    awayScore: number
}




const Result = () => {
    const history = useHistory();
    const classes = useStyles();
    const [tableData, setTableData] = useState([] as ResultData[])

    const fetchMatches = async () => {
        const res = await API.get('match')
        const data = res.data;
        if (res.data.length > 0) {
            setTableData(data)
        }
        // console.log(res, "dat")
    }

    useEffect(() => {
        fetchMatches()
    }, [])
    console.log(tableData, "daflkfdsj")
    const data = [
        {
            key: '1',
            homeTeam: 'John Brown',
            date: 32,
            awayTeam: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            homeTeam: 'Jim Green',
            date: 42,
            awayTeam: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            homeTeam: 'Joe Black',
            date: 32,
            awayTeam: 'Sidney No. 1 Lake Park',
        },
    ];


    return (
        <div className={classes.container}>
            <Button type={"primary"} className={classes.addButton} onClick={() => history.push('match-form')}>Add Match</Button>
            <ResultTable tableData={tableData} />
        </div>
    )
}

export { Result }
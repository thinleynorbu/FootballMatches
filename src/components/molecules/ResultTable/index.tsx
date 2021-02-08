import React from 'react';
import { Table, Tag, Space } from 'antd';
import { Button } from '../../atoms/Button';
import { Router, useHistory } from 'react-router-dom';
import { createUseStyles } from "react-jss";
import moment from 'moment';

interface Props {
    tableData: any[]
}


let useStyles = createUseStyles((theme: any) => {
    return {
        container: {
            width: '100%'
        },
        win: {
            color: theme.textGreen
        }
    };
});

const ResultTable: React.FC<Props> = ({ tableData }) => {
    const history = useHistory()
    const classes = useStyles()
    const columns = [
        {
            title: 'Home Team',
            dataIndex: 'homeTeam',
            key: 'homeTeam',
            render: (text: string, data: any) => (
                <span className={data.homeScore > data.awayScore ? classes.win : ""}>
                    {text}{" "}{`(${data.homeScore})`}
                </span>
            ),
        },
        {
            title: 'Away Team',
            dataIndex: 'awayTeam',
            key: 'awayTeam',
            render: (text: string, data: any) => (
                <span className={data.awayScore > data.homeScore ? classes.win : ""}>
                    { text}{" "}{`(${data.awayScore})`}
                </span >
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text: string) => (
                <>{moment(text).format('DD-MM-YYYY')}</>
            ),
        },

        {
            title: 'Action',
            key: 'action',
            render: (item: any) => (
                <Space size="middle">
                    <Button type={"default"} onClick={() => {
                        history.push(`match-form/${item.id}`)
                    }
                    } >Edit Match</Button>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <div className={classes.container}>
            {tableData.length > 0 &&
                <Table columns={columns} dataSource={tableData} />
            }
        </div>
    )
}

export default ResultTable;
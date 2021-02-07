import React from 'react';
import { Table, Tag, Space } from 'antd';
import { createUseStyles } from "react-jss";


let useStyles = createUseStyles((theme: any) => {
    return {
        container: {
            width: '100%'
        }
    };
});

const columns = [
    {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Team Name',
        dataIndex: 'teamName',
        key: 'teamName',
    },
    {
        title: 'Total Games',
        dataIndex: 'totalGames',
        key: 'totalGames',
    },
    {
        title: 'Wins',
        dataIndex: 'wins',
        key: 'wins',
    },
    {
        title: 'Draws',
        dataIndex: 'draws',
        key: 'draws',
    },
    {
        title: 'Loss',
        dataIndex: 'loss',
        key: 'loss',
    },

    {
        title: 'Points',
        key: 'points',
        dataIndex:'points'
    },
];

const data = [
    {
        key: '1',
        totalGames: 'John Brown',
        position: 32,
        teamName: 'New York No. 1 Lake Park',
        wins: 1,
        loss:2,
        draws:3,
        points:23
    },
    {
        key: '2',
        totalGames: 'Jim Green',
        position: 42,
        teamName: 'London No. 1 Lake Park',
        wins: 1,
        loss:2,
        draws:3,
        points:23

    },
    {
        key: '3',
        totalGames: 'Joe Black',
        position: 32,
        teamName: 'Sidney No. 1 Lake Park',
        wins: 1,
        loss:2,
        draws:3,
        points:23
    },
];


const LeagueTable = () => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <Table columns={columns} dataSource={data} />,
        </div>
    )
}

export default LeagueTable;
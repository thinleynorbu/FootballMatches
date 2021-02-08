import React from 'react';
import { Table } from 'antd';
import { createUseStyles } from "react-jss";
import { LeagueData } from '../../pages/League';

interface Props {
    leagueData: LeagueData[]
}


let useStyles = createUseStyles((theme: any) => {
    return {
        container: {
            width: '100%',
        }
    };
});

const columns: any = [
    {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
        sorter: (a: any, b: any) => {
            return (a.points - b.points)
        },
        sortOrder: "descend",
        render: (text: string, item: any, index: number) => <span>{index + 1}</span>,
    },
    {
        title: 'Team Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Total Games',
        dataIndex: 'match',
        key: 'match',
    },
    {
        title: 'Wins',
        dataIndex: 'wins',
        key: 'wins',
    },
    {
        title: 'Draws',
        dataIndex: 'draw',
        key: 'draw',
    },
    {
        title: 'Loss',
        dataIndex: 'loss',
        key: 'loss',
    },

    {
        title: 'Points',
        key: 'points',
        dataIndex: 'points',
        render: (text: number) =>
            <span>{text}</span>
    },
];

const LeagueTable: React.FC<Props> = ({ leagueData }) => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <Table showSorterTooltip={false}
                rowKey={"id"}
                columns={columns}
                dataSource={leagueData}
                pagination={false}
            />,
        </div>
    )
}

export default LeagueTable;
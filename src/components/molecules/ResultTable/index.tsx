import React from 'react';
import { Table, Tag, Space } from 'antd';
import { Button } from '../../atoms/Button';

const columns = [
    {
        title: 'Home Team',
        dataIndex: 'homeTeam',
        key: 'homeTeam',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Away Team',
        dataIndex: 'awayTeam',
        key: 'awayTeam',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },

    {
        title: 'Action',
        key: 'action',
        render: (text: any, record: any) => (
            <Space size="middle">
                <Button type={"default"} >Edit Match</Button>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        homeTeam: 'John Brown',
        date: 32,
        awayTeam: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        homeTeam: 'Jim Green',
        date: 42,
        awayTeam: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        homeTeam: 'Joe Black',
        date: 32,
        awayTeam: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];


const ResultTable = () => {
    return (
        <div>
            <Table columns={columns} dataSource={data} />,
        </div>
    )
}

export default ResultTable;
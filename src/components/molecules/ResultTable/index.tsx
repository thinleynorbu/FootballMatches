import React from 'react';
import { Table, Space } from 'antd';
import { Button } from '../../atoms/Button';
import { useHistory } from 'react-router-dom';
import { createUseStyles } from "react-jss";
import moment from 'moment';
import { ResultData } from "../../pages/Results"

interface Props {
    tableData: ResultData[]
}


let useStyles = createUseStyles((theme: any) => {
    return {
        container: {
            width: '100%'
        },
        win: {
            color: theme.textGreen
        },
        table: {
            '& .antd-tooltip': {
                display: "none"
            }
        }
    };
});

const ResultTable: React.FC<Props> = ({ tableData }) => {
    const history = useHistory()
    const classes = useStyles()
    const columns: any = [
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
            sorter: (a: any, b: any) => {
                return (moment(a.date).diff(moment(b.date)))
            },
            sortOrder: "descend",
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
                </Space>
            ),
        },
    ];
    return (
        <div className={classes.container}>
            {tableData.length > 0 &&
                <Table
                    showSorterTooltip={false}
                    rowKey={"id"}
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                />
            }
        </div>
    )
}

export default ResultTable;
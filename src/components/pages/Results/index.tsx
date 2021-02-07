import React from 'react';
import { Tabs } from 'antd';
import ResultTable from '../../molecules/ResultTable';
import LeagueTable from '../../molecules/LeagueTable';


const Result = () => {
    const { TabPane } = Tabs;

    const handleTabChange = () => {

    }
    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Results" key="1">
                    <ResultTable />
                </TabPane>
                <TabPane tab="League" key="2">
                    <LeagueTable />
                 </TabPane>
            </Tabs>
        </div>
    )
}

export { Result }
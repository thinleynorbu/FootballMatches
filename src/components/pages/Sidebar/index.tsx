import { FolderAddOutlined, CopyOutlined, FundOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { createUseStyles } from "react-jss";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const useStyles = createUseStyles((theme: any) => {
    return {
        sidebar: {
            background: theme.lightBg,
            height: "100vh"
        },
        menuBlock: {
            height: "100%"
        },
        logo: {
            margin: 24,
            marginBottom: 28
        },
        sidebarIcon: {
            minWidth: 14,
            marginRight: 10
        }
    };
});

const Sidebar = () => {
    const classes = useStyles();
    const location = useLocation();
    const keys = ["report", "league", "add-team"];

    return (
        <Layout.Sider className={classes.sidebar}>
            <Menu
                className={classes.menuBlock}
                mode="inline"
                defaultSelectedKeys={[
                    keys.find(val => {
                        if (location.pathname === "/") return "report";
                        return location.pathname.includes(val);
                    }) || ""
                ]}
                selectedKeys={[location.pathname.substring(1)]}
            >
                <Menu.Item icon={<CopyOutlined />} key="report">
                    <Link to={"/report"}>Report</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined />} key="league">
                    <Link to={"/league"}>League</Link>
                </Menu.Item>
                <Menu.Item icon={<FolderAddOutlined />} key="add-team">
                    <Link to={"/add-team"}>Add Team</Link>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
};
export { Sidebar };

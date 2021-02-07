import { LockOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useContext } from "react";
import { createUseStyles } from "react-jss";
import { useHistory, useLocation } from "react-router";
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
    const history = useHistory();
    const location = useLocation();
    const keys = ["report", "league"];

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
            >
                <Menu.Item icon={<TeamOutlined />} key="report">
                    <Link to={"/report"}>Report</Link>
                </Menu.Item>
                <Menu.Item icon={<LockOutlined />} key="league">
                    <Link to={"/league"}>League</Link>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
};
export { Sidebar };

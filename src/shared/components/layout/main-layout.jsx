import React, { useEffect } from 'react';
import { Button, Layout, theme } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentUser } from "../../services/userService";
import { Content, Header, Footer } from "antd/es/layout/layout";
import { AppstoreOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";


const MainLayout = () => {
    const { logout } = useAuth0();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.UserReducer);

    useEffect(() => {
        dispatch(loadCurrentUser())
    }, [dispatch]);
    const items = [
        {
            key: '1',
            label: `Home`,
        },
        {
            key: '2',
            label: `Dealer`,
        }
    ]
    const onNavigatePage = (path) => {
        navigate(path);
    }

    const onLogout = () => {
        localStorage.removeItem('token');
        logout();
    }

    return (
        <div className="w-screen min-h-screen">
            <Layout className="w-screen min-h-screen">
                <Header
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                        display: 'flex',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <div className="flex justify-center items-center">
                        <img src="/honda.svg" style={{ width: '100px', marginRight: '10px' }} alt="logo"/>
                    </div>

                    <Button type="dashed" onClick={onLogout} icon={<LogoutOutlined/>} danger>Logout</Button>
                </Header>
                <Content style={{
                    padding: 24,
                    flexGrow: 1,
                    height: '100%',
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}>
                    <Outlet/>
                </Content>
                <Footer
                    style={{
                        overflow: "hidden",
                        textAlign: 'center',
                        height: 65,
                        backgroundColor: '#1c1817',
                        bottom: 0,
                        padding: 5,
                        position: 'sticky'
                    }}
                >
                    <div className="flex justify-center gap-5 h-full w-full items-center">
                        <div
                            onClick={() => navigate('/')}
                            className="h-full hover:cursor-pointer flex flex-col justify-center items-center text-white px-3 border-2 border-gray-600 rounded-md">
                            <HomeOutlined/>
                            <span>Home</span>
                        </div>
                        <div
                            onClick={() => navigate('/dealerships')}
                            className="h-full hover:cursor-pointer flex flex-col justify-center items-center text-white px-3 border-2 border-gray-600 rounded-md">
                            <AppstoreOutlined/>
                            <span>Dealer</span>
                        </div>
                    </div>
                </Footer>
            </Layout>
        </div>
    );
};
export default withAuthenticationRequired(MainLayout, {
    onRedirecting: () => <Loading loadingText="Sedang memuat..."/>
});
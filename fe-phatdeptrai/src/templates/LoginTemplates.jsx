import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../pages/Login/Login';
const { Header, Footer, Sider, Content } = Layout;
function LoginTemplates(props) {
    return (
        <Layout>
            <Sider style={{height: window.innerHeight,  backgroundImage: `url("https://picsum.photos/1000")`}}></Sider>
            <Content>
               <Outlet/>
                </Content>
        </Layout>
    );
}

export default LoginTemplates;

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined, BoxPlotOutlined, GroupOutlined, WechatOutlined, DashboardOutlined, LogoutOutlined,User
} from '@ant-design/icons';
import { Avatar, Layout, Menu } from 'antd';
import React, { Children, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { userInfoAction } from '../redux/actions/UserActions';
import { TOKEN, user, userInfo } from '../utils/systemSetting';

const { Header, Sider, Content } = Layout;
function HomeTemplate(props) {
    const token = localStorage.getItem(TOKEN)

    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem(userInfo))
    const chooseAny = (e) => {  
        let {key} = e;
        switch (key) {
            case '2': {
                localStorage.removeItem(TOKEN)
                localStorage.removeItem(user)
                navigate('/login')
            }
            default:
                break;
        }
    }
    useEffect(() => {
        dispatch(userInfoAction())
    }, [])
    const items = [
        {
            label: user?.name, 
            key: 'item-1',
            icon: <UserOutlined style={{fontSize: 20}}/>,
            children: [  {
                label: `Logout`, 
                key: '2',
                icon: <LogoutOutlined style={{fontSize: 20}} />,
            
                
            }]
        },
     



    ];
    
    return (
        <Layout >
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: 'white' }} >
                <div className="logo" style={{ backgroundColor: 'white' }}><h6>Jmaster.io</h6></div>
                <Menu style={{ height: window.innerHeight }}
                    theme="light"
                    mode="inline"

                    items={[
                        {
                            key: '1',
                            icon: <DashboardOutlined  />,
                            label: 'DashBoard',


                        },
                        {
                            key: '2',
                            icon: <BoxPlotOutlined />,
                            label: 'Categories',
                            onClick: () => {
                                navigate('/admin/categories')
                            }
                        },
                        {
                            key: '3',
                            icon: <GroupOutlined />,
                            label: 'Post',
                            onClick: () => {
                                navigate('/admin/post')
                            }
                        },
                        {
                            key: '4',
                            icon: <UserOutlined />,
                            label: 'User',
                            onClick: () => {
                                navigate('/admin/users')
                            }
                        },
                        {
                            key: '5',
                            icon: <WechatOutlined />,
                            label: 'Comment',
                            onClick: () => {
                                navigate('/admin/comments')
                            }
                        },
                    ]}
                />
            </Sider>    
            <Layout className="site-layout">
                <Header

                    className="site-layout-background "
                    style={{
                        padding: 0,

                    }}
                ><Menu mode="horizontal" defaultSelectedKeys={['SubMenu']} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'right' }} items={items}
                    onClick={chooseAny}
                >

                    </Menu>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}

                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>

    );
}

export default HomeTemplate;
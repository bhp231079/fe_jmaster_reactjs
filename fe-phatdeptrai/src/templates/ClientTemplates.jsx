
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined, BoxPlotOutlined, GroupOutlined, WechatOutlined, DashboardOutlined, LogoutOutlined, User
} from '@ant-design/icons';
import { Avatar, Layout, Menu } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import React, { Children, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { getAllPostAction } from '../redux/actions/PostAction';
import { userInfoAction } from '../redux/actions/UserActions';
import { defaultState, TOKEN, userInfo } from '../utils/systemSetting';
import ReactHtmlParser from 'react-html-parser';
import ImageGallery from 'react-image-gallery';
const { Header, Sider, Content } = Layout;

function ClientTemplates(props) {

    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        }
    ];

    const token = localStorage.getItem(TOKEN)

    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem(userInfo))
    const { allpost } = useSelector(state => state.postReducer)
    console.log(allpost);
    const handleClick = () => {


        localStorage.removeItem(TOKEN)
        localStorage.removeItem(userInfo)
        navigate('/login')
    }


    useEffect(() => {
        if (token) {
            dispatch(userInfoAction())
        }
        dispatch(getAllPostAction(defaultState))
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">

                <header className='col-12'>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                        <Link to={'/'} className="navbar-brand"><img style={{ width: 100 }} src={require('../assets/download.png')} /></Link>
                        <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
                        <div className="collapse navbar-collapse" id="collapsibleNavId">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Post</a>
                                </li>
                            </ul>
                            {!user ? <Link to={'/login'} className="btn btn-outline-success my-2 my-sm-0" type="submit"><i className="fa fa-user" aria-hidden="true" /></Link> :
                                <div className="btn-group dropdown" style={{ paddingRight: 10 }}>
                                    <button type="button" className="btn btn-outline-success my-2 my-sm-0 dropdown"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{user.name}
                                    </button>
                                    <div className="dropdown-menu">



                                        <button onClick={handleClick} className="dropdown-item" >Logout</button>
                                    </div>
                                </div>
                            }

                        </div>
                    </nav>
                </header>
            </div>
            <div className="row">
                <div className='col-2'></div>
                <ImageGallery className='col-10' items={images} />;
            </div>
            <Outlet />
        </div>



    );
}

export default ClientTemplates;
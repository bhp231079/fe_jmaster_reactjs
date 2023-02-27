import { Space, Spin } from 'antd';

import React from 'react';
import { useSelector } from 'react-redux';
import styleLoading from './LoadingComponent.module.css';
function Loading(props) {
    let { isLoading } = useSelector(state => state.loadingReducer)
    console.log(isLoading);
    if (isLoading)
        return (

            <div className={styleLoading.bgLoading} >
                <Space size="middle" >
                    <Spin size="large" />
                </Space>
            </div>
        );
    else return ''
}

export default Loading;
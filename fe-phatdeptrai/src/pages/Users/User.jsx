import { Button, Drawer, message, Popconfirm, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostAction, getAllPostAction } from '../../redux/actions/PostAction';
import ReactHtmlParser from 'react-html-parser';
import { showDrawerAction } from '../../redux/reducers/drawerReducer';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AddPost from '../../components/Post/AddPost';
import { Editor } from '@toast-ui/react-editor';
import EditPost from '../../components/Post/EditPost';
import { editPostApiAction } from '../../redux/reducers/postReducer';
import { deleteUserAction, getAllUserAction } from '../../redux/actions/UserActions';
import AddUser from '../../components/User/AddUser';
import EditUser from '../../components/User/EditUser';
import { editUserApiAction } from '../../redux/reducers/userReducer';
function User(props) {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [state, setState] = useState({
        start: 0,
        length: 100,
        search: {
            value: ''
        }
    })
    const { users } = useSelector(state => state.userReducer)
    console.log(users);
    const dispatch = useDispatch();
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'age',
        });
    };



    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            width: '10%',
        },
        {
            title: 'phone',
            key: 'phone',
            dataIndex: 'phone',
            width: '10%',
        },
        {
            title: 'address',
            key: 'address',
            dataIndex: 'address',
            width: '10%',
        },
       
        {
            title: 'roles',
            key: 'roles',
            width: '20%',
            render: (text, record, index) => {
              return record.roles.map((item,index)=>{
                return <Tag key={index} color="green">{item}</Tag> 
              })
                
            }
        },
        {
            title: 'Action',
            key: 'Action',
            width: '33%',
            render: (text, record, index) => {

                return <>
                    <Button type="primary" icon={<EditOutlined />} size={'large'} className="mr-2" onClick={() => {
                        dispatch(showDrawerAction({
                            visible: true,
                            Component: <EditUser/>,
                            title: 'Edit user'

                        }))
                        dispatch(editUserApiAction(record))

                    }} />
                    <Popconfirm
                        placement="rightTop"
                        title={'Are you sure to delete this post?'}
                        onConfirm={() => {
                            dispatch(deleteUserAction(record.id))
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="danger" icon={<DeleteOutlined />} size={'large'} />
                    </Popconfirm>
                </>
            }
        },

    ];



    useEffect(() => {
        dispatch(getAllUserAction(state))

    }, [])
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-11'>
                    <Space
                        style={{
                            marginBottom: 16,
                        }}
                    >
                        <Button onClick={setAgeSort}>Sort age</Button>
                        <Button onClick={clearFilters}>Clear filters</Button>
                        <Button onClick={clearAll}>Clear filters and sorters</Button>
                    </Space>

                </div>
                <div className='col-1'>
                    <Space style={{
                        marginBottom: 16,
                    }}>
                        <Button type='primary' htmlType="button" onClick={() => {
                            dispatch(showDrawerAction({
                                visible: true,
                                Component: <AddUser />,
                                title: 'Thêm người dùng mới'

                            })
                            )
                        }} size={'large'} icon={<PlusOutlined />}></Button>
                    </Space>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-12'>
                    <Table columns={columns} rowKey={'id'} dataSource={users.data} onChange={handleChange} />
                </div>

            </div>
        </div>
    );
}

export default User;
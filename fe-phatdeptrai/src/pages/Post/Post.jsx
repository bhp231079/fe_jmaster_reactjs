import { Button, Drawer, message, Popconfirm, Space, Table } from 'antd';
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
function Post(props) {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [state, setState] = useState({
        start: 0,
        length: 100,
        search: {
            value: ''
        }
    })
    const { allpost } = useSelector(state => state.postReducer)
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
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            width: '10%',
        },
        {
            title: 'description',
            key: 'description',
            width: '10%',
            render: (text, record, index) => {

                return <div>{ReactHtmlParser(record.description)}  </div>
            }
        },
        {
            title: 'image',
            key: 'images',
            width: '10%',
            render: (text, record, index) => {
                console.log(record);
                return <>
                    <img style={{ width: 50 }} src={`http://54.150.115.104:8080/image/${record.images}`} />
                </>
            }
        },

        {
            title: 'categoryName',
            dataIndex: 'categoryName',
            key: 'categoryName',
            width: '10%',
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
                            Component: <EditPost />,
                            title: 'Edit bài viết'

                        }))
                        dispatch(editPostApiAction(record))

                    }} />
                      <Popconfirm 
                            placement="rightTop"
                            title={'Are you sure to delete this post?'}
                            onConfirm={() => {
                                dispatch(deletePostAction(record.id))
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
        dispatch(getAllPostAction(state))

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
                                Component: <AddPost/>,
                                title: 'Thêm bài viết mới'

                            })
                            )
                        }} size={'large'} icon={<PlusOutlined />}></Button>
                    </Space>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-12'>
                    <Table columns={columns} rowKey={'id'} dataSource={allpost.data} onChange={handleChange} />
                </div>

            </div>
        </div>
    );
}

export default Post;
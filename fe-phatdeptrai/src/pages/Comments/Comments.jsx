
import { Button, Drawer, message, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAction, deleteCommentAction, getAllCommentAction } from '../../redux/actions/CommentAction';
function Comments(props) {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [state, setState] = useState({
        start: 0,
        length: 100,
        search: {
            value: ''
        }
    })
    const { comments } = useSelector(state => state.commentReducer)
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
            title: 'content',
            dataIndex: 'content',
            key: 'content',
            width: '10%',
        },
        {
            title: 'userId',
            key: 'userId',
            dataIndex: 'userId',
            width: '10%',

        },
        {
            title: 'postId',
            key: 'postId',
            width: '10%',
            dataIndex: 'postId',
        },


        {
            title: 'Action',
            key: 'Action',
            width: '33%',
            render: (text, record, index) => {

                return <>

                    <Popconfirm
                        placement="rightTop"
                        title={'Are you sure to delete this post?'}
                        onConfirm={() => {
                            dispatch(deleteCommentAction(record.id))
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
        dispatch(getAllCommentAction(state))

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
            </div>

            <div className='row'>
                <div className='col-md-12'>
                    <Table columns={columns} rowKey={'id'} dataSource={comments.data} onChange={handleChange} />
                </div>

            </div>
        </div>
    );
}

export default Comments;
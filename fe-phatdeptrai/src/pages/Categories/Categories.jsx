import { Button, Drawer, message, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryAction, getAllCategoryAction } from '../../redux/actions/CategoryActions';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AddCategory from '../../components/Category/AddCategory';
import { showDrawerAction } from '../../redux/reducers/drawerReducer';
import UpdateCategory from '../../components/Category/UpdateCategory';
import { editCategoryApiAction } from '../../redux/reducers/categoryReducer';
function Categories(props) {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [state, setState] = useState({
        start: 0,
        length: 100,
        search: {
            value: ''
        }
    })
    const confirm = () => {
        message.info('Clicked on Yes.');
      };
    const { categories } = useSelector(state => state.categoryReducer)
    console.log(categories);
    const dispatch = useDispatch()
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
            width: '33%',

        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            width: '33%',
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
                            Component: <UpdateCategory />,
                            title: 'Edit danh mục'

                        }))
                        dispatch(editCategoryApiAction(record))

                    }} />
                      <Popconfirm 
                            placement="rightTop"
                            title={'Are you sure to delete this task?'}
                            onConfirm={() => {
                                dispatch(deleteCategoryAction(record.id))
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
        dispatch(getAllCategoryAction(state))

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
                                Component: <AddCategory />,
                                title: 'Thêm danh mục mới'

                            })
                            )
                        }} size={'large'} icon={<PlusOutlined />}></Button>
                    </Space>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-12'>




                    <Table rowKey={'id'} columns={columns} dataSource={categories.data} onChange={handleChange} />
                </div>

            </div>
        </div>
    );
}

export default Categories;
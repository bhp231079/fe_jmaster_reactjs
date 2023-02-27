import { Form, Input, Select, Typography, message, Button, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoryAction } from '../../redux/actions/CategoryActions';
import { defaultState } from '../../utils/systemSetting';
import FormData from 'form-data';
import { addPostAction } from '../../redux/actions/PostAction'; 
const { Title } = Typography;
const { Option } = Select;
function AddPost(props) {

    const  newpost  = new FormData();
    const dispatch = useDispatch();

    const { data } = useSelector(state => state.categoryReducer.categories)
    useEffect(() => {
        dispatch(getAllCategoryAction(defaultState))
        setState({...state,categoryId: data?.[0]?.id})
 
    }, [data?.[0]?.id])


    const [state, setState] = useState({
        title: '',
        categoryId: '',
        imageFile: null,
        description: ''
    });
    const handleChange = (e) => {
        let { name, value } = e.target
        console.log(name, value);

        setState({ ...state, [name]: value })
        console.log(state);
    }
    const changeEditor = (content) => {
        setState({ ...state, description: content })
        console.log(state);
    }
    const changeSelect = (index, record) => {

        console.log(record.value);
        setState({ ...state, categoryId: record.value })
    }

    const changeFile = (file) => {
        console.log(file);
        setState({ ...state, imageFile: file.file })

    }

    const handleSubmit = () => {
        newpost.append('title', state.title);
        newpost.append('description', state.description);
        newpost.append('imageFile',state.imageFile);
        newpost.append('categoryId', state.categoryId );
        console.log(newpost);
        dispatch(addPostAction(newpost))
    } 
    return (
        <Form
            onFinish={handleSubmit}
            name="basic"

            initialValues={{
                remember: true,
            }}
            autoComplete="off"
        >
            <Form.Item onChange={handleChange}
                label="Title"
                name="tiltle"
                rules={[
                    {
                        required: true,
                        message: 'Please input title!',
                    },
                ]}
            >
                <Input name="title" />
            </Form.Item>

            <Form.Item >
                <Editor onEditorChange={changeEditor}
                    name="description"
                    initialValue='Insert description here!'
                    init={{
                        selector: 'textarea',
                        plugins: 'a11ychecker advcode casechange export formatpainter image editimage linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tableofcontents tinycomments tinymcespellchecker',
                        toolbar: 'a11ycheck addcomment showcomments casechange checklist code export formatpainter image editimage pageembed permanentpen table tableofcontents',
                        toolbar_mode: 'floating',
                        tinycomments_mode: 'embedded',
                        tinycomments_author: 'Author name',
                    }}
                />
            </Form.Item>
            <Form.Item label="Category">
                <Select name="categoryId"
                    defaultValue={{
                        value: data?.[0]?.id,
                        label: data?.[0]?.name,
                    }}

                    key={data?.[0]?.id}
                    style={{
                        width: 120,
                    }}
                    onSelect={changeSelect}
                >
                    {data?.map((item, index) => {
                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                    })}
                </Select>
            </Form.Item>
            <Form.Item label="Image" >
                <Upload name='ImageFile' listType='picture'
                    action={'http://localhost:3000/'}
                    accept='.png,.jpg,.doc'
                    beforeUpload={(file) => {
                        console.log({ file });
                        return false;
                    }}
                    onChange={changeFile}

                >


                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 10,
                    span: 100,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Thêm bài viết mới
                </Button>
            </Form.Item>
        </Form>

    );
}

export default AddPost;
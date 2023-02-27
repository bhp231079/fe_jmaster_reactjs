import { Form, Input, Select, Typography, message, Button, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { UploadOutlined } from '@ant-design/icons';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getAllCategoryAction } from '../../redux/actions/CategoryActions';
import { defaultState } from '../../utils/systemSetting';
import FormData from 'form-data';
import { addPostAction, editPostAction } from '../../redux/actions/PostAction';
import { withFormik } from 'formik';
import { editPostApiAction } from '../../redux/reducers/postReducer';
const { Title } = Typography;
const { Option } = Select;
function EditPost(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
    } = props;


    const dispatch = useDispatch();
    const DefaultImg = [{

    }]
    const { data } = useSelector(state => state.categoryReducer.categories)
    useEffect(() => {
        dispatch(getAllCategoryAction(defaultState))

    }, [])


    const [state, setState] = useState(
        {
            uid: '1',
            name: values?.file,
            status: 'done',
        }
    );
    const changeEditor = (content) => {
        setFieldValue('description', content)
    }

    const changeSelect = (value) => {
        console.log(value);
        setFieldValue('categoryId', value)

    }

    const changeFile = (file) => {
        setState({...state,name:file.file.name })
        setFieldValue('imageFile', file.file)
    }

    return (
        <Form
            onFinish={handleSubmit}
            name="basic"
            // fields={[
            //     {
            //         name: ["id"],
            //         value: values.id,
            //     },
            //     {
            //         name: ["title"],
            //         value: values.title,
            //     },
            //     {
            //         name: ["categoryId"],
            //         value: values.categoryId,
            //     },
            // ]}
            initialValues={{
                id: values.id,
                title: values.title,
                categoryId: values.categoryId
            }
        }
            
            autoComplete="off"
        >
            <Form.Item
                label="Id post"
                name="id"
            >
                <Input name='id'  onChange={handleChange} disabled />
            </Form.Item>

            <Form.Item
                label="Title"
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Please input title!',
                    },
                ]}
            >
                <Input name="title" onChange={handleChange} />
            </Form.Item>

            <Form.Item >
                <Editor onEditorChange={changeEditor}
                    name="description"
                    initialValue={values.description}
                    init={{
                        selector: 'textarea',
                        plugins: 'advlist autolink lists link image charmap preview anchor pagebreak', 
                        toolbar_mode: 'floating',
                       
                    }}
                />
            </Form.Item>
            <Form.Item label="Category"  name="categoryId">

                <Select name="categoryId"
                    defaultValue={{    
                        label: values.categoryName,
                    }}

                    key={values.categoryId}
                    style={{
                        width: 120,
                    }}
                    onChange={changeSelect}
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
                    maxCount={1}
                    defaultFileList={[state]}
                    key={values.imageFile}
                    onRemove={changeFile}

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

const EditPostWithFormik = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        const { post } = props;
        console.log(post.categoryId);
        return {
            id: post?.id,
            title: post?.title,
            description: post?.description,
            categoryId: post?.categoryId,
            categoryName: post?.categoryName,
            imageFile: null,
            file: post?.images?.[0]
        }
    },

    // validationSchema: yup.object().shape({
    //     username: yup.string().min(6,'Username more 6 character')

    // }),


    // Custom sync validation

    handleSubmit: (values, { props, setSubmitting }) => {
        console.log(values);
        let newpost = new FormData();
        newpost.append('id', values.id);
        newpost.append('title', values.title);
        newpost.append('description', values.description);
        newpost.append('imageFile', values.imageFile);
        newpost.append('categoryId', values.categoryId);
        props.dispatch(editPostAction(newpost))

    },

    displayName: 'BasicForm',
})(EditPost);

const mapPropstoState = (state) => {
    return {
        post: state.postReducer.post
    }
}
export default connect(mapPropstoState)(EditPostWithFormik);

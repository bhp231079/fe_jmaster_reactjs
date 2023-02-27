import { Button, Checkbox, Form, Input } from 'antd';
import { withFormik } from 'formik';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { addCategoryAction } from '../../redux/actions/CategoryActions';

function AddCategory(props) {
    
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={handleSubmit}

            autoComplete="off"
        >
            <Form.Item
                label="Tên danh mục"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập danh mục!',
                    },
                ]}
            >
                <Input name='name' onChange={handleChange} />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Thêm danh mục
                </Button>
            </Form.Item>
        </Form>
    );

}


const AddCategoryWithFormik = withFormik({
    mapPropsToValues: () => {
        
        return{
        name: '',

    }},

    // validationSchema: yup.object().shape({
    //     username: yup.string().min(6,'Username more 6 character')

    // }),
  

    // Custom sync validation

    handleSubmit: (values,  { props,setSubmitting }) => {
       let item= {
            name: values.name
       }
       props.dispatch(addCategoryAction(item))
       
    },

    displayName: 'BasicForm',
})(AddCategory);
export default connect()(AddCategoryWithFormik);
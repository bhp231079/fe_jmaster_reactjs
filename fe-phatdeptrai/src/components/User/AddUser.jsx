import { Button, Checkbox, Form, Input } from 'antd';
import { withFormik } from 'formik';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { addUserAction } from '../../redux/actions/UserActions';

function AddUser(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;
    const options = [
        {
          label: 'ADMIN',
          value: 'ROLE_ADMIN',
        },
        {
          label: 'MEMBER',
          value: 'ROLE_MEMBER',
        },
        ]
  
    const onChange = (checkedValues) => {
    
        setFieldValue('roles', checkedValues)
    }

      
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
                label="Số điện thoại "
                name="phone"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại!',
                    },
                ]}
            >
                <Input name='phone' onChange={handleChange} />
            </Form.Item>

            <Form.Item
                label="Mật khẩu "
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu',
                    },
                ]}
            >
                <Input.Password name='password' onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Tên người dùng "
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên người dùng!',
                    },
                ]}
            >
                <Input name='name' onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Địa chỉ "
                name="address"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập địa chỉ!',
                    },
                ]}
            >
                <Input name='address' onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Role"
                name="role"

            >
                 <Checkbox.Group options={options}  onChange={onChange} />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Thêm user
                </Button>
            </Form.Item>
        </Form>
    );

}


const AddUserwithFormilk = withFormik({
    mapPropsToValues: () => {
        
        return{
        phone: '',
        password:'',
        name: '',
        address:'',
        roles:[],


    }},

    // validationSchema: yup.object().shape({
    //     username: yup.string().min(6,'Username more 6 character')

    // }),
  

    // Custom sync validation

    handleSubmit: (values,  { props,setSubmitting }) => {
     console.log(values);
       props.dispatch(addUserAction(values))
       
    },

    displayName: 'BasicForm',
})(AddUser);
export default connect()(AddUserwithFormilk);
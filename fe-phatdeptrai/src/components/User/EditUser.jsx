import { Button, Checkbox, Form, Input } from 'antd';
import { withFormik } from 'formik';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { addUserAction, editUserAction } from '../../redux/actions/UserActions';

function EditUser(props) {
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
        console.log(checkedValues);
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
            fields={[
                {
                    name: ["id"],
                    value: values.id,
                },
                {
                    name: ["phone"],
                    value: values.phone,
                },
                {
                    name: ["name"],
                    value: values.name,
                },
                {
                    name: ["address"],
                    value: values.address,
                },
                {
                    name: ["roles"],
                    value: values.roles,
                },
            ]}
            onFinish={handleSubmit}

            autoComplete="off"
        >
            <Form.Item
                label="Id user"
                name="id"
            >
                <Input name='id' onChange={handleChange} disabled />
            </Form.Item>

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
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                        Edit User
                </Button>
            </Form.Item>
        </Form>
    );

}


const EditUserwithFormilk = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
      
       let {user} = props
       console.log(user);
        return {
            id: user?.id,
            phone: user?.phone,
            name: user?.name,
            address:user?.address,
         

        }
    },

    // validationSchema: yup.object().shape({
    //     username: yup.string().min(6,'Username more 6 character')

    // }),


    // Custom sync validation

    handleSubmit: (values, { props, setSubmitting }) => {
        console.log(values);
        props.dispatch(editUserAction(values))

    },

    displayName: 'BasicForm',
})(EditUser);
const mapPropstoState = (state) => {
    return {
        user: state.userReducer.user
    }
}
export default connect(mapPropstoState)(EditUserwithFormilk);
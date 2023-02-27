
import { connect } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { TOKEN } from '../../utils/systemSetting';
import { Button, Form, Input, message, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined, InfoCircleOutlined,PhoneOutlined,EnvironmentOutlined} from '@ant-design/icons';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { RegisterAction } from '../../redux/actions/UserActions';
function Register(props) {
    const navigate = useNavigate();
    const token = localStorage.getItem(TOKEN);

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        if (token) {
            navigate('/')
        }
    })
    return (
        <Form wrapperCol={{ span: 100 }} onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}>
            <div className='container' style={{ height: window.innerHeight }}>
                <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ height: window.innerHeight }}
                >
                    <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>
                        Register jmaster
                    </h3>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Name!',

                            },
                            {
                                min: 6,
                                message: 'Username more 6 character',
                            }
                        ]}

                    >
                        <Input className='ms-15' size="large" placeholder="name..." prefix={<UserOutlined />} suffix={
                            <Tooltip title="Extra information">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        } value={values.name} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',

                            },
                           
                        ]}

                    >
                        <Input className='ms-15' size="large"  placeholder="phone..." prefix={<PhoneOutlined />} suffix={
                            <Tooltip title="Extra information">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        } value={values.phnone} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',

                            },
                           
                        ]}

                    >
                        <Input className='ms-15' size="large"  placeholder="address..." prefix={<EnvironmentOutlined />} suffix={
                            <Tooltip title="Extra information">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        } value={values.address} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },

                        ]}
                    >
                        <Input.Password value={values.password} onChange={handleChange}
                            placeholder="password..." size="large"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            prefix={<LockOutlined />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <NavLink to={'/login'}>Đã có tài khoản? Login</NavLink>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </div>


            </div>
        </Form>
    );
}


const RegisterWithFormik = withFormik({
    mapPropsToValues: () => {

        return {
            name: '',
            password: '',
            phone:'',
            address:'',

        }
    },

    // validationSchema: yup.object().shape({
    //     username: yup.string().min(6,'Username more 6 character')

    // }),


    // Custom sync validation

    handleSubmit: (values, { props, setSubmitting }) => {
        console.log(values);
        console.log(props);
        props.dispatch(RegisterAction(values))

    },

    displayName: 'BasicForm',
})(Register);
export default connect()(RegisterWithFormik);
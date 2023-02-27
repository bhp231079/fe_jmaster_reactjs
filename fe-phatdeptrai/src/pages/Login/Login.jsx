import { Button, Form, Input, message, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as yup from 'yup';
import LoginService from '../../services/LoginService';
import { LoginAction } from '../../redux/actions/UserActions';
import { TOKEN } from '../../utils/systemSetting';
import { NavLink, useNavigate } from 'react-router-dom';
function Login(props) {
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
    useEffect(()=> {
        if(token) {
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
                        Login jmaster
                    </h3>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                                
                            },
                            {
                                min: 6,
                                message: 'Username more 6 character',
                            }
                        ]}
                      
                    > 
                        <Input className='ms-15'size="large" placeholder="username..." prefix={<UserOutlined />} suffix={ 
                            <Tooltip title="Extra information">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip> 
                        }   value={values.username} onChange={handleChange} />
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
                        <Input.Password   value={values.password}  onChange={handleChange}
                            placeholder="password..." size="large"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            prefix={<LockOutlined />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <NavLink to={'/register'}>Chưa có tài khoản? Register</NavLink>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </div>


            </div>
        </Form>
    );
}


const LoginWithFormik = withFormik({
    mapPropsToValues: () => {
        
        return{
        username: '',
        password: '',
    }},

    // validationSchema: yup.object().shape({
    //     username: yup.string().min(6,'Username more 6 character')

    // }),
  

    // Custom sync validation

    handleSubmit: (values,  { props,setSubmitting }) => {
       console.log(values);
       console.log(props);
       props.dispatch(LoginAction(values))
       
    },

    displayName: 'BasicForm',
})(Login);
export default connect()(LoginWithFormik);
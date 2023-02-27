import { Button, Checkbox, Form, Input } from 'antd';
import { withFormik } from 'formik';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { editCategoryAction } from '../../redux/actions/CategoryActions';

function UpdateCategory(props) {
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
            fields={[
                {
                    name: ["id"],
                    value: values.id,
                },
                {
                    name: ["name"],
                    value: values.name,
                },
            ]}
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
                label="Id danh mục"
                name="id"
            >
                <Input name='id' onChange={handleChange} disabled />
            </Form.Item>
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
                    Edit Danh Mục
                </Button>
            </Form.Item>
        </Form>
    );

}


const UpdateCategoryWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { category } = props;
        return {
            id: category?.id,
            name: category?.name,

        }
    },

    // validationSchema: yup.object().shape({
    //     username: yup.string().min(6,'Username more 6 character')

    // }),


    // Custom sync validation

    handleSubmit: (values, { props, setSubmitting }) => {
        console.log(values);
        let item = {
            id: values.id,
            name: values.name

        }
           props.dispatch(editCategoryAction(values))

    },

    displayName: 'BasicForm',
})(UpdateCategory);

const mapPropstoState = (state) => {
    return {
        category: state.categoryReducer.category
    }
}
export default connect(mapPropstoState)(UpdateCategoryWithFormik);
import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { loadCurrentUser, updateUserData } from '../shared/services/userService';
import { useNavigate } from 'react-router-dom';

export const ProfilPage = () => {
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.UserReducer);
    const dispatch = useDispatch();
    const [formProfil] = Form.useForm();

    useEffect(() => {
        dispatch(loadCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        if (userInfo.currentUser) {
            formProfil.setFieldsValue({
                name: get(userInfo.currentUser, 'name', ''),
                email: get(userInfo.currentUser, 'email', '')
            });
        }
    }, [formProfil, userInfo]);


    const submitFormProfil = (value) => {
        if (userInfo.currentUser) {
            dispatch(updateUserData(value, userInfo.currentUser));
            navigate('/')
        } else {
            console.log('User data is not available.');
        }
    }

    return (
        <>
            <Form
                name="basic"
                layout="vertical"
                form={formProfil}
                autoComplete="off"
                onFinish={submitFormProfil}
            >
                <Form.Item
                    label="Nama"
                    name="name"
                    rules={[{
                        required: true, message: 'Tidak boleh kosong!',
                    }]}
                >
                    <Input size="large" type="text" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{
                        required: true, message: 'Tidak boleh kosong!',
                    }]}
                >
                    <Input size="large" disabled />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

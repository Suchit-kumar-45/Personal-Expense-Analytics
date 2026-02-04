import React,{useState} from 'react'
import { Form, Input, Button,message } from "antd";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import Spinner from '../components/Spinner';


const Register = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    //form submit
    const submitHandler = async(values) => {
        try {
            setLoading(true);
            await axios.post('/api/v1/users/register',values);
            message.success('Registration Successful');
            setLoading(false);
            navigate('/login');
        } catch (error) {
            setLoading(false);
            message.error('Something went wrong');
        }
  };

  return (
    <div className="register-page">
        {loading && <Spinner />}
      <Form layout="vertical" onFinish={submitHandler}>
        <h1>Register Form</h1>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/login">Already Registered? Click here to login</Link>
          <Button type="primary" htmlType="submit" className="btn btn-primary">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Register;

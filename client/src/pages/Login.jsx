import React,{useState,useEffect} from 'react'
import { Form, Input, Button,message } from "antd";
import { Link,useNavigate } from "react-router-dom";
import Spinner from '../components/Spinner';
import BrandHeader from '../components/BrandHeader';
import axios from 'axios';
import "../styles/LoginPage.css";
const Login = () => {
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    //form submit
    const submitHandler = async(values) => {
        try {
            setLoading(true);
            const { data } = await axios.post(
            "/api/v1/users/login",
            values
            );
            setLoading(false);
            message.success('Login Successful');
            localStorage.setItem('token', data.token); localStorage.setItem('user',
              JSON.stringify({...data.user,password:''}));
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            navigate('/dashboard');
        } catch (error) {
            setLoading(false);
            message.error('Something went wrong');
        }
    };
      //prevent from login user
    useEffect(() => {
        if(localStorage.getItem('token')) {
          navigate('/dashboard');
        }
        },[navigate]);
  return (
    <div className="auth-page">
      <div className="page-shell">
        <BrandHeader />
        <div className="auth-card">
          {loading && <Spinner />}
          <Form layout="vertical" onFinish={submitHandler}>
            <h1>Login to Your Account</h1>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input type="email" placeholder="name@example.com" />
          </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please enter your password" }]}
                >
                  <Input.Password placeholder="••••••••" />
                </Form.Item>
        
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Link to="/register">New User? Click here to register</Link>
                  <Button type="primary" htmlType="submit" className="auth-submit-button">
                    Login
                  </Button>
                </div>
              </Form>
            </div>
          </div>
    </div>
  )
}

export default Login
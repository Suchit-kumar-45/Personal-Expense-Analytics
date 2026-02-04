import React,{useState} from 'react'
import { Form, Input, Button,message } from "antd";
import { Link,useNavigate } from "react-router-dom";
import Spinner from '../components/Spinner';
const Login = () => {
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    //form submit
    const submitHandler = async(values) => {
        try {
            setLoading(true);
            const {data}=await axios.post('/api/v1/users/login',values);
            setLoading(false);
            message.success('Login Successful');
            localStorage.setItem('user',JSON.stringify({...data,password:''}));
            navigate('/');
        } catch (error) {
            setLoading(false);
            message.error('Something went wrong');
        }
    };
  return (
    <>
        <div className="login-page">
            {loading && <Spinner />}
              <Form layout="vertical" onFinish={submitHandler}>
                <h1>Login Form</h1>
        
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
                  <Link to="/register">New User ? click here to register</Link>
                  <Button type="primary" htmlType="submit" className="btn btn-primary">
                    Login
                  </Button>
                  </div>
              </Form>
            </div>
    </>
  )
}

export default Login
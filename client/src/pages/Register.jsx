import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Spinner from '../components/Spinner';import BrandHeader from '../components/BrandHeader';import "../styles/RegisterPage.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/users/register", values);
      message.success('Registration Successful');
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      const serverMessage = error?.response?.data?.error || 'Something went wrong';
      message.error(serverMessage);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="register-container">
      <div className="page-shell">
        <BrandHeader />

        {/* CARD */}
        <div className="register-card">
          {loading && <Spinner />}

          <div className="card-head">
            <div className="icon-circle">⚡</div>

            <h1>Create Account</h1>
            <p className="subtitle">Sign up and bring clarity to your expenses.</p>
          </div>

        <Form layout="vertical" onFinish={submitHandler}>

          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input placeholder="name@example.com" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Button htmlType="submit" className="signup-btn">
            Create Account
          </Button>

        </Form>

        <p className="bottom-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default Register;
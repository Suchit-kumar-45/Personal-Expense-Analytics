import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { Modal, Form, Input, Select, Button, message, Table } from 'antd';
import axios from 'axios';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const columns = [
    { title: 'Date', dataIndex: 'date' },
    { title: 'Amount', dataIndex: 'amount' },
    { title: 'Type', dataIndex: 'type' },
    { title: 'Category', dataIndex: 'category' },
    { title: 'Reference', dataIndex: 'reference' },
  ];

  // GET ALL TRANSACTIONS
  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return;

      setLoading(true);

      const res = await axios.post(
        '/api/v1/transactions/get-all-transactions',
        { userid: user._id }
      );

      setTransactions(res.data);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      message.error("Fetch issue with transactions");
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  // ADD TRANSACTION
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return;

      setLoading(true);

      await axios.post(
        '/api/v1/transactions/add-transaction',
        { ...values, userid: user._id }
      );

      setLoading(false);
      message.success('Transaction Added Successfully');
      setShowModal(false);

      getTransactions(); // ✅ refresh table

    } catch (error) {
      setLoading(false);
      message.error('Something went wrong');
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}

      <div className="filters">
        <div>range filters</div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>

      <div className="content">
        <Table columns={columns} dataSource={transactions} rowKey="_id" />
      </div>

      <Modal
        title="Add Transaction"
        open={showModal}
        footer={false}
        onCancel={() => setShowModal(false)}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="Medical">medical</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="entertainment">Entertainment</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Reference" name="reference">
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              SAVE
            </Button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
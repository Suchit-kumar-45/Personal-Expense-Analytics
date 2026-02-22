import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { Modal, Form, Input, Select, Button, message, Table, DatePicker } from 'antd';
import axios from 'axios';
import Spinner from '../components/Spinner';
import moment from 'moment';
import { UnorderedListOutlined, AreaChartOutlined } from '@ant-design/icons';
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [frequency, setfrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all');
  const [viewType, setViewType] = useState('table');

  const columns = [
    { title: 'Date', dataIndex: 'date', render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span> },
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
        {
          userid: user._id,
          frequency,
          selectedDate,
          type
        }
      );

      setTransactions(res.data.transactions);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      message.error("Fetch issue with transactions");
    }
  };

  useEffect(() => {

    getTransactions();
  }, [frequency, selectedDate, type]);

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

      getTransactions();

    } catch (error) {
      setLoading(false);
      message.error('Something went wrong');
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}

      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setfrequency(values)}>
            <Select.Option value='7'>LAST 1 WEEK</Select.Option>
            <Select.Option value='30'>LAST 1 MONTH</Select.Option>
            <Select.Option value='365'>LAST 1 YEAR</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value='all'>ALL</Select.Option>
            <Select.Option value='income'>INCOME</Select.Option>
            <Select.Option value='expense'>EXPENSE</Select.Option>
          </Select>
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${viewType === 'table' ? 'active-icon' : 'inactive-icon'}`}
            onClick={() => setViewType('table')}
          />

          <AreaChartOutlined
            className={`mx-2 ${viewType === 'analytics' ? 'active-icon' : 'inactive-icon'}`}
            onClick={() => setViewType('analytics')}
          />
        </div>
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
        {viewType === 'table' ? (
           <Table columns={columns} dataSource={transactions} rowKey="_id" />
        ) : <Analytics transactions={transactions} />
        }
       
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
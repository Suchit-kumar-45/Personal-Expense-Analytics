import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Input, Button, Progress, Row, Col, message } from "antd";

export default function Budget({ userId, refreshTrigger }) {
  const [data, setData] = useState(null);
  const [amount, setAmount] = useState("");

  const fetchBudget = async () => {
    try {
      const res = await axios.get(`/api/budget`);
      console.log("Budget data:", res.data);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching budget:", err);
      message.error("Error fetching budget: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    fetchBudget();
  }, [userId, refreshTrigger]);

  const setBudget = async () => {
    try {
      if (!amount || isNaN(amount)) {
        message.error("Please enter a valid budget amount");
        return;
      }
      await axios.post(`/api/budget`, { amount: parseFloat(amount) });
      message.success("Budget updated");
      setAmount("");
      fetchBudget();
    } catch (err) {
      message.error("Error setting budget");
    }
  };

  const percent = data && data.budget
    ? Math.min((data.spent / data.budget) * 100, 100)
    : 0;

  const getColor = () => {
    if (!data) return "#52c41a";
    if (data.status === "exceeded") return "#ff4d4f";
    if (data.status === "warning") return "#faad14";
    return "#52c41a";
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Card
        title="💰 Monthly Budget"
        style={{
          marginBottom: "20px",
          borderRadius: "10px",
        }}
      >
        {/* INPUT ROW */}
        <Row gutter={12} align="middle" style={{ marginBottom: "20px" }}>
          <Col span={18}>
            <Input
              size="large"
              placeholder="Enter monthly budget"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Col>

          <Col span={6}>
            <Button
              type="primary"
              size="large"
              block
              onClick={setBudget}
            >
              Set Budget
            </Button>
          </Col>
        </Row>

        {/* INFO CARDS */}
        {data && (
          <>
            <Row gutter={16}>
              <Col span={8}>
                <Card size="small">
                  <p>Budget</p>
                  <h3>₹{data.budget}</h3>
                </Card>
              </Col>

              <Col span={8}>
                <Card size="small">
                  <p>Spent</p>
                  <h3>₹{data.spent}</h3>
                </Card>
              </Col>

              <Col span={8}>
                <Card size="small">
                  <p>Status</p>
                  <h3 style={{ color: getColor() }}>{data.status}</h3>
                </Card>
              </Col>
            </Row>

            {/* PROGRESS BAR */}
            <div style={{ marginTop: "20px" }}>
              <Progress
                percent={parseFloat(percent.toFixed(1))}
                strokeColor={getColor()}
              />
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
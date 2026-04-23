import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import '../styles/LandingPage.css';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="landing-page">
      <div className="landing-topbar">
        <div className="auth-title" onClick={() => navigate('/')}>
          <DollarCircleOutlined className="auth-logo" />
          Personal Expense Analytics
        </div>
        <div className="landing-actions">
          <Button type="ghost" size="large" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button type="default" size="large" onClick={() => navigate('/register')}>
            Register
          </Button>
        </div>
      </div>

      <div className="landing-wrapper">
        {/* HERO SECTION */}
        <div className="landing-card shadow-lg">
          <div className="landing-copy">
            <div className="landing-title">
              <span className="landing-logo">
                <DollarCircleOutlined />
              </span>
              <h1>Personal Expense Analytics</h1>
              <p>
                Take control of your finances with smart tracking, real-time insights,
                and powerful analytics. Monitor your spending habits and make better
                financial decisions effortlessly.
              </p>
            </div>
          </div>

          <div className="dashboard-image-grid">
            <img className="dashboard-image" src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=900&q=80" alt="Expense dashboard" />
            <img className="dashboard-image" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80" alt="Track and manage income" />
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="features-section">
        <h2>✨ What You Can Do</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📌 Track Expenses</h3>
            <p>Add, edit, and delete your daily transactions easily.</p>
          </div>
          <div className="feature-card">
            <h3>📅 Monthly Insights</h3>
            <p>Analyze your monthly spending patterns with charts.</p>
          </div>
          <div className="feature-card">
            <h3>💡 Budget Planning</h3>
            <p>Set budgets and avoid overspending.</p>
          </div>
          <div className="feature-card">
            <h3>📈 Analytics</h3>
            <p>Get detailed insights into where your money goes.</p>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="how-section">
        <h2>🚀 How It Works</h2>
        <div className="how-steps">
          <div className="step">
            <h3>1️⃣ Register</h3>
            <p>Create your free account in seconds.</p>
          </div>
          <div className="step">
            <h3>2️⃣ Add Transactions</h3>
            <p>Record your income and expenses daily.</p>
          </div>
          <div className="step">
            <h3>3️⃣ Analyze</h3>
            <p>View reports and improve your financial habits.</p>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="cta-section">
        <h2>Start Managing Your Money Today 💸</h2>
        <p>No complexity. Just simple and smart expense tracking.</p>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <p>© 2026 Personal Expense Analytics | Built for smarter financial decisions</p>
      </div>
    </div>
  );
};

export default Landing;
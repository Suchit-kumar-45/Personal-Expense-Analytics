import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarCircleOutlined } from '@ant-design/icons';
import '../styles/BrandHeader.css';

const BrandHeader = ({ rightContent }) => {
  const navigate = useNavigate();

  return (
    <div className="site-header">
      <div className="site-brand" onClick={() => navigate('/')}
           role="button"
           tabIndex={0}
           onKeyPress={(e) => e.key === 'Enter' && navigate('/')}
      >
        <span className="site-logo">
          <DollarCircleOutlined />
        </span>
        <span className="site-title">Personal Expense Analytics</span>
      </div>
      {rightContent && <div className="site-actions">{rightContent}</div>}
    </div>
  );
};

export default BrandHeader;

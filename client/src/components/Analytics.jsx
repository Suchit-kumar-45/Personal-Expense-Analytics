import React from 'react'
import { Card, Progress } from 'antd';
const Analytics = ({transactions}) => {
  //categories
  const categories=[
    'salary',
    'food',
    'bills',
    'medical',
    'education',
    'entertainment',
    'other',

  ]

  //total transactions
      const totalTransactions = transactions.length;
      const totalIncomeTransactions = transactions.filter(t => t.type === 'income').length;
      const totalExpenseTransactions = transactions.filter(t => t.type === 'expense').length;
      const totalIncomePercent=(totalIncomeTransactions/totalTransactions)*100;
      const totalExpensePercent=(totalExpenseTransactions/totalTransactions)*100;

    //total turnover
      const totalTurnover = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
      const totalIncomeTurnover = transactions.filter(t => t.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0);
      const totalExpenseTurnover = transactions.filter(t => t.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0);
      const totalIncomeTurnoverPercent=(totalIncomeTurnover/totalTurnover)*100;
      const totalExpenseTurnoverPercent=(totalExpenseTurnover/totalTurnover)*100;
  return (

    <>
        <div className="row m-3">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                Total Transactions: {totalTransactions}
              </div>
              <div className="card-body">
                <h5 className="text-success"> Income:{totalIncomeTransactions}</h5>
                <h5 className="text-danger"> Expense:{totalExpenseTransactions}</h5>
                <div>
                  <Progress type="circle" strokeColor={'green'} className='mx-2' percent={totalIncomePercent.toFixed(0)} />
                  <Progress type="circle" strokeColor={'red'} className='mx-2' percent={totalExpensePercent.toFixed(0)} />
                </div>
              </div>
            </div>
          </div> 

          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                Total TurnOver: {totalTurnover}
              </div>
              <div className="card-body">
                <h5 className="text-success"> Income:{totalIncomeTurnover}</h5>
                <h5 className="text-danger"> Expense:{totalExpenseTurnover}</h5>
                <div>
                  <Progress type="circle" strokeColor={'green'} className='mx-2' percent={totalIncomeTurnoverPercent.toFixed(0)} />
                  <Progress type="circle" strokeColor={'red'} className='mx-2' percent={totalExpenseTurnoverPercent.toFixed(0)} />
                </div>
              </div>
            </div>
          </div> 
        </div>
      <div className="row mt-3">
        <div className="col-md-4">
              <h4>Categorywise Income</h4>
              {
                categories.map(category=>{
                  const amount= transactions.
                  filter(t=>t.type === 'income' 
                  && t.category === category)
                  .reduce((acc,t)=>acc+t.amount,0);
                  return (
                    amount>0 && (
                    <div className="card">
                      <div className="card-body">
                        <h5>{category}</h5>
                        <Progress 
                        percent={((amount/totalIncomeTurnover)*100).toFixed(0)}/>

                      </div>
                    </div>
                  )
                )
                })}
        </div>

        <div className="col-md-4">
              <h4>Categorywise Expense</h4>
              {
                categories.map(category=>{
                  const amount= transactions.
                  filter(t=>t.type === 'expense' 
                  && t.category === category)
                  .reduce((acc,t)=>acc+t.amount,0);
                  return (
                    amount>0 && (
                    <div className="card">
                      <div className="card-body">
                        <h5>{category}</h5>
                        <Progress 
                        percent={((amount/totalExpenseTurnover)*100).toFixed(0)}/>

                      </div>
                    </div>
                  )
                )
                })}
        </div>
      </div>
    </>
  
  );
};


export default Analytics
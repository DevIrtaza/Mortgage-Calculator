
import React, { useState } from 'react';
import './calculator.css'
import illustration from "./../assets/illustration-empty.svg";


export default function Calculator1() {
  const [selectedMortgageType, setSelectedMortgageType] = useState('repayment');

  const formCheckStyle = (type) => ({
    display: "flex",
    alignItems: "center",
   
    fontWeight: "bold",
    fontSize: "20px",
    border: `2px solid ${type === selectedMortgageType ? "#f0c20a" : "black"}`,
    padding: "13px",
    width: "74%",
    borderRadius: "10px"
  });

  const formCheckInputStyle = (isSelected) => ({
    margin: "0",
    backgroundColor: isSelected ? "#f0c20a" : "white",
    border: isSelected ? "1px solid #f0c20a" : "2px solid black",
  });

  const formCheckLabelStyle = {
    marginLeft: "1rem",
    lineHeight: "1.5",
  };

  const buttonStyle = {
    display: "flex",
    borderRadius: "27px",
    padding: "10px 35px 10px 35px",
    alignItems: "center",
    fontSize: "18px",
   
  };
  const handleRadioChange = (event) => {
    setSelectedMortgageType(event.target.value);
  };
  return (
    <div className='conatiner'>
      
      <div className='formic'>
        <div className='header'>  <h1> Mortgae Calculator</h1>
       <button className='headerbtn'>Clear all</button> </div>

       <form >
        <div className='allinput'>
             <p >Mortgage Amount</p>
             <div style={{width:"410px"}}>
             <div className="input-group">
              <span className='inputspan'> £</span>
              <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
            </div>
            </div>

            <div className='twodiv'>

            <div className='term'>
             <p >Mortgage Term</p>

             <div className='inputwidth' >
             <div className="input-group">
              <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
              <span className='inputspan'> years</span>
            </div>
            </div>

            </div>

            <div className='term'>
             <p >Intrest rate</p>
             <div className='inputwidth2'>

             <div className="input-group">
              <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
              <span className='inputspan'> %</span>
            </div>
            </div>
            </div>
            </div>
            
             {/* Payment type */}
             <p >Mortgage Type</p>
            <div style={formCheckStyle("repayment")}>
              <input
                style={formCheckInputStyle(selectedMortgageType  === 'repayment')}
                className="form-check-input"
                type="radio"
                name="mortgageType"
                id="repayment"
                value="repayment"
                onChange={handleRadioChange}
              />
              <label htmlFor="repayment" style={formCheckLabelStyle} className="form-check-label">
                Repayment
              </label>
            </div>

            <div style={formCheckStyle("interestOnly")}>
              <input
                style={formCheckInputStyle(selectedMortgageType === 'interestOnly')}
                className="form-check-input"
                type="radio"
                name="mortgageType"
                value="interestOnly"
                id="interestOnly"
                onChange={handleRadioChange}
              />
              <label htmlFor="interestOnly" style={formCheckLabelStyle} className="form-check-label">
                Interest Only
              </label>
            </div>
            </div>
            <button type="submit" className="btn btn-warning" style={buttonStyle}>
              <i className='bx bxs-calculator' style={{ fontSize: "29px", paddingRight: "10px" }}></i> Calculate Repayments
            </button>
       </form>

      </div>

       <div className='result'>
        
       <div className='defaultresult' >
            <img  src={illustration} className="img-fluid" alt="Illustration" />
            <h1 >
              Result shown here
            </h1>
            <p>
              Complete the form and click "calculate repayments" to see what your monthly repayments would be.
            </p>
          </div>

      </div>


    </div>
  )
}

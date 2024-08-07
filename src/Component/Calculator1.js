
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
    width: "85%",
    borderRadius: "10px",
    margin:"0px 0px 10px 0px"
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


  const handleRadioChange = (event) => {
    setSelectedMortgageType(event.target.value);
  };
  return (
    <div className='conatiner'>
<div className='tablet'>
      <div className='formic'>
        <div className='header'>  <h1> Mortgae Calculator</h1>
      <div style={{display:"flex"}}> <button className='headerbtn'>Clear all</button> </div>
      
       </div>

       <form >
        <div className='allinput'>
             <span className='spany'>Mortgage Amount</span>
             <div style={{width:"480px",margin:"10px 0px 10px 0px"}}>
              <div className="firstinput">
             <div className="input-group">
              <span className='inputspan' style={{borderRadius:"10px 0px 0px 10px"}}> £</span>
              <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
            </div>
            </div>
            </div>

            <div className='twodiv'>

            <div className='term'>
             <span style={{margin:"0px 0px 10px 0px"}} >Mortgage Term</span>

             <div className='inputwidth' >
             <div className="input-group">
              <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
              <span className='inputspan'> years</span>
            </div>
            </div>

            </div>

            <div className='term'>
             <span style={{margin:"0px 0px 10px 10px"}}>Intrest rate</span>
             <div className='inputwidth2'>

             <div className="input-group">
              <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
              <span className='inputspan'> %</span>
            </div>
            </div>
            </div>
            </div>
            
             {/* Payment type */}
             <div className='paymenttype'>
             <p style={{margin:"10px 0px 10px 0px"}} >Mortgage Type</p>
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

            </div>
            <button type="submit" className="btn" >
              <i className='bx bxs-calculator' style={{ fontSize: "29px", paddingRight: "10px" }}></i> Calculate Repayments
            </button>
       </form>
       </div>
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

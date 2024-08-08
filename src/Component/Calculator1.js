
import React, { useState } from 'react';
import './calculator.css'
import illustration from "./../assets/illustration-empty.svg";


export default function Calculator1() {
  const [selectedMortgageType, setSelectedMortgageType] = useState('repayment');
  const [amount, setAmount] = useState("");
  const [year, setYear] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState(null);
  const [totalpayment,settotalpayment]=useState(null);

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

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  const RemoveInput = () => {
    setAmount("");
    setRate("");
    setYear("");
   
    setResult(null); // Clear the result
  };


  const calculateMonthlyPayment = (principal, annualRate, years) => {
    const monthlyRate = annualRate / 100 / 12;
    const totalPayments = years * 12;

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);

    return monthlyPayment.toFixed(2); // Format to 2 decimal places
  };


  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const years = parseInt(year, 10);
  
    // Validate inputs
    if (isNaN(principal) || isNaN(annualRate) || isNaN(years) || principal <= 0 || annualRate <= 0 || years <= 0) {
      console.log("Please enter valid numbers for amount, years, and rate.");
      return;
    }
  
    // Calculate the monthly payment based on the mortgage type
    let result;

    let totalRepayment;
  
    if (selectedMortgageType === 'repayment') {
      result = calculateMonthlyPayment(principal, annualRate, years);
      
      // Calculate total repayment amount
      const totalPayments = years * 12;
       totalRepayment = (parseFloat(result) * totalPayments).toFixed(2);
  
       // Display total repayment in console
       console.log(`Total amount to be repaid: £${totalRepayment}`);
      } else if (selectedMortgageType === 'interestOnly') {
        result = (principal * annualRate / 100 / 12).toFixed(2); // Simple Interest calculation for demonstration
        
        // For interest-only mortgage, total repayment is just interest over time
        totalRepayment = (principal * annualRate / 100).toFixed(2);
        
        // Display total repayment in console
        console.log(`Total amount to be repaid: £${totalRepayment}`);
      }
      settotalpayment(totalRepayment)
      setResult(result); // Update result state
    };
  
  return (
    <div className='conatiner'>
   <div className='tablet'>
      <div className='formic'>
        <div className='header'>  <h1> Mortgae Calculator</h1>
      <div style={{display:"flex"}}> <button onClick={RemoveInput} className='headerbtn'>Clear all</button> </div>
      
       </div>

       <form onSubmit={handleSubmit} >
        <div className='allinput'>
             <span className='spany'>Mortgage Amount</span>
             <div style={{width:"480px",margin:"10px 0px 10px 0px"}}>
              <div className="firstinput">
             <div className="input-group">
              <span className='inputspan' style={{borderRadius:"10px 0px 0px 10px"}}> £</span>
              <input value={amount} onChange={handleAmountChange} type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
            </div>
            </div>
            </div>

            <div className='twodiv'>

            <div className='term'>
             <span style={{margin:"15px 0px 10px 0px"}} >Mortgage Term</span>

             <div className='inputwidth' >
             <div className="input-group">
              <input  value={year} onChange={handleYearChange} type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
              <span className='inputspan'> years</span>
            </div>
            </div>

            </div>

            <div className='term'>
             <span style={{margin:"15px 0px 10px 10px"}}>Intrest rate</span>
             <div className='inputwidth2'>

             <div className="input-group">
              <input   value={rate} onChange={handleRateChange} type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
              <span className='inputspan'> %</span>
            </div>
            </div>
            </div>
            </div>
            
             {/* Payment type */}
             <div className='paymenttype'>
             <p style={{margin:"25px 0px 10px 0px"}} >Mortgage Type</p>
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

       {result !== null ? (
            <>
                  {/* aftercalculation  */}
                  <div className='calculationresult'>
            <h2>Your results</h2>
            <p className='thisisp' >Your results are shown below based on the information you provided.
              To adjust the results,edit the form and click "Calculate Repayments" again.</p>

            <div className='resultdisplay'> 

             <p className='resultp' >{selectedMortgageType===`repayment`?"Your monthly repayments:":"Your monthly intrests:"}</p> 
             <h1 className='thisish1'>£{result}</h1>

             <div class="line" style={{ borderTop:"2px solid white"}}></div>

             <p className='resultp' >Total you'll repay over the term</p>
             <h1 className='thisish2'>£{totalpayment}</h1>
             
            </div>  
            </div>
            
            </> 
          ) 
          
          : (
        
       <div className='defaultresult' >
            <img  src={illustration} className="img-fluid" alt="Illustration" />
            <h1 >
              Result shown here
            </h1>
            <p>
              Complete the form and click "calculate repayments" to see what your monthly repayments would be.
            </p>
          </div>
  )}
      </div>


    </div>
  )
}

import React, { useState } from 'react';
import './calculator.css';
import illustration from "./../assets/illustration-empty.svg";

export default function Calculator1() {
  const [selectedMortgageType, setSelectedMortgageType] = useState(null);
  const [amount, setAmount] = useState("");
  const [year, setYear] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState(null);
  const [totalpayment, settotalpayment] = useState(null);
  const [errors, setErrors] = useState({
    amount: "",
    year: "",
    rate: "",
    type:"",
  });

  const formCheckStyle = (type) => ({
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "20px",
    border: `2px solid ${type === selectedMortgageType ? "#f0c20a" : "black"}`,
    padding: "13px",
    width: "85%",
    borderRadius: "10px",
    margin: "0px 0px 10px 0px"
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
    setErrors({ amount: "", year: "", rate: "" }); // Clear errors
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

    let newErrors = { amount: "", year: "", rate: "", type:"" };

    // Validate inputs
    if (isNaN(principal) || principal <= 0) {
      newErrors.amount = "This field is required";
    }
    if (isNaN(annualRate) || annualRate <= 0) {
      newErrors.rate = "This field is required";
    }
    if (isNaN(years) || years <= 0) {
      newErrors.year = "This field is required";
    }

    console.log(selectedMortgageType);
    

    if(!(selectedMortgageType === 'repayment' || selectedMortgageType === 'interestOnly')){
      
      newErrors.type = "This field is required";
    }

    if (newErrors.amount || newErrors.rate || newErrors.year || newErrors.type) {
      setErrors(newErrors);
      return;
    }

   

    // Clear errors if valid
    setErrors({ amount: "", year: "", rate: "",type:"" });

    // Calculate the monthly payment based on the mortgage type
    let result;
    let totalRepayment;

    if (selectedMortgageType === 'repayment') {
      result = calculateMonthlyPayment(principal, annualRate, years);

      // Calculate total repayment amount
      const totalPayments = years * 12;
      totalRepayment = (parseFloat(result) * totalPayments).toFixed(2);

    } else if (selectedMortgageType === 'interestOnly') {
      result = (principal * annualRate / 100 / 12).toFixed(2); // Simple Interest calculation for demonstration
      // For interest-only mortgage, total repayment is just interest over time
      totalRepayment = (principal * annualRate / 100).toFixed(2);
    }

    settotalpayment(totalRepayment);
    setResult(result); // Update result state
  };

  return (
    <div className='conatiner'>
      <div className='tablet'>
        <div className='formic'>
          <div className='header'>
            <h1>Mortgage Calculator</h1>
            <div style={{ display: "flex" }}>
              <button onClick={RemoveInput} className='headerbtn'>Clear all</button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='allinput'>
              <span className='spany'>Mortgage Amount</span>
              <div style={{ width: "480px", margin: "10px 0px 10px 0px" }}>
                <div className="firstinput">
                  <div className="input-group">
                    <span 
                    
                    style={{
                      backgroundColor: errors.amount ? 'red' : 'black', // Change background color based on error
                      color: errors.amount ? 'white' : 'white', // Keep text color white for better contrast
                       borderRadius: "10px 0px 0px 10px"
                    }}
                    
                    className='inputspan' > £</span>
                    <input
                      value={amount}
                      onChange={handleAmountChange}
                      type="text"
                      className="form-control"
                      aria-label="Amount (to the nearest dollar)"
                    />
                  </div>
                  {errors.amount && <p className='error-message'>{errors.amount}</p>} {/* Error message */}
                </div>
              </div>

              <div className='twodiv'>
                <div className='term'>
                  <span style={{ margin: "15px 0px 10px 0px",
                    
                  }}>Mortgage Term</span>
                  <div className='inputwidth'>
                    <div className="input-group">
                      <input
                        value={year}
                        onChange={handleYearChange}
                        type="text"
                        className="form-control"
                        aria-label="Amount (to the nearest dollar)"
                      />
                      <span  style={{
            backgroundColor: errors.year ? 'red' : 'black', // Change background color based on error
            color: errors.year ? 'white' : 'white', // Keep text color white for better contrast
          }} className='inputspan'> years</span>
                    </div>
                    {errors.year && <p className='error-message'>{errors.year}</p>} {/* Error message */}
                  </div>
                </div>

                <div className='term'>
                  <span style={{ margin: "15px 0px 10px 10px" }}>Interest rate</span>
                  <div className='inputwidth2'>
                    <div className="input-group">
                      <input
                        value={rate}
                        onChange={handleRateChange}
                        type="text"
                        className="form-control"
                        aria-label="Amount (to the nearest dollar)"
                      />
                      <span  style={{
            backgroundColor: errors.year ? 'red' : 'black', // Change background color based on error
            color: errors.year ? 'white' : 'white', // Keep text color white for better contrast
          }} className='inputspan'> %</span>
                    </div>
                    {errors.rate && <p className='error-message'>{errors.rate}</p>} {/* Error message */}
                  </div>
                </div>
              </div>

              {/* Payment type */}
              <div className='paymenttype'>
                
                <p style={{ margin: "25px 0px 10px 0px" }}>Mortgage Type</p>
                <div style={formCheckStyle("repayment")}>
                  <input
                    style={formCheckInputStyle(selectedMortgageType === 'repayment')}
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
                {errors.type && <p className='error-message'>{errors.type}</p>}
              </div>
            </div>
            <button type="submit" className="btn">
              <i className='bx bxs-calculator' style={{ fontSize: "29px", paddingRight: "10px" }}></i> Calculate Repayments
            </button>
          </form>
        </div>
      </div>

      <div className='result'>
        {result !== null ? (
          <>
            {/* aftercalculation */}
            <div className='calculationresult'>
              <h2>Your results</h2>
              <p className='thisisp'>Your results are shown below based on the information you provided.
                To adjust the results, edit the form and click "Calculate Repayments" again.</p>

              <div className='resultdisplay'>
                <p className='resultp'>{selectedMortgageType === `repayment` ? "Your monthly repayments:" : "Your monthly interest:"}</p>
                <h1 className='thisish1'>£{result}</h1>

                <div className="line" style={{ borderTop: "2px solid #f0c20a" }}></div>

                <p className='resultp' style={{ fontWeight: "bold" }}>Total Repayment:</p>
                <h2 className='thisish2'>£{totalpayment}</h2>
              </div>
            </div>
          </>
        ) : (
          <div className='defaultresult'>
            <img src={illustration} alt="Illustration" />
            <h1>Calculate Your Repayments</h1>
            <p>Fill out the form and click "Calculate Repayments" to see what your monthly repayments
              would be.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

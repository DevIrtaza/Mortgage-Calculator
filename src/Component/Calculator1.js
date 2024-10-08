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
  const [isHovered3, setIsHovered3] = useState(false);
  
  const [isHovered2, setIsHovered2] = useState(false);

  const [isHovered1, setIsHovered1] = useState(false);

  const inputstyle1={
    border:"2px solid ",
    borderRadius:"13px 10px 10px 13px ",
    borderColor: errors.amount ? "red" : isHovered1 ?" #e6e600" :"#ccf2ff",
    transition: 'border-color 0.3s, background-color 0.3s',
    cursor: "pointer",
    boxShadow:"none",
    outline:"none"
  }

  const spanstyle1={
   backgroundColor: errors.amount ? "red" : isHovered1 ?" #e6e600" :"#ccf2ff",
   color:"black",
   padding:"10px 14px 10px 14px",
   borderRadius:"11px 0px 0px 11px",
   fontWeight: isHovered1 ? "600" :"600",
   transition: 'color 0.3s',
   cursor:"pointer"


  }
  const inputstyle2={
    border:"2px solid ",
    borderRadius:"10px 15px 15px 10px ",
    borderColor: errors.year? "red" : isHovered2 ?" #e6e600" :"#ccf2ff",
    transition: 'border-color 0.3s, background-color 0.3s',
    cursor: "pointer",
    boxShadow:"none",
    outline:"none"
  }

  const spanstyle2={
   backgroundColor: errors.year ? "red" : isHovered2 ?" #e6e600" :"#ccf2ff",
   color:"black",
   padding:"10px",
   borderRadius:"0px 12px 10px 0px",
   fontWeight: isHovered2 ? "600" :"600",
   transition: 'color 0.3s',
   cursor:"pointer"


  }
  const inputstyle3={
    border:"2px solid ",
    borderRadius:"10px 15px 15px 10px ",
    borderColor: errors.rate ? "red" : isHovered3 ?" #e6e600" :"#ccf2ff",
    transition: 'border-color 0.3s, background-color 0.3s',
      cursor:"pointer",
      boxShadow:"none",
      outline:"none"
  }

  const spanstyle3={
   backgroundColor: errors.rate ? "red" : isHovered3 ?" #e6e600" :"#ccf2ff",
   color:"black",
   padding:"10px",
   borderRadius:"0px 12px 10px 0px",
   fontWeight: isHovered3 ? "bold" :"bold",
   transition: 'color 0.3s',
     cursor:"pointer"


  }

  const formCheckStyle = (type) => ({
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "20px",
    border: `2px solid ${type === selectedMortgageType ? "#f0c20a" : " #99e4ff"}`,
    padding: "13px",
    width: "85%",
    borderRadius: "10px",
    margin: "0px 0px 10px 0px",
    cursor:"pointer"
  });

  const formCheckInputStyle = (isSelected) => ({
    margin: "0",
    backgroundColor: isSelected ? "#f0c20a" : "white",
    border: isSelected ? "1px solid #f0c20a" : "2px solid  #99e4ff",
    cursor:"pointer"
  });

  const formCheckLabelStyle = {
    marginLeft: "1rem",
    lineHeight: "1.5",
    cursor:"pointer"
  };

  const handleRadioChange = (event) => {
    setSelectedMortgageType(event.target.value);
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
    setSelectedMortgageType("")
  };

  // Utility function to format number with commas
const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Utility function to remove commas
const removeCommas = (string) => {
  return string.replace(/,/g, '');
};
const handleAmountChange = (event) => {
  const rawValue = event.target.value;
  const numericValue = removeCommas(rawValue);

  if (!isNaN(numericValue) && numericValue.trim() !== '') {
    // Format the input with commas
    const formattedValue = formatNumber(parseFloat(numericValue));
    setAmount(formattedValue);
  } else {
    setAmount(rawValue);
  }
};


  const calculateMonthlyPayment = (principal, annualRate, years) => {
    const monthlyRate = annualRate / 100 / 12;
    const totalPayments = years * 12;
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return monthlyPayment.toFixed(2); // Format to 2 decimal places
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const principal = parseFloat(removeCommas(amount));
    const annualRate = parseFloat(rate);
    const years = parseInt(year, 10);
  
    let newErrors = { amount: "", year: "", rate: "", type: "" };
  
    if (isNaN(principal) || principal <= 0) {
      newErrors.amount = "This field is required";
    }
    if (isNaN(annualRate) || annualRate <= 0) {
      newErrors.rate = "This field is required";
    }
    if (isNaN(years) || years <= 0) {
      newErrors.year = "This field is required";
    }
    if (!(selectedMortgageType === 'repayment' || selectedMortgageType === 'interestOnly')) {
      newErrors.type = "This field is required";
    }
  
    if (newErrors.amount || newErrors.rate || newErrors.year || newErrors.type) {
      setErrors(newErrors);
      return;
    }
  
    setErrors({ amount: "", year: "", rate: "", type: "" });
  
    let result;
    let totalRepayment;
  
    if (selectedMortgageType === 'repayment') {
      result = calculateMonthlyPayment(principal, annualRate, years);
      const totalPayments = years * 12;
      totalRepayment = (parseFloat(result) * totalPayments).toFixed(2);
    } else if (selectedMortgageType === 'interestOnly') {
      result = (principal * annualRate / 100 / 12).toFixed(2);
      totalRepayment = (principal * annualRate / 100).toFixed(2);
    }
  
    settotalpayment(totalRepayment);
    setResult(result);
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
                <div className="firstinput" >
                  <div className="input-group" style={inputstyle1} onMouseEnter={() => setIsHovered1(true)}
                          onMouseLeave={() => setIsHovered1(false)}   >
                    <span 
                    
                    style={spanstyle1}
                    
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
                  <span style={{ margin: "8px 0px 10px 0px",cursor:"pointer"
                    
                  }}>Mortgage Term</span>
                  <div className='inputwidth'  >
                    <div className="input-group" style={inputstyle2} onMouseEnter={() => setIsHovered2(true)}
                          onMouseLeave={() => setIsHovered2(false)}>   
                      <input
                        value={year}
                        onChange={handleYearChange}
                        type="text"
                        className="form-control"
                        aria-label="Amount (to the nearest dollar)"
                      />
                      <span   style={spanstyle2}
           
         className='inputspan'> years</span>
                    </div>
                    {errors.year && <p className='error-message'>{errors.year}</p>} {/* Error message */}
                  </div>
                </div>

                <div className='term'>
                  <span style={{ margin: "8px 0px 10px 10px",cursor:"pointer" }}>Interest rate</span>
                  <div className='inputwidth2'  >
                    <div className="input-group" style={inputstyle3} onMouseEnter={() => setIsHovered3(true)}
                          onMouseLeave={() => setIsHovered3(false)}>
                      <input
                        value={rate}
                        onChange={handleRateChange}
                        type="text"
                        className="form-control"
                        aria-label="Amount (to the nearest dollar)"
                      />
                      <span  style={spanstyle3} className='inputspan'> %</span>
                    </div>
                    {errors.rate && <p className='error-message'>{errors.rate}</p>} {/* Error message */}
                  </div>
                </div>
              </div>
             
              {/* Payment type */}
              <div className='paymenttype'>
                
                <p style={{ margin: "14px 0px 10px 0px",cursor:'pointer' }}>Mortgage Type</p>
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

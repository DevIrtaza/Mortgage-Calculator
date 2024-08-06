import React, { useState } from 'react';
import illustration from "./../assets/illustration-empty.svg";

export default function Calculator() {
  const [selectedMortgageType, setSelectedMortgageType] = useState('repayment');
  const [amount, setAmount] = useState("");
  const [year, setYear] = useState("");
  const [rate, setRate] = useState("");
  const [errors, setErrors] = useState({
    amount: false,
    year: false,
    rate: false
  });
  const [result, setResult] = useState(null);

  const [totalpayment,settotalpayment]=useState(null);

  const defaultresultStyle = {
    // width: "50%",
    // margin:"0px auto",
    height: "100%",
    backgroundColor: "black",
    boxSizing: "border-box",
   
    padding: 0,
    borderRadius: "0px 0px 0px 120px",
    display: "flex",
    flexDirection: "column",
  //  justifyContent:"center",
  //  alignItems: "center"
  //  textAlign:"center"M
   
  };

  const resultStyle={

    width: "50%",
    height: "100%",
    backgroundColor: "black",
    boxSizing: "border-box",
    margin: 0,
    padding: "50px 50px 0px 50px",
    borderRadius: "0px 0px 0px 145px",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    color:"white"
  }

  const calculateStyle = {
    // width: "50%",
    height: "100%",
    backgroundColor: "white",
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    borderRadius: "25px 0px 0px 25px"
  };

  const containerStyle = {
    display: "flex",
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0,
   
    backgroundColor: "white"
  };

  const formCheckStyle = (type) => ({
    display: "flex",
    alignItems: "center",
    margin: "0px 0px 10px 84px",
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

  const clearButtonStyle = {
    fontSize: "20px",
    border: "none",
    backgroundColor: "white",
    color: "black",
    cursor: "pointer",
    padding: "0",
    textDecoration: "underline",
    // margin: "0px 90px 0px 0px",
    outline: "none",
    fontWeight: "bold",
   
  };

  const buttonStyle = {
    display: "flex",
    borderRadius: "27px",
    padding: "10px 35px 10px 35px",
    alignItems: "center",
    fontSize: "18px",
    margin: "30px 0px 10px 82px"
  };

  const inputGroupStyle = {
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    overflow: "hidden",
  };

  const errorStyle = {
    color: "#ff0000",
    borderRadius: "5px",
    display: "block",
    textAlign: "left"
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

  const validateFields = () => {
    const newErrors = {
      amount: amount.trim() === "",
      year: year.trim() === "",
      rate: rate.trim() === ""
    };

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const calculateMonthlyPayment = (principal, annualRate, years) => {
    const monthlyRate = annualRate / 100 / 12;
    const totalPayments = years * 12;

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);

    return monthlyPayment.toFixed(2); // Format to 2 decimal places
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
  
    if (!validateFields()) {
      return; // Exit if there are validation errors
    }
  
    // Convert input values to numbers
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
  

  const RemoveInput = () => {
    setAmount("");
    setRate("");
    setYear("");
    setErrors({
      amount: false,
      year: false,
      rate: false
    });
    setResult(null); // Clear the result
  };

  return (
    <div className='outercontainer' style={{ margin: 0, padding: 0 }}>

      <div className='maincontainer' style={containerStyle}>
        {/* 1st container */}

        <div className='this' style={calculateStyle}>

          <div  className="header-container" style={{ display: "flex",justifyContent:"space-between", alignItems: "center", padding: "50px 0px 0px 0px" }}>
            <h1 style={{ fontSize: "25px",margin:"0px 0px 0px 88px", fontWeight: "bolder" }}>Mortgage Calculator</h1>
            <button style={clearButtonStyle} onClick={RemoveInput}>Clear All</button>
          </div>

          <form onSubmit={handleSubmit}>
            <p style={{ textAlign: "left", margin: "10px 0px 10px 90px" }}>Mortgage Amount</p>
            <div className="input-group mb-3" style={{ width: "74%", margin: "10px 0px 0px 88px" }}>
              <span style={{ backgroundColor: errors.amount ? "#ff0000" : "black", color: errors.amount ? "white" : "white", borderRadius: "10px 0 0 10px" }} className="input-group-text">£</span>
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="form-control"
                aria-label="Amount (to the nearest dollar)"
                style={{ borderRadius: "0 10px 10px 0" }}
              />
            </div>
            {errors.amount && <div style={ {marginLeft:"90px",...errorStyle}}>This field is required</div>}

            {/* Term and interest section */}
            <div className="termintrest" style={{ display: "flex", margin: "0px 0px 0px 0px", justifyContent: "center" }}>
              <div style={{ marginRight: "20px", display: "flex", flexDirection: "column", width: "36%" }}>
                <span style={{ textAlign: "left", marginBottom: "3px" }}>Mortgage Term</span>
                <div className="input-group mb-3" style={inputGroupStyle}>
                  <input
                    type="text"
                    value={year}
                    onChange={handleYearChange}
                    className="form-control"
                    aria-label="Amount (to the nearest dollar)"
                    style={{ borderRadius: "10px 0 0 10px" }}
                  />
                  <span style={{ backgroundColor: errors.year ? "#ff0000" : "black", color: errors.year ? "white" : "white", borderRadius: "0 10px 10px 0" }} className="input-group-text">years</span>
                </div>
                {errors.year && <div style={errorStyle}>This field is required</div>}
              </div>

              <div style={{ display: "flex", flexDirection: "column", width: "36%" }}>
                <span style={{ textAlign: "left", marginBottom: "3px" }}>Interest Rate</span>
                <div className="input-group mb-3" style={inputGroupStyle}>
                  <input
                    type="text"
                    value={rate}
                    onChange={handleRateChange}
                    className="form-control"
                    aria-label="Amount (to the nearest dollar)"
                    style={{ borderRadius: "10px 0 0 10px" }}
                  />
                  <span style={{ backgroundColor: errors.rate ? "#ff0000" : "black", color: errors.rate ? "white" : "white", borderRadius: "0 10px 10px 0" }} className="input-group-text">%</span>
                </div>
                {errors.rate && <div style={errorStyle}>This field is required</div>}
              </div>
            </div>

            {/* Payment type */}
            <p style={{ textAlign: "left", margin: "0px 0px 10px 84px" }}>Mortgage Type</p>
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

            {/* Calculation button */}
            <button type="submit" className="btn btn-warning" style={buttonStyle}>
              <i className='bx bxs-calculator' style={{ fontSize: "29px", paddingRight: "10px" }}></i> Calculate Repayments
            </button>
          </form>
        </div>

        {/* 2nd container */}
        <div className='result' style={resultStyle}>
 {result !== null ? (
            <>
                  {/* aftercalculation  */}
            <h2>Your results</h2>
            <p style={{fontSize:"20px", width:"99%"}}>Your results are shown below based on the information you provided.
              To adjust the results,edit the form and click "Calculate Repayments" again.</p>

            <div style={{display:"flex",flexDirection:"column", border:"2px solid #333333",width:"96%",
              borderRadius:"10px",padding:"10px 0px 20px 35px", borderTop:"10px solid yellow",
              backgroundColor:"#333333", margin:"15px 0px 0px 0px"
              }}>

             <p style={{fontSize:"20px"}}>{selectedMortgageType===`repayment`?"Your monthly repayments:":"Your monthly intrests:"}</p> 
             <h1 style={{ color: "yellow",  }}>£{result}</h1>

             <div class="line" style={{ borderTop:"2px solid white",margin:"20px 35px 29px 0px"}}></div>

             <p style={{fontSize:"20px"}}>Total you'll repay over the term</p>
             <h1 style={{ color: "white", margin: "0px 0px 0px 0px" }}>£{totalpayment}</h1>
             
            </div>  

            
            </> 
          ) 
          
            // default calculation 
          
          : (
            <div style={defaultresultStyle}>
            <img style={{ margin: "0", width:"60%", alignSelf:"center" }} src={illustration} className="img-fluid" alt="Illustration" />
            <h1 style={{ color: "white",alignSelf:"center" ,fontWeight: "bolder", fontSize: "30px", margin: "10px 0px 20px 0px" }}>
              Result shown here
            </h1>
            <p style={{  margin: "0", width:"87%",alignSelf: "center",textAlign:"center",fontSize:"20px" }}>
              Complete the form and click "calculate repayments" to see what your monthly repayments would be.
            </p>
          </div>
           
          )}

         
        </div>

      </div>

      <style>
  {`
    @media (max-width: 1297px) {
      .termintrest {
        flex-direction: column;
        align-items: start;
        width: 237%;
      }
      
      .termintrest > div {
        padding: 0px 0px 0px 86px; /* Adjust padding to ensure proper spacing */
      }
    }
    
    @media(min-width: 1111px)
    {
    .header-container button {
       margin-right: 90px;
    }
    }
     
    @media (max-width: 1110px) {
      .header-container {
        flex-direction: column;
      }

      .header-container button {
        font-size: 25px;
        margin: 0px 0px 3px 90px;
        font-weight: bolder;
        align-self: flex-start;
      }

      .header-container h1 {
        font-size: 25px;
        margin: 0px 0px 3px 90px;
        font-weight: bolder;
        align-self: flex-start;
      }

      .termintrest {
        width: 244%;
      }
    }

    @media (max-width: 915px) {
      .termintrest {
        width: 250%;
      }
    }

    @media (max-width: 798px) {
      .termintrest {
        width: 259%;
      }
     .result{
     
     height:155%;
     
     } 
    }


     @media (max-width: 764px) {

     .maincontainer{
        flex-direction: column;
        align-items: start; 
           }
       
           div.this{
           
           width:100%;
           
           }
    
        
    }

     @media (min-width: 765px) {

  
       
           div.this{
           
           width:100%;
           
           }
    
        
    }


   
  
    
  `}
</style>

    
   

 

    </div>
  );
}

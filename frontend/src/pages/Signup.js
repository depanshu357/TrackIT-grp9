import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import "./style.css";

let otp;


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [rollNo, setRollNo] = useState(null);
  const [userType, setUserType] = useState("Customer");
  const [shopName, setShopName] = useState("");
  const [budget, setBudget] = useState(null);
  const [disabled, setDisabled] = useState(false)
  const { signup, error, isLoading } = useSignup();
  const options = ["Customer", "Shopkeeper"];

  const [newError, setNewError] = useState(null);


  const sendEmail = async (e) => {
    e.preventDefault();

    otp = Math.floor(100000 + Math.random() * 900000);
    // console.log(otp);
    setDisabled(true)
    const otp_email = { otp, email };


    const fetchOtp = async () => {
      const response = await fetch("/api/user/signup/otp", {
        method: "POST",
        body: JSON.stringify(otp_email),
        headers: { 'Content-Type': 'application/json', }
      })
      const json = await response.json();

    };
    fetchOtp();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp != OTP) {
      setNewError("OTP does not match!");
      // console.log("wrong otp");
      
    }
    else {
      console.log("correct otp");
      setNewError(null);
      await signup(email, password, userType, rollNo, shopName, budget);
    }
  };

  const onOptionChangeHandler = (e) => {
    console.log(e.target.value);
    setUserType(e.target.value);
  };

  return (
    <>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet"></link>
      <link rel="stylesheet" href="./style.css"></link>
      <section class="ftco-section" style={{ overflowX: "hidden", height: "100vh" }}>
        <div class="container1">
          <div class="row justify-content-center">
            <div class="col-md-12 col-lg-10">
              <div class="wrap d-md-flex">
                <div class="img"
                >
                  <img src="https://i.postimg.cc/L5nT4GV8/Screenshot-2023-03-12-153044.png" style={{ height: "50%", widht: "100%" }} />
                  <img src="https://i.postimg.cc/qqSGNQmX/Screenshot-2023-03-12-153600.png" style={{ height: "50%", widht: "100%" }} />
                </div>
                <div class="login-wrap p-4 p-md-5">
                  <div class="d-flex">
                    <div class="w-100">
                      <h3 class="mb-4">Register</h3>
                    </div>

                  </div>
                  <form onSubmit={handleSubmit} class="signin-form">
                    <div class="form-group mb-3">
                      <label class="label" for="name">Username</label>
                      <input type="email"
                        placeholder="Email"
                        class="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        disabled={disabled}
                      />
                      <button className="form-control btn btn-primary rounded submit px-3" onClick={sendEmail}>Verify</button>
                    </div>
                    <div class="form-group mb-3">
                      <label class="label" for="password">OTP:</label>
                      <input type="number"
                        onWheel={(e) => e.target.blur()}
                        onChange={(e) => setOTP(e.target.value)}
                        value={OTP}
                        placeholder="Enter OTP"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group mb-3">
                      <label class="label" for="password">Password</label>
                      <input
                        class="form-control"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                    <select class="form-control2"
                      onChange={onOptionChangeHandler}>
                      <option>Please choose one option</option>
                      {options.map((option, index) => {
                        return <option key={index}>{option}</option>;
                      })}
                    </select>
                    <div className="form-group mb-3">
                      {userType === "Customer" && (
                        <div>
                          <input
                            type="number"
                            onWheel={(e) => e.target.blur()}
                            value={rollNo}
                            class="form-control"
                            onChange={(e) => setRollNo(e.target.value)}
                            placeholder="IITK RollNo"
                          />
                        </div>
                      )}
                      <br />
                      {userType === "Customer" && (
                        <div>
                          <input
                            type="number"
                            onWheel={(e) => e.target.blur()}
                            value={budget}
                            class="form-control"
                            onChange={(e) => setBudget(e.target.value)}
                            placeholder="Budget"
                          />
                        </div>
                      )}

                      {userType === "Shopkeeper" && (
                        <div>
                          <input
                            type="text"
                            value={shopName}
                            class="form-control"
                            onChange={(e) => setShopName(e.target.value)}
                            placeholder="ShopName"
                          />
                        </div>
                      )}
                    </div>
                    <button className="form-control btn btn-primary rounded submit px-3" disabled={isLoading}>
                      Submit
                    </button>
                    {error && <div className="error">{error}</div>}
                    {newError && <div className="error">{newError}</div>}
                    <p class="text-left">Registered Already? <a href="/login">Log in</a></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

};

export default Signup;

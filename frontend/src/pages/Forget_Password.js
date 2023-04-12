import React, { Component, useState } from "react";
import "./style.css";

const Forget_Password = () => {
  const [email, setEmail] = useState(null);
  const [Otp, setOtp] = useState(null);
  // const [otp,setFetchedOtp] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lock, setLock] = useState(false)
  const [message, setMessage] = useState(null);
  const [temp, setTemp] = useState(null)

  var otp = null;
  const sendEmail = async (e) => {
    e.preventDefault();

    setLock(true)
    otp = Math.floor(100000 + Math.random() * 900000);
    // console.log(otp);
    setTemp(otp);
    const otp_email = { otp, email };

    const fetchOtp = async () => {
      const response = await fetch("/api/user/signup/otp", {
        method: "POST",
        body: JSON.stringify(otp_email),
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
    };
    fetchOtp();
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const updatePassword = { email, password };
    setIsLoading(true);
    // console.log(temp, Otp)
    if ((temp.toString()) !== Otp) {
      setMessage("Wrong OTP");
    } else if (confirmPassword !== password) {
      setMessage("Passwords do not match");
    } else {
      console.log("ok to proceed")
      const fetchUpdatePassword = async () => {

        const response = await fetch("/api/user/signup/updatePassword", {
          method: "POST",
          body: JSON.stringify(updatePassword),
          headers: { "Content-Type": "application/json" },
        });
        const json = await response.json();
        // console.log(response)
        if (response.ok) {
          setMessage("Password successfully updated, Please go to Login Page");
        } else {
          setMessage("Error in updating password, Please try again");
        }
      }
      fetchUpdatePassword();
      setIsLoading(false)
    }
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
                ><img src="https://i.postimg.cc/L5nT4GV8/Screenshot-2023-03-12-153044.png" style={{ width: "100%", height: "101%" }} /></div>
                <div class="login-wrap p-4 p-md-5">
                  <div class="d-flex">
                    <div class="w-100">
                      <h3 class="mb-4">Change Password</h3>
                    </div>

                  </div>
                  <form onSubmit={handleSubmit} class="signin-form">
                    <div class="form-group mb-3">
                      <label class="label" for="name">Username</label>
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        value={email}
                      />
                      <button className="form-control btn btn-primary rounded submit px-3" onClick={sendEmail} disabled={lock}>Send OTP</button>
                    </div>
                    <div class="form-group mb-3">
                      <label class="label" for="password">OTP:</label>
                      <input
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        placeholder="Enter OTP"
                        value={Otp}
                        class="form-control"
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                    <div class="form-group mb-3">
                      <label class="label" for="password">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Enter New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div class="form-group mb-3">
                      <label class="label" for="password">Re-enter Password</label>
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        class="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <button className="form-control btn btn-primary rounded submit px-3" onClick={handleSubmit} disabled={isLoading}>
                      Submit
                    </button>
                    {/* <div className="create">
                    <a href="./">Back to Login</a>
                    <i className="ri-arrow-right-fill" />
                  </div> */}
                    <p class="text-left">Back to <a href="/login">Login</a></p>
                    <div>{message}</div>
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

export default Forget_Password;

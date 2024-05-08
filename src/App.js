import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './App.css'

function App() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);
  const [value, setValue] = useState('');



  useEffect(() => {
    const sendOTPForm = document.getElementById('sendOTPForm');
  

    if (sendOTPForm) {
      sendOTPForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailValue = sendOTPForm.elements.email.value;
        setEmail(emailValue);
        setOtp('');
        setSendingOTP(true);
        const otpValue = generateOTP();
        setOtp(otpValue);
        sendOTPToEmail(emailValue, otpValue);
        setOtpSent(true);
        setSendingOTP(false);
      });
    }

    return () => {
      sendOTPForm.removeEventListener('submit', () => {});
    };
  }, []);

  function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
  }

  function sendOTPToEmail(email, otp) {
    const serviceId = 'service_bz75du9';
    const templateId = 'template_nzhj6bn';
    const userId = 'yyZrouw_8ZNT_cEge';
    var params ={
      otp: otp,
      from_name:"jainoddin_project",
      toemail:email,
    }
    console.log(params.toemail)

    emailjs.send(serviceId, templateId, params, userId).then(
      (response) => {
        console.log('Email sent successfully!', response.status, response.text);
      },
      (error) => {
        console.log('Error sending email:', error);
      }
    );
  }

  function verifyOTP(e) {
    e.preventDefault();
    const enteredOTP = e.target.elements.otp.value;

    if (enteredOTP === otp) {
      setOtpVerified(true);
    } else {
      alert('Invalid OTP');
    }
  }

  return (
    <>
      <h1>Send OTP</h1>
      {!otpSent && (
        <form id="sendOTPForm">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <button type="submit" disabled={sendingOTP}>
            {sendingOTP ? 'Sending OTP...' : 'Send OTP'}
          </button>        </form>
      )}
      {otpSent && !otpVerified && (
        <form id="verifyOTPForm">
          <label for="otp">Enter OTP:</label>
          <input type="text" id="otp" name="otp" required />
          <button type="submit" onClick={verifyOTP}>
            Verify OTP
          </button>
        </form>
      )}
      {otpVerified && <p>OTP verified!</p>}
    </>
  );
}

export default App;

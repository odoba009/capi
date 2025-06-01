import { Link } from 'react-router-dom'
export default function Success() {
 
  return (
    <div>
        <div style={{textAlign:"center", margin:"30px 0"}}>
        <p style={{ margin:"20px 0"}} className="">Verification Complete</p>
          <p style={{ color: "green" }}>
          Thank you for verifying your details with us, You'll be redirected
            to the home page.
          </p>
          <br />
          <Link to={"/"} target="_blank">Go home</Link>
        </div>
    </div>
  )
}


import { useState } from 'react'
import loginStyle from "./cssModules/login.module.css";
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/authUser';

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useAuthStore();
  
  const handleLogin = (e) => {
    e.preventDefault();
    login({email, password});
    
  }

return (
  <>
  
  
  <img src="/triangle2.png" />
  <img src="/ellipse1.png" />
  <img src="/ellipse2.png"/>
  <Link to="/"><div className={loginStyle.backbutton}><img src="/arrow_back.png" /></div></Link>
  <div className={loginStyle.formcontainer}>
    <form onSubmit={handleLogin}>
     
        
      <div>
      <label htmlFor="email">Email</label>
      <input 
          type="Email"
          placeholder='Enter your email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
      </div>
     
     <div>
     <label htmlFor="Password">Password</label>
      <input 
          type="password"
          placeholder='*************'
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        
       
      </div>
      
      
     
      
      
    
     
      <button type='onSubmit'>Log In</button>
     
    </form>
    <div className={loginStyle.para}>  <p>Don't have an account?</p>
    <Link to='/signup' > <a>Register now</a></Link></div>
   
  </div>
  </>
)
}

export default Login
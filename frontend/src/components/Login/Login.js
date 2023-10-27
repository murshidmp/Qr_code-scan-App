import React, { useState } from "react";
import axios from "axios";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = () => {
    axios
      .post("http://localhost:3001/users/login", { username, password })
      .then((response) => {
        // Store the JWT token received in response, and perform further actions like redirection or user state update.
        if (response.data.result){
          const token = response.data.token;
        document.cookie = `jwt=${token}; Path=/; Secure; SameSite=Strict`;
        props.isLoginfn(true)
        }else{
          

        }
        
        
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
export default Login;

import React from "react";
import axios from "axios";
import "./App.css";

const pingCall = () => {
  axios.get("http://localhost:8000/ping").then((data) => {
    console.log(data);
  });
};

function App() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [token, setToken] = React.useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/signup", {
        username: email,
        password: password
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/signin", {
        username: email,
        password
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Auth Demo</h1>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup}>Sign Up</button>
        <button onClick={handleSignin}>Sign In</button>
      </div>

      {token && <p>Token: {token}</p>}
    </div>
  );
}

export default App;

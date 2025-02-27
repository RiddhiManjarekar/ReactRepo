import { useState } from "react";
import { useAuth } from "./useAuth";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const { login, isLoggingIn } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

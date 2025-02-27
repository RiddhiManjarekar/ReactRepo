import { Link } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";

const Navbar = () => {
  const { state, dispatch } = useGlobalContext();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({state.cart.length})</Link>
      {state.user?.role === "admin" && <Link to="/admin">Admin</Link>}
      {state.user ? (
        <button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;

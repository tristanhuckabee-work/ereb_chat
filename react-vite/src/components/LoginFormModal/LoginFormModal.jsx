import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import MenuSVG from "../MenuSVG/MenuSVG";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await dispatch(thunkLogin({ email, password }));
    if (res) {
      setErrors(res);
    } else {
      closeModal();
    }
  };
  const demoSubmit = async (e) => {
    e.preventDefault();

    let res = await dispatch(thunkLogin({ email:'demo@aa.io', password:'password' }));
    if (res) {
      setErrors(res);
    } else {
      closeModal();
    }
  }

  return (
    <div className='modal-form signin'>
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className='errors'>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className='errors'>{errors.password}</p>}
        <div className='form-actions'>
          <MenuSVG text='SUBMIT' onClick={handleSubmit}/>
          <MenuSVG text='CANCEL' onClick={closeModal}/>
        </div>
        <MenuSVG text='DEMO LOGIN' onClick={demoSubmit}/>
        {/* <button type="submit">Log In</button> */}
      </form>
    </div>
  );
}

export default LoginFormModal;

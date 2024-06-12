import "./Navigation.css";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import MenuSVG from "../MenuSVG/MenuSVG";

function Navigation() {
  let current_user = useSelector(state => state?.session?.user)

  if (current_user) {
    return (
      <nav id='user-nav'>
        <h1>EREB</h1>
        <MenuSVG text='LOG OUT' />
      </nav >
    );
  } else {
    return (
      <nav id='splash-nav'>
        <h1>EREB</h1>
        <div id='splash-actions'>
          <OpenModalButton
            buttonText='SIGN IN'
            modalComponent={<LoginFormModal />}
            buttonID='nav-login'
          />
          <OpenModalButton
            buttonText='REGISTER'
            modalComponent={<SignupFormModal />}
            buttonID='nav-register'
          />
        </div>
      </nav >
    )
  }
}

export default Navigation;

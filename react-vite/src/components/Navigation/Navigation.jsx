import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import MenuSVG from "../MenuSVG/MenuSVG";
import { thunkLogout } from "../../redux/session";
import { useEffect } from "react";
import { get_servers } from "../../redux/server";

function Navigation() {
  const dispatch = useDispatch()
  const current_user = useSelector(state => state?.session?.user)
  const servers = useSelector(state => state?.servers?.servers)

  useEffect(() => {
    dispatch(get_servers('all'))
  }, [dispatch])

  const logout = e => {
    e.preventDefault();
    dispatch(thunkLogout());
  }
  const formatServers = () => {
    let comp = [];
    for (let id in servers) {

      let compName = servers[id]?.name
      if (compName.length > 10) {
        compName = compName.slice(0,10) + '...'
      }
      comp.push(
        <MenuSVG text={compName} />
      )
    }
    return comp;
  }

  if (current_user) {
    return (
      <nav id='user-nav'>
        <div>
          <h1>{current_user?.username}</h1>
          <div id='server-list'>
            {formatServers()}
          </div>
        </div>
        <MenuSVG text='LOG OUT' onClick={logout}/>
      </nav >
    );
  } else {
    return (
      <nav id='user-nav'>
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

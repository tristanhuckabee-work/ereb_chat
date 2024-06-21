import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import MenuSVG from "../MenuSVG/MenuSVG";
import { thunkLogout } from "../../redux/session";
import { useEffect } from "react";
import { get_servers } from "../../redux/server";
import ServerMenu from "../ServerMenu/ServerMenu";

function Navigation() {
  const dispatch = useDispatch()
  const current_user = useSelector(state => state?.session?.user)
  const servers = useSelector(state => state?.servers?.servers)

  useEffect(() => {
    dispatch(get_servers('usr', current_user?.id))
  }, [dispatch, current_user])

  const logout = e => {
    e.preventDefault();
    dispatch(thunkLogout());
  }
  const formatServers = () => {
    let comp = [];
    for (let id in servers) {
      comp.push(
        <ServerMenu server={servers[id]} />
      )
    }
    return comp;
  }
  const createServer = e => {
    e.preventDefault();

    console.log('open modal')
  }

  if (current_user) {
    return (
      <nav id='user-nav'>
        <div>
          <h1 style={{ 'text-align': 'center' }}>{current_user?.username}</h1>
          <div id='server-list'>
            {/* <div className='server-menu'>Direct Messages</div> */}
            {formatServers()}

          </div>
          {/* <MenuSVG text='+ New Server' onClick={createServer}/> */}
          <OpenModalButton
            buttonText='NEW SERVER'
            modalComponent={<LoginFormModal />}
            buttonID='nav-new-server'
          />
        </div>
        <MenuSVG text='LOG OUT' onClick={logout} />
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

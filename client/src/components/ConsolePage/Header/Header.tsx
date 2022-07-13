import React, {useContext, useEffect} from 'react'
import Logo from 'common/Logo/Logo'
import maximize from 'assets/img/consolePage/maximize.svg'
import minimize from 'assets/img/consolePage/minimize.svg'
import './Header.css'
import {useNavigate} from 'react-router-dom'
import {FullScreenHandle} from 'react-full-screen'
import {CurrentUserContext} from "components/ConsolePage/ConsolePage";
import {UserType} from "types/EntityTypes/EntityTypes";

type OwnProps = {
  fullScreen: FullScreenHandle,
}
type PropsType = OwnProps
const Header = ({fullScreen}: PropsType) => {
  const handleFullScreen = () => {
    fullScreen.active ? fullScreen.exit() : fullScreen.enter()
  }
  let {user}  = useContext(CurrentUserContext)

  return (
    <div className="header">
      <div className="header__left">
        <Logo/>
        <div> API-консолька</div>
      </div>
      <div className="header__right">
        <div>
          {user?.email}
        </div>
        <img
          tabIndex={1}
          onClick={handleFullScreen}
          className="header__exit header__exit_maximize"
          src={fullScreen.active ? minimize : maximize}
          alt="maximize icon"
        />
      </div>
    </div>
  )
}
export default Header
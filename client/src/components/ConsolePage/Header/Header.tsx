import React from 'react'
import Logo from 'common/Logo/Logo'
import maximize from 'assets/img/consolePage/maximize.svg'
import minimize from 'assets/img/consolePage/minimize.svg'
import './Header.css'
import {useNavigate} from 'react-router-dom'
import {FullScreenHandle} from 'react-full-screen'

type OwnProps = {
  fullScreen: FullScreenHandle,
}
type PropsType = OwnProps
const Header = ({fullScreen}: PropsType) => {
  const handleFullScreen = () => {
    fullScreen.active ? fullScreen.exit() : fullScreen.enter()
  }
  const navigate = useNavigate()


  return (
    <div className="header">
      <div className="header__left">
        <Logo/>
        <div> API-консолька</div>
      </div>
      <div className="header__right">
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
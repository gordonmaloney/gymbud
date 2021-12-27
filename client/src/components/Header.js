import React from 'react'
import HeaderBar from '../Imgs/header.png'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useHistory } from 'react-router-dom';

export const Header = () => {
const history = useHistory()
    return (
        <div onClick={() => history.push('../')}>
            <img src={HeaderBar} style={{width: "100%", position: "absolute"}}/>
            <h1 style={{color: "white", position: "absolute", top: "-30px", left: "20px", fontWeight: "normal", fontSize: "50px"}}>Gym Bud</h1>



            <LogoutOutlinedIcon style={{fontSize: "30px", zIndex: 4, position: "absolute", right: "25px", top: "25px", color: "white"}}/>

            
        </div>
    )
}

import React from 'react'
import HeaderBar from '../Imgs/header.png'
import { useHistory } from 'react-router-dom';
import { LogInOut } from './LogInOut';

export const Header = () => {
const history = useHistory()
    return (
        <div onClick={() => history.push('../../')}>
            <img src={HeaderBar} style={{width: "100%", maxHeight: "150px", position: "absolute"}}/>
            
            <h1 style={{color: "white", position: "absolute", top: "-30px", left: "20px", fontWeight: "normal", fontSize: "50px"}}>Gym Bud</h1>


            <LogInOut />



            
        </div>
    )
}

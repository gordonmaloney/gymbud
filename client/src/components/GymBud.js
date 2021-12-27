import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { Timeline } from './Timeline'

export const GymBud = () => {
    return (
        <div style={{display: "flex", width: "100vw", height: "100vh", maxHeight: "100vh", overflowX: "hidden", overflowY: "auto"}}>

            <Header />
            
            <Timeline />


            <Footer />
        </div>
    )
}

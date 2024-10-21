import React from "react";
import winedroplogo from './assets/images.jfif'

function Header (){
    return(

    <div className="bg-teal-600 container  top-0 left-0 h-20 w-full flex items-center  px-4">
        <div className="container flex items-center">
            <img src={winedroplogo} className="h-12 w-auto"></img>
            <h1 className="font-semibold text-2xl text-white  text-left p-4">Sales Dashboard </h1>

        </div>
          
                
       
   
</div>
    )
} 

export default Header
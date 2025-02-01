import React from 'react'

function Loader() {
    return (
    <div className='flex justify-center items-center h-screen'>
    <div className="loader-wrapper">
    <div className="packman"></div>
    <div className="dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
    </div>
    </div>
    </div>
  )
}

export default Loader
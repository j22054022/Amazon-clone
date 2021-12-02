import React from 'react';
import "./Popup.css";

const Popup = ({title, price, img}) => {
    console.log('popup', title, price, img);

    return (
        <div className='popup'>
            <p>Chart Added!</p>
            {/* <div className="popup__title">{title}</div> */}
            <div className="popup__img"><img src={img} alt='img'></img></div>
            <div className="popup__price">{'$' + price}</div>
        </div>
    )
}

export default Popup;

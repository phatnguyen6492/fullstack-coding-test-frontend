import React from 'react';
// import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import {Popup} from 'reactjs-popup';
import './DeliveryStatusPicker.css'

const DeliveryStatusPicker = ({productId, callback}) => {
  const status = ['PENDING', 'ORDERED', 'SHIPPED', 'CANCEL'];
  const changeStatus = (val) => {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open(
      "PATCH",
      `http://localhost:3000/product/${productId}`,
      true
    );

//Send the proper header information along with the request
    httpRequest.setRequestHeader("Content-Type", "application/json");

    httpRequest.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        if (callback) {
          callback();
        }
      }
    }
    httpRequest.send(JSON.stringify({delivery_status: val}));
  }
  return (
    <Popup
      className="delivery-status-picker"
      trigger={open => (
        <button className="delivery-status-picker-button">Change Status</button>
      )}
      position="bottom center"
      closeOnDocumentClick
    >
      <div className="delivery-status-picker-menu">
        {status && status.map(item => (
          <div className="menu-item" key={item} onClick={()=> changeStatus(item)}>{item}</div>
        ))}
      </div>
    </Popup>
  );
};

// function handleSelection(value, event) {}

export default DeliveryStatusPicker;
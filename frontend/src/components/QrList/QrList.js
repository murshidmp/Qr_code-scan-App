// src/components/QrList.js
import { useEffect, useState } from "react";
import React from "react";

// import './QrList.css'
import axios from 'axios';

function QrList(props) {
console.log(props)
// const qrCodes = props.data;


const [qrCodes, setQrCodes] = useState([]);

  useEffect(() => {
    // Fetch the list of QR codes from your backend API
    axios.get('http://localhost:3001/qrcodes')
      .then((response) => {
        setQrCodes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching QR codes:', error);
      });
  });
const handleDelete = (id) => {
  // Implement the logic to delete a specific QR code entry
  axios.delete(`http://localhost:3001/qrcodes/${id}`)
    .then(() => {
      // Update the QR codes list after deletion
      const updatedCodes = qrCodes.filter((code) => code.id !== id);
      setQrCodes(updatedCodes);
    })
    .catch((error) => {
      console.error('Error deleting QR code:', error);
    });
};

  return (
    <div className="qr-list-container">
      <h2>Saved QR Codes</h2>
      <ul>
        {qrCodes.map((qrCode) => (
          <li key={qrCode.id} className="qr-code-item">
            <p>Content: {qrCode.content}</p>
            <p>Scan Date: {qrCode.scan_date}</p>
            <p>Thumbnail: {qrCode.thumbnail}</p>
            <button onClick={() => handleDelete(qrCode.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QrList;

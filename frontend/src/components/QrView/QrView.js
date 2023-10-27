import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

function QrView() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    let isScanning = true;

    scanner.render(success, error);

    function success(result) {
      if (isScanning) {
        scanner.clear();
        setScanResult(result);
        isScanning = false; // Set isScanning to false to stop further scanning
      }
    }

    function error(err) {
      console.warn(err);
    }
  }, []);
  function storeData() {
    axios.post("http://localhost:3001/qrcodes", { content: scanResult });
  }
  return (
    <div className="QrView">
      <h1>QR Scanning Code</h1>
      {scanResult ? (
        <div>
          <p>
            Content: <span>{scanResult}</span>
          </p>
          <button onClick={storeData}>Store</button>
        </div>
      ) : (
        <div>
          <div id="reader"></div>
        </div>
      )}
    </div>
  );
}

export default QrView;

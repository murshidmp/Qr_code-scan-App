import React, { useEffect, useState } from "react";
import "./App.css";
import QrList from "./components/QrList/QrList";
import QrView from "./components/QrView/QrView";
import axios from "axios";
import Login from "./components/Login/Login";

function App() {
  const [qrList, setQrList] = useState([]);
  const [isQrview, setIsQrview] = useState(true);
  const [buttonName, setButtonName] = useState("show qr codes");
  const [isLogin, setIsLogin] = useState(false);


  useEffect(() => {
    const cookieString = document.cookie;
    const cookieArray = cookieString.split("; ");
    for (const cookie of cookieArray) {
      if (cookie.startsWith("jwt=")) {
        setIsLogin(true);
      }
    }
  }, []);

  function switchView() {
    setIsQrview((state) => !state);
    setButtonName((name) => {
      if (name === "show qr codes") return "scan now";
      else return "show qr codes";
    });
  }

  function qrListView() {
    document.querySelector("body").style.display = "block";
    return <QrList />;
  }
  function qrScanview() {
    document.querySelector("body").style.display = "flex";
    return <QrView />;
  }
  return (
    <div className="App">
      {!isLogin ? (
        <Login isLoginfn={setIsLogin} />
      ) : (
        <>
          <button onClick={switchView}>{buttonName}</button>

          {isQrview ? qrScanview() : qrListView()}
        </>
      )}
    </div>
  );
}

export default App;

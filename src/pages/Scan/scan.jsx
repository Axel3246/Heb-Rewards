
import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default function App() {
  const [data, setData] = useState("Capture : ...");
  const [show, setShow] = useState(false);

  const onUpdateScreen = (err, result) => {
    if (result) {
      setData(result.text);
      setShow(false);
    } else {
      setData("Not Found");
    }
  };

  return (
    <div className="App">
      <h1>Scan BarCode</h1>

      <>
        {show && (
          <BarcodeScannerComponent
            width={400}
            height={400}
            onUpdate={(err, result) => onUpdateScreen(err, result)}
          />
        )}
        <p>{data}</p>
      </>
      <div>
        <button onClick={() => setShow(true)}> Capture </button>
      </div>
    </div>
  );
}

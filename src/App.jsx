import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { firestore } from "./firebaseConfig";

function App() {
  const [count, setCount] = useState(0);
  const [value, loading, error] = useDocument(
    doc(firestore, "dustbins", "bin1")
  );
  useEffect(() => {
    console.log(value);
  }, [value]);

  const getData = () => {
    fetch("http://192.168.29.208:3000/binfull", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="App">
      <h1>Dustbin Monitor</h1>
      <button onClick={getData}></button>
      <div className="card">
        <p>Bin1 - </p>
        {!loading && (
          <p>&nbsp;{value.data()["full"] == true ? "Full" : "Empty"}</p>
        )}
      </div>
    </div>
  );
}

export default App;

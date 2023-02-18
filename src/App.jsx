import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { firestore } from "./firebaseConfig";
import sweet from "./assets/sweet.mp3";

function App() {
  const [count, setCount] = useState(0);
  const audio = useRef(null);

  const [value, loading, error] = useDocument(
    doc(firestore, "dustbins", "bin1")
  );
  useEffect(() => {
    console.log(value);
    if (!loading) {
      if (value.data()["full"] == true) {
        audio.current.play();
      } else {
        audio.current.pause();
        audio.current.currentTime = 0;
      }
    }
  }, [value]);

  const getData = () => {
    fetch("dustbinmonitor.ap-1.evennode.com/binfull", {
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
        <audio src={sweet} ref={audio} />
      </div>
    </div>
  );
}

export default App;

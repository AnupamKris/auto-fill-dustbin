import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { firestore } from "./firebaseConfig";
import sweet from "./assets/sweet.mp3";
import "./dustbin.scss";
import NotifPanel from "./NotifPanel";

function App() {
  const [count, setCount] = useState(0);
  const audio = useRef(null);
  const [showNotif, setShowNotif] = useState(false);

  const [value, loading, error] = useDocument(
    doc(firestore, "dustbins", "bin1")
  );
  useEffect(() => {
    console.log(value);
    if (!loading) {
      if (value.data()["full"] == true) {
        audio.current.play();
        setShowNotif(true);
      } else {
        setShowNotif(false);
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
      {showNotif && <NotifPanel setShowNotif={setShowNotif} />}
      {/* <button onClick={() => setShowNotif(!showNotif)}>Notif</button> */}
      <h1>Dustbin Monitor</h1>
      <audio src={sweet} ref={audio} />
      <div className="card">
        <p class="text">Bin 1</p>
        {!loading && (
          <p class={"status " + (value.data()["full"] == true ? "full" : "")}>
            {value.data()["full"] == true ? "Full" : "Empty"}
          </p>
        )}
      </div>
      <div className="card">
        <p class="text">Bin 2</p>
        <p className="status">Empty</p>
      </div>
      <div className="card">
        <p class="text">Bin 3</p>
        <p className="status">Empty</p>
      </div>
      <div className="card">
        <p class="text">Bin 4</p>
        <p className="status">Empty</p>
      </div>
    </div>
  );
}

export default App;

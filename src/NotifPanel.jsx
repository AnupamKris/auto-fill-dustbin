import React from "react";

const NotifPanel = ({ setShowNotif }) => {
  const closeNotif = () => {
    setShowNotif(false);
  };

  return (
    <div className="notification">
      <h1>Bin Status</h1>
      <h3>Bin 1 Full</h3>
      <div className="close" onClick={closeNotif}>
        <ion-icon name="close-outline"></ion-icon>
      </div>
      <div className="icon">
        <ion-icon name="trash-outline"></ion-icon>
      </div>
    </div>
  );
};

export default NotifPanel;

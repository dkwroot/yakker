import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const bgStyle = {
  background: "url(https://i.ibb.co/J3jtvVm/45789228571-77d8a546fc-b-2.jpg)",
  backgroundPosition: "top",
  backgroundSize: "cover"
};

const About = () => {
  return (
    <div className="theme-blue text-dark overflow section-95">
      <div className="row" style={{ height: "400px" }}>
        <div style={bgStyle} className="col d-none d-sm-block" />
        <div className="col bg-light flex-col center p-4">
          <h2>Yakker</h2>
          <hr className="bg-dark hr-line" />
          <div>
            The simple social media site dedicated to the privacy and security
            of your personal data.
          </div>
        </div>
      </div>
      <div className="row text-white d-flex my-2">
        <div className="col-12 col-sm-4 flex-col bg-secondary center p-2 flex-grow-1 border">
          <FontAwesomeIcon className="display-2" icon={"handshake"} />
          <h3>Security</h3>
          <hr className="hr-line bg-white" />
          <p>
            At Yakker we are committed to the security of your personal data.
          </p>
        </div>
        <div className="col-12 col-sm-4 flex-col bg-secondary center p-2 flex-grow-1 border">
          <FontAwesomeIcon className="display-2" icon={"user-secret"} />
          <h3>Anonamous</h3>
          <hr className="hr-line bg-white" />
          <p>
            Share only what you want. Your personal information will never be
            required.
          </p>
        </div>
        <div className="col-12 col-sm-4 flex-col bg-secondary center p-2 flex-grow-1 border">
          <FontAwesomeIcon className="display-2" icon={"sticky-note"} />
          <h3>Feature</h3>
          <hr className="hr-line bg-white" />
          <p>
            Enjoy a full featured user experience. It's all the fun without the
            intrusiveness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

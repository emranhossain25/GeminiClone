import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/aassets";
import { Context } from "../../context/Context";
const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPromt,newChat } = useContext(Context);

  const loadPrompt = async (prompt) =>{ // create a asyc function for save promt link up in the prompt

    setRecentPromt(prompt);
    await onSent(prompt);
  }
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((previsTrue) => !previsTrue)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={ ()=> newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={()=>loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0,20)}...</p>
                </div>
              );
            })}
            {/* <div className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>What is react...</p>
                </div> */}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Context } from "../context/userContext";
import { domain } from "../utils/Utils";
import axios from "axios";
import {
  FaArrowAltCircleLeft,
  FaCommentMedical,
  FaLongArrowAltLeft,
} from "react-icons/fa";
// import { fetchMessages, validateFile } from "../utils/photosVald";
import "./send.scss";
import Message from "./Message";

const UserPage = () => {
  const { user, ideas } = useContext(Context);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [showMsg, setShowMsg] = useState(false);
  const [userPageDetials, setUserPageDetials] = useState({});
  const userideas = ideas.filter((data) => data?.username === state?.username);
  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${domain}/user/${state?.user_id}`, {
        headers: { Authorization: `${user.token}` },
      });
      const details = await res.data;
      setUserPageDetials(details);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
    setUserData(userideas);
  }, []);
  return (
    <>
      <div className="user__page">
        {showMsg && (
          <SendMessages userPageDetials={userPageDetials} userData={userData} />
        )}
        <div className="user__page-detials">
          <div className="user__part">
            <span>Name:</span>
            <h2>{userPageDetials?.username}</h2>
            <span>Location:</span>
            <h5>{userPageDetials?.user_location}</h5>
            <span>Bio:</span>
            <p>{userPageDetials?.user_bio}</p>
          </div>
          <div className="user__photo">
            <img
              src={`${domain}/uploads/${userPageDetials.user_image}`}
              alt=""
            />
          </div>
        </div>
        <div className="user__page-buttons">
          <button className="sp__btn">
            <Link to="/app">
              <FaArrowAltCircleLeft /> app
            </Link>
          </button>
          <button>followers</button>
          <button>ideas</button>
          <button>comments</button>
          <button onClick={() => setShowMsg(true)}>
            <FaCommentMedical /> message
          </button>
        </div>
        <div className="user__page-ideas">
          {userData.map((userd) => (
            <div className="user__page-ideas--idea">
              <div className="uum">
                <div className="u">
                  <div className="ph">
                    <img
                      src={`${domain}/uploads/${userd?.user_image}`}
                      alt={userd?.username}
                    />
                  </div>
                  <div className="up">
                    <h3>{userd?.username}</h3>
                    <span>{userd?.user_domain}</span>
                  </div>
                </div>
                <div className="um-r">
                  <h2>{userd?.idea_title}</h2>
                  <p>
                    {userd?.idea_text.slice(0, 100)}{" "}
                    <Link to="/app/readmore">read more</Link>
                  </p>
                </div>
              </div>
              <div className="um">
                <img
                  src={`${domain}/uploads/${userd?.idea_img}`}
                  alt={userd?.idea_title}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
//send messages component
const SendMessages = ({ userPageDetials, userData }) => {
  const { user } = useContext(Context);
  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (validTypes.indexOf(file.type) === -1) {
      alert("File format is incorrect use .jpeg, .png or .jpg");
    } else if (file.size > 1024 * 1024 * 5) {
      alert("File size is too large");
    } else {
      return true;
    }
  };
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${domain}/messages`, {
        headers: { Authorization: `${user?.token}` },
      });
      const messages = await res.data;
      setMessages(messages);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  const [file, setFile] = useState(null);
  const [msg_content, setMsgContent] = useState("");
  const [messages, setMessages] = useState([]);
  // const messages = fetchMessages()

  // console.log(messages)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image");
    } else {
      validateFile(file);
      let msg_image = Date.now() + file.name;
      const formData = new FormData();
      formData.append("sender_id", user?.user_id);
      formData.append("receiver_id", userPageDetials?.user_id);
      formData.append("idea_id", userData[0]?.idea_id);
      formData.append("msg_image", msg_image);
      formData.append("msg_content", msg_content);
      formData.append("file", file);

      try {
        const res = await axios.post(`${domain}/messages`, formData, {
          headers: { Authorization: `${user?.token}` },
        });
        const data = await res.data.message;
        alert(data);
        console.log(res);
        setFile("")
        setMsgContent("")
      } catch (error) {
        console.log(error);
      }
    }
    await fetchMessages();
  };
  const msg = messages.filter((msgs) => msgs.sender_id === user?.user_id);
  const msg2 = messages.filter((msgs) => msgs.sender_id !== user?.user_id);

  return (
    <div className="m">
      <div className="m_bar">
        <div className="m_bar-useritro">
          <h1>{userPageDetials?.username}</h1>
          <p>Your Conversation with @{userPageDetials?.username}</p>
        </div>
        <div className="m_bar-userimage">
          <img
            width={50}
            height={50}
            src={`${domain}/uploads/${userPageDetials?.user_image}`}
            alt="user image"
          />
        </div>
      </div>
      <em className="m_t">{userData[0]?.idea_title}</em>
      {/* //messages component   */}
      <div className="m_s">
        {<Message key={msg.msg_id} msg={msg} />}
        {/* //messages from receiver */}
        {msg2.map((m) => (
          <div key={m.msg_id} className="m_messages">
            <div className="m_messages-ui">
            <img
              width={30}
              height={30}
              src={`${domain}/uploads/${m?.receiver_image}`}
              alt="message image"
            />
            </div>
            <div className="m_messages-msg">
              <p>{m?.msg_content}</p>
            </div>
            <div className="m_messages-image">
              <img
                width={30}
                height={30}
                src={`${domain}/uploads/${m?.msg_image}`}
                alt="message image"
              />
            </div>
          </div>
        ))}
      </div>
      <form className="m_form" onSubmit={handleSubmit}>
        <div className="m_form-image">
          <label htmlFor="msg_image">Click to Add image</label>
          <input
            style={{ display: "none" }}
            type="file"
            name="msg_image"
            id="msg_image"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="m_form-text">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={msg_content}
            onChange={(e) => setMsgContent(e.target.value)}
          ></textarea>
          <input className="m_form-btn" type="submit"  value="Send" />
        </div>
      </form>
    </div>
  );
};

export default UserPage;

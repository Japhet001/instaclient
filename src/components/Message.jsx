import React, { useEffect } from "react";
import { domain } from "../utils/Utils";

const Message = ({ msg }) => {
  useEffect(() => {
    console.log(msg);
  }, []);
  return (
    <>
      {msg.map((m) => (
        <div key={m.msg_id} className="m_messages">
          <div className="m_messages-ui">
          <img
              width={30}
              height={30}
              src={`${domain}/uploads/${m?.sender_image}`}
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

    </>
  );
};

export default Message;

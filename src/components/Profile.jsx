import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import NoIdeas from "./noPosts";
import { Context } from "../context/userContext";
import { domain } from "../utils/Utils";

const Profile = () => {
  const { user, ideas } = useContext(Context);
  const [update, setUpdate] = useState(false);
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  const [user_bio, setBio] = useState("");
  const [user_phone, setPhone] = useState("");
  const [user_domain, setDomain] = useState("");
  const [user_email, setEmail] = useState("");
  const [user_location, setLocation] = useState("");

  const myt = ideas.map((t) => t).filter((te) => te.username === user.username);
  //   let userData;

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${domain}/user/${user.user_id}`, {
        headers: { Authorization: `${user.token}` },
      });
      const userd = await res.data;
      setUserData(userd);
      console.log(userData);
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchUserData();
    setBio(userData?.user_bio);
    setUsername(userData?.username);
    setDomain(userData?.user_domain);
    setPhone(userData?.user_phone);
    setEmail(userData?.user_email);
    setLocation(userData?.user_location);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user?.token) {
        const res = await axios.put(
          `${domain}/user/${user.user_id}`,
          {
            username: username,
            user_email: user_email,
            user_bio: user_bio,
            user_phone: user_phone,
            user_domain: user_domain,
            user_location: user_location,
          },
          {
            headers: { Authorization: `${user.token}` },
          }
        );
        const message = await res.data;
        alert(message);
        setUpdate(false);
        await fetchUserData();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {" "}
      <div className="profile">
        <div className="profile-intro">
          <span>{user.username.split(" ")[0]}@metanstagram</span>
        </div>
        <div className="profile-bio">
          <div className="user_info">
            <img
              className="user_icon"
              width={50}
              height={50}
              src={`${domain}/uploads/${user?.user_image}`}
            />
            <div>
              <form onSubmit={handleSubmit} className="user__data">
              <div className="user__data-content">
                  <h3>Name</h3>
                  <span>{userData?.username}</span>
                  {update && (
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  )}
                </div>
                <div className="user__data-content">
                  <h3>Email</h3>
                  <span>{userData?.user_email}</span>
                  {update && (
                    <input
                      type="text"
                      name="user_email"
                      value={user_email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  )}
                </div>
                <div className="user__data-content">
                  <h3>Phone</h3>
                  <span>{userData?.user_phone ?? `null`}</span>
                  {update && (
                    <input
                      type="text"
                      name="user_phone"
                      value={user_phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  )}
                </div>
                <div className="user__data-content">
                  <h3>Domain</h3>
                  <span>{userData?.user_domain ?? `null`}</span>
                  {update && (
                    <input
                      type="text"
                      name="user_domain"
                      value={user_domain}
                      onChange={(e) => setDomain(e.target.value)}
                    />
                  )}
                </div>
                <div className="user__data-content">
                  <h3>Location</h3>
                  <span>{userData?.user_location ?? `null`}</span>
                  {update && (
                    <input
                      type="text"
                      name="user_location"
                      value={user_location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  )}
                </div>
                <div className="user__data-content ">
                  <h3>Bio</h3>
                  <span className="userbio">{userData?.user_bio ?? `null`}</span>
                  {update && (
                    <textarea
                    name="user_bio"
                      value={user_bio}
                      onChange={(e) => setBio(e.target.value)}
                     ></textarea>
                  )}
                </div>
                {update &&<input className="pro_btn" type="submit" value="Update" />}
              </form>
            </div>
          </div>
          <div className="user_ideas">
            <button onClick={() => setUpdate(true)}>Update Your Instagram Profile</button>
            <h2>Posts Shared here on Meta Instagram</h2>
            {myt.length ? (
              myt.map((text) => (
                <div key={text.idea_title} className="idea">
                  <h3>{text.idea_title}</h3>
                  <p>{text.idea_text.slice(0, 100)}...</p>
                  <span>
                    <img
                      width={25}
                      height={25}
                      className="idea__icon"
                      src={`${domain}/uploads/${user?.user_image}`}
                    />
                    <em>{text.username}</em>
                  </span>
                </div>
              ))
            ) : (
              <NoIdeas />
            )}
          </div>
        </div>
      </div>
      {/* <Loader error={error} loading={loading} load={load}/> */}
    </>
  );
};

export default Profile;

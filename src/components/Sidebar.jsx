import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/userContext";
import { FaHome, FaUsers, FaVoteYea, FaConfluence, FaLongArrowAltUp,FaShareAlt } from "react-icons/fa";
import { AiOutlineHome, AiOutlineMessage, AiOutlineHeart, AiOutlineArrowDown } from "react-icons/ai";
import { BsSearch, BsFillCircleFill } from "react-icons/bs";
import { MdExplore, MdOutlineOndemandVideo } from "react-icons/md";


import { Link } from "react-router-dom";

const Sidebar = ({ setToggleLogin }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(Context);

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="b__sidebar">
      <div className="b__sidebar-button">
        <button className="active-btn">
          <AiOutlineHome className="btn-symbol" />
          <Link to="/" className="b__sidebar-button--text">
            Home
          </Link>
        </button>
      </div>
      <div className="b__sidebar-button">
        <button className="active-btn">
          <BsSearch className="btn-symbol" />
          <Link to="/" className="b__sidebar-button--text">
            Search
          </Link>
        </button>
      </div>
      <div className="b__sidebar-button">
        <button className="active-btn">
          <MdExplore className="btn-symbol" />
          <Link to="/" className="b__sidebar-button--text">
            Explore
          </Link>
        </button>
      </div>
      <div className="b__sidebar-button">
        <button className="active-btn">
          <MdOutlineOndemandVideo className="btn-symbol" />
          <Link to="/" className="b__sidebar-button--text">
            Reels
          </Link>
        </button>
      </div>
      <div className="b__sidebar-button">
        <button className="active-btn">
          <AiOutlineMessage className="btn-symbol" />
          <Link to="/Message" className="b__sidebar-button--text">
            Messages
          </Link>
        </button>
      </div>
      <div className="b__sidebar-button">
        <button className="active-btn">
          <AiOutlineHeart className="btn-symbol" />
          <Link to="/" className="b__sidebar-button--text">
            Notifications
          </Link>
        </button>
      </div>
      <div className="b__sidebar-button">
        <button className="active-btn">
          <AiOutlineHome className="btn-symbol" />
          <Link to="/AddPost" className="b__sidebar-button--text">
            Create
          </Link>
        </button>
      </div>
      <div className="b__sidebar-button">
        <button className="active-btn">
          <BsFillCircleFill className="btn-symbol" />
          <Link to="/profile" className="b__sidebar-button--text">
            Profile
          </Link>
        </button>
      </div>
      <div className="b__sidebar-button">
        <button>
          <FaLongArrowAltUp className="btn-symbol" />
          <span onClick={()=> logout()} className="b__sidebar-button--text">Logout</span>
          <AiOutlineArrowDown className="btn-symbol" />
          <Link to="/login"  className="b__sidebar-button--text" 
          onClick={()=> setToggleLogin(true)}
          >Login</Link>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

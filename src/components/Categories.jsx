import React from "react";
import Footer from "../Footer";
import {FaMusic, FaBusinessTime, FaHistory} from "react-icons/fa";
import {BsBookHalf} from "react-icons/bs"; 
import {ImLab} from "react-icons/im";
import { Link, NavLink } from "react-router-dom";

const Categories = () => {
  return (
    <div className="b__categories">
      <div className="b__categories-header">What do you like to research here on Instagram?</div>
      <div className="b__category">
     
      <div className="b__sidebar-button">
        <button className="active-btn">
          <FaMusic className="btn-symbol" />
          <Link to="/" className="b__sidebar-button--text">
            Music
          </Link>
        </button>
      </div>
      <div className="b__sidebar-button">
        <button className="active-btn">
          <BsBookHalf className="btn-symbol" />
          <Link to="/" className="b__sidebar-button--text">
            Education
          </Link>
        </button>
      </div>
      <div className="b__sidebar-button">
        <button className="active-btn">
          <FaBusinessTime className="btn-symbol" />
          <Link to="/" className="b__sidebar-button--text">
            Business
          </Link>
        </button>
      </div>
      <div className="b__sidebar-button">
        <button className="active-btn">
          <ImLab className="btn-symbol" />
          <Link to="/" className="b__sidebar-button--text">
            Science
          </Link>
        </button>
      </div>
      <div className="b__sidebar-button">
        <button className="active-btn">
          <FaHistory className="btn-symbol" />
          <Link to="/" className="b__sidebar-button--text">
           History
          </Link>
        </button>
      </div>
      
        <button className="b__category-btn">About</button>
        <button className="b__category-btn">Help</button>
        <button className="b__category-btn">API</button>
        <button className="b__category-btn">Locations</button>
        <button className="b__category-btn">Language</button>
        <button className="b__category-btn">Privacy Terms</button>
        <button className="b__category-btn">Fashion collection</button>
      </div>

      <Footer />
    </div>
  );
};

export default Categories;

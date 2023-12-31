import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ideasPhoto from "../images/post-1.jpg";
import userimage from "../images/user-1.jpg";
import Reactions from "./Reactions";
import Comments from "./Comments";
import UpdateIdea from "./UpdatePost";
import { Context } from "../context/userContext";
import noimage from '../images/placeholder.jpeg';
import { domain } from "../utils/Utils";

const Idea = ({ idea }) => {
  const { user,fetchAllIdeas } = useContext(Context);
  const navigate = useNavigate()
  const [toggleComments, setToggleComments] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const showComments = () => {
    setToggleComments(!toggleComments);
  };
  const goReadMore = (idea) => {
    navigate("./readmore",{state: idea})
  };
  const goToUserPage = (idea) => {
    navigate("/userpage",{state: idea})
  };
  // console.log(idea)
  const showUpdateForm = (id) => {
    setToggleUpdate(true);
  };
  // ideas.map((ideas)=>)
  return (
    <div key={idea?.idea_id} className="b__idea">
      <Reactions
        fetchIdeas={fetchAllIdeas}
        user={user}
        idea={idea}
        showComments={showComments}
        showUpdateForm={showUpdateForm}
      />
      {toggleUpdate && idea?.idea_id ? (
        <UpdateIdea
          setToggleUpdate={setToggleUpdate}
          idea={idea}
          fetchIdeas={fetchAllIdeas}
        />
      ) : null}
      <div className="b__idea-image">
        <img src={`${domain}/uploads/${idea?.idea_img}`} alt="photo" />
      </div>
      <div className="b__idea-user">
        <div className="b__user">
          <div style={{cursor:"pointer"}} className="b__user-img" onClick={()=> goToUserPage(idea)}>
            <img  className="user__icon"  src={`${domain}/uploads/${idea?.user_image}`} />
          </div>
          <div className="b__user-details">
            <h3>{idea?.username}</h3>
            <span className="user__domain">{idea?.user_domain}</span>
          </div>
        </div>
        <div className="b__idea-a">
          <h2>{idea?.idea_title}</h2>
          <p>{idea?.idea_text.slice(0,255) || <span>no content</span> }<span onClick={()=> goReadMore(idea)} className="read_url" >...</span></p>
          <span>{idea?.created_at?.data}</span>
        </div>
      </div>
      <div className="b__idea-votes">
        <span>{idea?.votes}</span>
      </div>
      {toggleComments && idea?.idea_id && (
        <Comments user={user} idea_id={idea?.idea_id} />
      )}
    </div>
  );
};

export default Idea;

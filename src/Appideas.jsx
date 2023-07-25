import Idea from "./components/Post";
import Ideas from "./components/Post";

const Appideas = ({ideas, fetchIdeas}) => {

    return (
    <div className="b__ideas">
    {ideas.map((idea) => (
      <Idea key={idea?.idea_id} idea={idea} fetchIdeas={fetchIdeas}/>
    ))}
  </div>)
};

export default Appideas;

import React from "react";
import DeleteBtn from "../../components/DeleteBtn";
import { Link } from "react-router-dom";

const Accordion = props => (
  <div>
    <div className="accordion" id="accordionExample">
      {props.collection.map(game => (
        <div key={game._id} className="card">
          <div className="card-header" id="headingOne" style={{backgroundColor:"#22b24c"}}>
            <h5 className="mb-0">
              <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{color:"white"}}>
                <Link to={"/games/" + game._id}>
                  {game.name}
                </Link>
              </button>
            </h5>
          </div>
          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div className="card-body">
                <p> {game.releaseDate} </p>
                <p> {game.summary} </p>                        
                <p> Description goes here.</p>
              <DeleteBtn onClick={() => props.handleDelete(game._id)} />
            </div>
          </div>
        </div>   
      ))}
    </div>

  </div>
);

export default Accordion;

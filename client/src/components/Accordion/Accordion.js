import React from "react";
import DeleteBtn from "../../components/DeleteBtn";

const Accordion = props => (
  <div>
    <div className="accordion" id="accordionExample">
      {props.collection.map(game => (
        <div className="card">
          <div className="card-header" id="headingOne" style={{backgroundColor:"#22b24c"}}>
            <h5 className="mb-0">
              <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{color:"white"}}>
                {game.name}
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

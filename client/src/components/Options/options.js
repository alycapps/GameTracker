import React from "react";
import { Link } from "react-router-dom";

const Options = props => (
  <div>
   <div className="accordion" id="accordionExample">
      {props.collection.map(response => (
        <div className="card">
          <div className="card-header" id="headingOne" style={{backgroundColor:"#22b24c"}}>
            <h5 className="mb-0">
              <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{color:"white"}}>
                <Link to={"/games/" + response.id}>
                  {response.name}
                </Link>
              </button>
            </h5>
          </div>
          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div className="card-body">
                <p> {response.url} </p>
                <p> {response.summary} </p>                        
              <button onClick={() => props.handleSave(response.id)} className="btn btn-link btn-success" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{backgroundColor:"rgb(34, 178, 76)", color:"white"}}>
                Save
              </button>
            </div>
          </div>
        </div>   
      ))}
    </div>
  </div>
);

export default Options;

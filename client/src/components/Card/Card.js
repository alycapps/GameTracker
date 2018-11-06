import React from "react";

export const Card = (props) => (
  <div className="card">
    <div className="card-header bg-warning" style={{color:"#22b24c"}}>
      <h5>{props.title}</h5>
    </div>
    <div className="card-body">
      {props.children}
    </div>
  </div>
);

import React from "react";
import DeleteBtn from "../../components/DeleteBtn";
// import { Link } from "react-router-dom";

const Table = props => (
  <div>
    <div className="accordion" id="accordionExample">
      {props.collection.map(game => (

        <div>
          <thead>
            <tr>
              <th scope="col">System</th>
              <th scope="col">Game</th>
              <th scope="col">Price</th>
              <th scope="col">Notes</th>
              <th scope="col">Delete</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <th key={game._id} scope="row">{game.system}NES</th>
              <td>{game.name}</td>
              <td>{game.price}$3</td>
              <td>{game.notes}n/a</td>
              <td>
                <DeleteBtn onClick={() => props.handleDelete(game._id)} />
              </td>
            </tr>
          </tbody>
         
        </div>   
      ))}
    </div>

  </div>
);

export default Table;

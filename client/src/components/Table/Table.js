import React from "react";
import DeleteBtn from "../../components/DeleteBtn";

const Table = props => (
  <div>
    <table className="table">
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
        {props.collection.map(game => (
            <tr>
              <th key={game._id} scope="row">{game.system}NES</th>
              <td>{game.name}</td>
              <td>{game.price}$3</td>
              <td>{game.notes}n/a</td>
              <td>
                <DeleteBtn onClick={() => props.handleDelete(game._id)} />
              </td>
            </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
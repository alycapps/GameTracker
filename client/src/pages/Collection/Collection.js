import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import Table from "../../components/Table"

class Collection extends Component {
  state = {
    games: []
  };

  componentDidMount() {
    this.loadGames();
  }

  // function to load all games saved in mongo
  loadGames = () => {
    API.getGames()
    .then(res =>
      this.setState({ games: res.data })
    )
    .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
              <h1 style={{textAlign:"center"}}>
                My Collection
              </h1>
          </Col>
        </Row>

        <Row>
          <Col size="md-3">
          </Col>
          
          <Col size="md-6">
            <table class="table">
              {/* <thead>
                <tr>
                  <th scope="col">System</th>
                  <th scope="col">Game</th>
                  <th scope="col">Price</th>
                  <th scope="col">Notes</th>
                  <th scope="col">Delete</th>

                </tr>
              </thead> */}
              {/* <tbody> */}
                <Table
                  collection={this.state.games}
                >
                </Table>
                {/* <tr>
                  <th scope="row">NES</th>
                  <td>10-Yard Fight</td>
                  <td>$8.50</td>
                  <td>In good condition</td>
                  <td>x</td>
                </tr>
                <tr>
                  <th scope="row">GCN</th>
                  <td>1080 Avalanche</td>
                  <td>$12.00</td>
                  <td>2 copies</td>
                </tr>
                <tr>
                <th scope="row">PS3</th>
                  <td>3D Dot Game Heroes</td>
                  <td>$1.00</td>
                  <td></td>
                </tr> */}
              {/* </tbody> */}
            </table>
          </Col>
          <Col size="md-3">
          </Col>
        </Row>
      </Container>

    );
  }
}

export default Collection;
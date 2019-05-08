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
            <Table
              collection={this.state.games}
            >
            </Table>
          </Col>
          
          <Col size="md-3">
          </Col>
        </Row>
      </Container>

    );
  }
}

export default Collection;
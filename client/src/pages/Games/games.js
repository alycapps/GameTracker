import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";

class Games extends Component {
  state = {
    games: [],
    name: "",
    system: "",
    description: ""
  };

  componentDidMount() {
    
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Current Collection</h1>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Games;

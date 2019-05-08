import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

class Add extends Component {
  state = {
    game: {}
  };
  // When this component mounts, grab the game with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getGame(this.props.match.params.id)
      .then(res => this.setState({ game: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>

        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Add
              </h1>
            </Jumbotron>
          </Col>
        </Row>
       
        <Row>
          <Col size="md-2">
            <Link to="/collection">← Back to Collection</Link>
          </Col>
        </Row>

      </Container>
    );
  }
}

export default Add;
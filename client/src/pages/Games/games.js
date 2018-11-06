import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import igdb from "igdb-api-node";

class Games extends Component {
  state = {
    games: [],
    id: "",
    name: "",
    platforms: "",
    summary: "",
    releaseDate: ""
  };

  componentDidMount() {
    
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let vg = this.state.name;
    console.log(vg);
    console.log("handleformsubmit ran");
    const client = igdb('b0e6353cdadb85ab1d11bcc5341f5963');
    console.log(client);
    console.log("client");
    
    client.games({
      fields: '*', // Return all fields
      limit: 5, // Limit to 5 results
      search: vg
    }).then(response => {
      // response.body contains the parsed JSON response to this query
      console.log(response.body)
    }).catch(error => {
      throw error;
    });
  };

  render() {
    return (
      <Container fluid>
        <br></br>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Add a new game.</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Game Name"
              />
              <FormBtn
                onClick={this.handleFormSubmit}
              >
                Find Game
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">

            <Jumbotron>
              <h1>My Collection</h1>
            </Jumbotron>
            {this.state.games.length ? (
              <List>
                {this.state.games.map(game => (
                  <ListItem key={game._id}>
                    <Link to={"/games/" + game._id}>
                      <strong>
                        {game.name} -- {game.summary}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(game._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>

    );
  }
}

export default Games;

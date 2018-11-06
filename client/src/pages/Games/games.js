import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";

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
    var searchterm = this.state.name;
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://api-endpoint.igdb.com/games/?search=' + searchterm + '&fields=*&limit=5"'
    fetch(proxyUrl + targetUrl, {
      headers: {
        'user-key': 'b0e6353cdadb85ab1d11bcc5341f5963',
        'Accept': 'application/json'
      }
    })
      .then(blob => blob.json())
      .then(data => {
        console.log(data)
        let div = document.getElementById('searchResults')
        div.innerHTML += " <h3>Select the game you are looking for.</h3> <p>If none of these look correct try modifying your search.</p>"
        data.forEach(g => {
          div.innerHTML += JSON.stringify(g.name);
        });
        return data;
      })
      .catch(e => {
        console.log(e);
        return e;
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
            <br></br>
            <br></br>
            <div id="searchResults">
      
            </div>
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

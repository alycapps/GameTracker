import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import Accordion from "../../components/Accordion"
import Options from "../../components/Options"

class Games extends Component {
  state = {
    games: [],
    id: "",
    name: "",
    platforms: "",
    summary: "",
    releaseDate: "",
    options: []
  };

  componentDidMount() {
    this.loadGames();
  };

  // function to change state to value changed
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // function to delete game
  handleDeleteGame = id => {
    API.deleteGame(id)
      .then(res => this.loadGames())
      .catch(err => console.log(err));
  };

  // function to load all games saved in mongo
  loadGames = () => {
    API.getGames()
    .then(res =>
      this.setState({ games: res.data })
    )
    .catch(err => console.log(err));
  };

  // function to save new game to mongo
  savetoMongo = id => {
    this.state.options.map( x => {
      if(x.id == id) {
      API.saveGame({
        name: x.name,
        id: x.id,
        url: x.url,
        summary: x.summary
      }).then(res => this.loadGames())
      .catch(err => console.log(err));
      }
    })
  };

  // function to fetch data from API and display results
  handleFormSubmit = event => {
    event.preventDefault();
    console.log("handle form submit ran");
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
      this.setState({ options: data },
      () => {
        console.log(this.state.options);
        console.log("options")
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

              {this.state.options.length ? (
                <div> 
                  <Options
                    collection={this.state.options}
                    handleSave={this.savetoMongo}
                  >
                  </Options>
                </div>
              ) : (
                <h4>Search for a New Game to add to your collection</h4>
              )}

            </div>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>My Collection</h1>
            </Jumbotron>
            
            
            {this.state.games.length ? (
              <Accordion
              collection={this.state.games}
              handleDelete={this.handleDeleteGame}
              >    
              </Accordion>
            ) : (
              <h3>Search for a New Game to add to your collection</h3>
            )}

          </Col>
        </Row>
      </Container>
    );
  }
}

export default Games;
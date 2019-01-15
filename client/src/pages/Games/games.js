import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
// import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import Accordion from "../../components/Accordion"
// import { ListItem } from "../../../../../GLAMobile/client/src/components/List";

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
    this.loadGames();
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleDeleteGame = id => {
    API.deleteGame(id)
      .then(res => this.loadGames())
      .catch(err => console.log(err));
  };

  loadGames = () => {
    API.getGames()
    .then(res =>
      this.setState({ games: res.data })
    )
    .catch(err => console.log(err));
  };

  changeState = event => {
    console.log(event);
    console.log("event");
    this.setState({ 
      name: event.target.name, 
      id: event.target.id
    })
    console.log(event.target);
    console.log(this.state);
    this.savetoMongo();
  };

  savetoMongo = () => {
    console.log("save function ran")
    API.saveGame({
      name: this.state.name,
      id: this.state.id
    }).then(res => this.loadGames())
    .catch(err => console.log(err));
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
      console.log('results from search', data)
      let div = document.getElementById('searchResults')
      div.innerHTML = ""
      div.innerHTML += " <h3>Select the game you are looking for.</h3> <p>If none of these look correct try modifying your search.</p>"
      data.forEach(g => {
        div.innerHTML += JSON.stringify(g.name);
        let b = document.createElement('button');
        b.setAttribute('id', g.id);
        b.setAttribute('name', g.name);
        b.setAttribute('class', 'btn');
        //is the below line calling savetoMongo on page refresh?
        b.addEventListener("click", this.savetoMongo(), false);
        b.innerHTML = 'Save Game';
        div.appendChild(b);
        div.innerHTML += "<br>";
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
              <Accordion
              games={this.state.games}
              handleDelete={this.handleDeleteGame}
              >    
              </Accordion>
            ) : (
              <h3>Search for a New Game to add to your collection</h3>
            )}


            {/* {this.state.games.length ? (
              <div className="accordion" id="accordionExample">
                {this.state.games.map(game => (
                  <div className="card">
                    <div className="card-header" id="headingOne" style={{backgroundColor:"#22b24c"}}>
                      <h5 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{color:"white"}}>
                          {game.name}
                        </button>
                      </h5>
                    </div>
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div className="card-body">
                          <p> {game.releaseDate} </p>
                          <p> {game.summary} </p>                        
                          <p> Description goes here.</p>
                        <DeleteBtn onClick={() => this.handleDeleteGame(game._id)} />
                      </div>
                    </div>
                  </div>   
                ))}
              </div>
            ) : (
              <h3>Search for a New Game to add to your collection</h3>
            )} */}






          </Col>
        </Row>
      </Container>
    );
  }
}

export default Games;
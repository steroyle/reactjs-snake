import React from 'react';
import './App.css';
import Snake from './components/Snake';
import Food from './components/Food';
import Score from './components/Score';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 100,
  direction: 'RIGHT',
  snakeParts: [
    [0,0],
    [2,0],
    [4,0]
  ]
};

class App extends React.Component {

  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBounds();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  checkIfEat() {
    let head = this.state.snakeParts[this.state.snakeParts.length - 1];
    let food = this.state.food;

    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
    }
  }

  enlargeSnake() {
    console.log('food');
    let parts = [...this.state.snakeParts];
    parts.unshift([]);
    this.setState({
      snakeParts: parts
    });
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  moveSnake = () => {
    let parts = [...this.state.snakeParts];
    let head = parts[parts.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    parts.push(head); //add new head
    parts.shift(); // remove tail
    this.setState({
      snakeParts: parts
    })
  }

  checkIfOutOfBounds() {
    let head = this.state.snakeParts[this.state.snakeParts.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeParts];
    let head = snake[snake.length - 1];
    snake.pop(); //to remove the head before checking
    snake.forEach(part => {
      if (head[0] == part[0] && head[1] == part[1]) {
        this.onGameOver();
      }
    })
  }

  onGameOver() {
    this.setState(initialState);
    // alert(`Game Over. Snake length is ${this.state.snakeParts.lenth}`);
  }

  render() {
    return (
      <div className="game-grid">
        <Snake snakeParts={this.state.snakeParts} />
        <Food part={this.state.food} />
      </div>
    );
  }
}

export default App;

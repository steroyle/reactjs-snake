import React from 'react';

class Food extends React.Component {

  render() {
    const style = {
      left: `${this.props.part[0]}%`,
      top: `${this.props.part[1]}%`
    }
    return (
      <div className="snake-food" style={style}></div>
    );
  }
}

export default Food;

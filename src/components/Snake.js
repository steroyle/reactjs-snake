import React from 'react';

class Snake extends React.Component {

  render() {
    return (
      <div>
        {this.props.snakeParts.map((part, i) => {
          const style = {
            left: `${part[0]}%`,
            top: `${part[1]}%`
          }
          return (
            <div className="snake-part" key={i} style={style}></div>
          )
        })}
      </div>
    );
  }
}

export default Snake;

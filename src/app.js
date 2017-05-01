const css = require('./app.scss');

import React from 'react';
import ReactDom from 'react-dom';

const Card = (props) => {
	return (
  	<div style={{margin: '1em'}}>
    	<img width="75 "src={props.avatar_url}/>
      <div style={{display: 'inline-block', margin: 10}}>
      	<div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
        	{props.name}</div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

let data = [
	{
  	name: "Antoine Niek",
    avatar_url: "https://avatars1.githubusercontent.com/u/550884?v=3",
    company: "AdGear Technologies Inc."
  },
  {
  	name: "Rob Conery",
    avatar_url: "https://avatars3.githubusercontent.com/u/78586?v=3",
    company: "BigMachine"
  }
]

const CardList = (props) => {
	return(
  	<div>
    	{props.cards.map(card => <Card {...card} key={card.name} />)}
    </div>
  );
}

ReactDom.render(<CardList cards={data} />, document.getElementById('root'));
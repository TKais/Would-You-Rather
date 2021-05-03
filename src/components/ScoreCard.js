import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../assets/css/scorecard.css';

function ScoreCard(props) {
  return (
    <Card className="scorecard">
		    <CardContent>
		        <h3>{props.user.name}</h3>
		        <p>Answered Questions: {Object.keys(props.user.answers).length}</p>
		        <p>Created Questions: {props.user.questions.length}</p>
		        <p>Score: {Object.keys(props.user.answers).length + props.user.questions.length}</p>
		        <img src={props.user.avatarURL} alt={props.user.name}/>
		    </CardContent>
    </Card>
  );
}

export default ScoreCard;
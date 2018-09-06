import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function ScoreCard(props) {
	return (
		<Card>
		    <CardContent>
		        <h3>{props.user.name}</h3>
		        <p>Answered Questions: {Object.keys(props.user.answers).length}</p>
		        <p>Created Questions: {props.user.questions.length}</p>
		        <p>Score: {Object.keys(props.user.answers).length + props.user.questions.length}</p>
		        <img src={props.user.avatarURL}/>
		    </CardContent>
		</Card>
	);
}

export default ScoreCard;
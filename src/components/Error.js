import React from 'react';
import { NavLink } from 'react-router-dom';

function Error(props) {
	return (
		<div>
		    { props.location.state.errorType === '401' ?
		        <div>
				    <h1>{ props.location.state.errorType }: Unauthorized</h1>
				    <p>Please <NavLink to='/' exact >Sign In</NavLink> to continue.</p>
			    </div>
			    :
			    <div>
				    <h1>{ props.location.state.errorType }: Not Found</h1>
				    <p>This question does not exist.</p>
			    </div>
		    }
		</div>
	)
}

export default Error;
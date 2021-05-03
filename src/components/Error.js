import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/error.css';

function Error(props) {
  return (
    <div className="error">
		    { props.location.state.errorType === '401' ?
		        <div className="error__content">
				    <h1>{ props.location.state.errorType }: Unauthorized</h1>
				    <p>Please <NavLink className='error__content-link' to='/' exact >Sign In</NavLink> to continue.</p>
			    </div>
			    :
			    <div>
				    <h1>{ props.location.state.errorType }: Not Found</h1>
				    <p>This question does not exist.</p>
			    </div>
		    }
    </div>
  );
}

export default Error;
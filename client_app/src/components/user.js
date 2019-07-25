import react from 'react';
import './user.css'

const user = (props) =>{
    return(
       <div className="user_div">
            <h1>props.name</h1>
            <p>props.bio</p>
            <p>props.created_at</p>
            <p>props.updated_at</p>
       </div> 
    );
}

export default user;
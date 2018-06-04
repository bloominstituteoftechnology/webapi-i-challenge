
import React, { Component } from 'react';

class UsersForm extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }
    handleNewUser = ()=>{
        console.log("NEWUSER", this.state);
        this.props.handleClick(this.state)
    }

    handleChange = (event)=>{
         return this.setState({[event.target.name]:event.target.value});
       }
         
    render(){
        console.log(this.props, "USERSFORM")
        return(
            <div className="form-input">
                <h3>Submit Person</h3>
                <div>
                    <label>Name:</label>
                    <input onChange = {this.handleChange} type="text" name="name" value={this.props.user}/>
                </div>
                <div>
                    <label>Bio:</label>
                    <input onChange ={this.handleChange} type="text"name="bio" value={this.props.user}/>
                </div>
                <button onClick={this.handleNewUser}>Submit</button>
            </div>
        )
    }
}
export default UsersForm;
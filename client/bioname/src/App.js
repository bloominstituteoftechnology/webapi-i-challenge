import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import{ UsersList } from './UsersList';
import UsersForm from './Form';

const URL = 'http://localhost:5000/api/users';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[{}], //this needs to be an empty object inside an array to access the users object
      user: {
        id: '',
        name: '',
        bio: ''
      }
    };

  }
  
  componentWillMount(){
    let promise = axios.get(URL);
    promise
      .then(res =>{
        return this.setState({data:res.data.users});
      })
      .catch(err =>{
        console.log(err);
      });
  }

  
  handleClick = (user)=>{ //handleClickSubmit
    let promise = axios.post(URL, user);
    promise
      .then(res =>{
       axios
        .get(URL)
          .then(res =>{
            return this.setState({data:res.data.users})
          })
          .catch(err =>{
            console.log(err);
          })
      })
}
  handleDelete = ()=>{
    let promise = axios.delete(URL, this.state.user);
    promise
      .then(res =>{
        axios
          .get(URL)
            .then(res =>{
              return this.setState({data:res.data.users})
            })
            .catch(err=>{
              console.log(err);
            })
      })
  }

 
  render() {
    console.log(this.state);
    return(
    <div>
     <UsersForm handleClick={this.handleClick}  value={this.state.user} />
     <UsersList data={this.state.data} handleDelete={this.handleDelete} />
    </div>
     
       
    )
}
}

export default App;

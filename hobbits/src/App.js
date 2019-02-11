import React, { Component } from 'react';
import styled from 'styled-components';
import UserList from './components/UserList';

const AppBox = styled.div`
background-image: linear-gradient(to top right, #c3e895, #c3e895, #6bd4c8, #57aed3, #4a87d3, #6b88e6);
  color: #666;
  font-family: "Source Sans Pro", Helvetica, sans-serif;
  font-size: 16pt;
  font-weight: 300;
  line-height: 1.65em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

class App extends Component {
    
  // componentDidMount(){
  //   this.setState({
  //     ...this.state,

  //   })
  // }

  render() {
    return (
      <AppBox>
          <UserList />
      </AppBox>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     loggedIn: state.login.loggedIn
//   }
// }

// export default connect(mapStateToProps, {})(App);

export default App;

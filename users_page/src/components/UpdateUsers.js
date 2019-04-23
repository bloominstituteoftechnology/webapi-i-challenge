import React, { Component } from 'react'

export default class UpdateUsers extends Component {
    constructor() {
        super();
    }

    refreshPage = event => {
        console.log('refreshing')
        this.setState({
            refreshing: !this.props.refreshing
        })
    }


  render() {
    return (
      <div>
        <button id="button" onClick={(event) => this.refreshPage(event)}>Update Users</button>
      </div>
    )
  }
}

import React from "react"

const User = props => {
  console.log(props)
  const {name, bio} = props.user
  return (
    <div>
      <h3>{name}</h3>
      <p>{bio}</p>
    </div>
  )
}


export default User;
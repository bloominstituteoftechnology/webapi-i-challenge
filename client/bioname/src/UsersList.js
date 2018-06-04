import React from "react";

const UsersList = (props) => {
        console.log("UsersListPROPS", props)
        return(
            <div>
            <h1>Names and Quick Bios of Famous People</h1>
            <table className="bioname-list">
                <tbody>
                    {props.data.map(element =>{
                    return(
                        <tr className="bio-table" key={element.name}>
                            <td>{element.name}</td>
                            <td>{element.bio}</td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
            </div>
        )
        
    }

export default UsersList;
    
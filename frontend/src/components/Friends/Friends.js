import React, {useState, useEffect} from 'react'

function Friends() {
    const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
        fetch("/api/friends").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )
    }, [])
  return (
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                </tr>
            </thead>
            <tbody>
            {backendData.map((friend, i) => (
                <tr>
                <th scope="row">{friend.friend_id}</th>
                <td>{friend.name}</td>
                <td>{friend.phone}</td>
              </tr> 
       ))}
            </tbody>
        </table>
       
    </div>
  )
}

export default Friends
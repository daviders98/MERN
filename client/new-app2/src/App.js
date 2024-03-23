import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios'
function App() {
  const [listOfUsers,setListOfUsers] = useState([])
  const [name,setName] = useState('')
  const [age,setAge] = useState(0)
  const [username,setUsername] = useState('')

  useEffect(()=>{
    Axios.get('http://localhost:3001/users').then((response)=>{
      setListOfUsers(response.data)
    })
  },[])

  const createUser = ()=>{
    Axios.post('http://localhost:3001/users/create',
    {
      name,
      age,
      username
    }).then(()=>{
      setListOfUsers([...listOfUsers,{
        name,
        age,
        username
      }])
    })
  }
  return (
    <div className="App">
      <div className='usersToDisplay'>
        {
          listOfUsers.map((user)=>{
            return <div>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Username: {user.username}</h1>
            </div>
          })
        }
      </div>
      <div>
        <input type='text' placeholder='Name' onChange={(e)=>{
          setName(e.target.value)
        }}/>
        <input type='text' placeholder='Age'
        onChange={(e)=>{
          setAge(e.target.value)
        }}/>
        <input type='text' placeholder='Username' onChange={(e)=>{
          setUsername(e.target.value)
        }}/>
        <button onClick={createUser}>Create new user</button>
      </div>
    </div>
  );
}

export default App;

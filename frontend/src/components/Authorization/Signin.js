import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './authorization-module.css'
import {useAuth} from '../AuthContext/AuthContext'



function Signin() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [userType, setUserType] = useState('');
    const [backendClient, setBackendClient] = useState([{}])
    const [backendFriend, setBackendFriend] = useState([{}])
    const { signIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/clients").then(
            response => response.json()
        ).then(
            data => {
                setBackendClient(data)
            }
        )
        const fetchData = async () => {
            try {
                // Використовуємо Promise.all для виконання обох запитів паралельно
                const [response1, response2] = await Promise.all([
                  fetch('/api/friends'),
                  fetch('/api/clients')
                ]);
        
                // Отримуємо дані з першого запиту
                const friends = await response1.json();
                setBackendFriend(friends);
        
                // Отримуємо дані з другого запиту
                const clients = await response2.json();
                setBackendClient(clients);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
          };
        
        fetchData();
    }, [])

    const handleSignIn = () => {

        const matchingClient = backendClient.find(
            (user) => user.name === name && user.phone === phone
          );
      
          const matchingFriend = backendFriend.find(
            (user) => user.name === name && user.phone === phone
          );
        // Отримайте дані з backendData та порівняйте з введеними даними
        const userExistsClient = backendClient.some(user => user.name === name && user.phone === phone);
        const userExistsFriend = backendFriend.some(user => user.name === name && user.phone === phone);

        if (userExistsClient && userType==='client') {
            signIn({userId: matchingClient.client_id});
            console.log(matchingClient.client_id);
            // Якщо користувач існує, переходьте на іншу сторінку
            navigate('/services'); // Замініть '/dashboard' на ваш шлях
        } 
        else if (userExistsFriend && userType ==='friend') {
            signIn({userId: matchingFriend.friend_id});
            console.log(matchingFriend.friend_id);
            navigate('/forfrieend')
        }
        else {
            alert('Користувача не знайдено. Перевірте введені дані.');
        }
        

    };

  return (
    <div>
        <h1 className='text-center'>Вхід</h1>
        <form className='col-6 offset-3'>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input type='text' class="form-control" onChange={(e) => setName(e.target.value)}/> 
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Phone</label>
                <input type='text' className='form-control' onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div class="form-check">
                <input className="form-check-input" type='radio' name='userType' onChange={() => setUserType('client')}/>
                <label class="form-check-label" for="flexCheckDefault">
                    Я орендатор
                </label>
                <br />
                <input className="form-check-input" type='radio' name='userType' onChange={() => setUserType('friend')}/>
                <label class="form-check-label" for="flexCheckDefault">
                    Я друг
                </label>
            </div>
            <button type="button" class="btn btn-primary" onClick={handleSignIn}>Sign in</button>
        </form>
        
    </div>
  )
}

export default Signin
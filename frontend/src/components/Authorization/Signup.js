import React, {useState, useEffect} from 'react'
import { json, useNavigate } from 'react-router-dom';
 
function Signup() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [userType, setUserType] = useState('');
    const [backendClient, setBackendClient] = useState([{}])
    const [backendFriend, setBackendFriend] = useState([{}])
    const navigate = useNavigate();

    useEffect(() => {
        // fetch("/api/clients").then(
        //     response => response.json()
        // ).then(
        //     data => {
        //         setBackendClient(data)
        //     }
        // )
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

    const handleSignUp = () => {
        const userExistsClient = backendClient.some(user => user.name === name && user.phone === phone);
        const userExistsFriend = backendFriend.some(user => user.name === name && user.phone === phone);

        if (!userExistsClient && userType==='client') {
            const addClient = async () => {
                try {
                    const response = await fetch('/api/clients', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name, phone }),
                    });
            
                    if (!response.ok) {
                        throw new Error('Мережева відповідь не вдалася');
                    }
            
                    const contentType = response.headers.get('content-type');
                    let data;
            
                    if (contentType && contentType.includes('application/json')) {
                        // Розбирайте відповідь як JSON, якщо тип контенту - JSON
                        data = await response.json();
                    } else {
                        // Обробляйте відповідь як звичайний текст, якщо інший тип контенту
                        data = await response.text();
                    }
            
                    console.log(data);
                    navigate('/signin');
                } catch (error) {
                    console.error('Помилка додавання клієнта:', error);
                }
            };
            addClient();
            // Якщо користувач існує, переходьте на іншу сторінку
            navigate('/signin'); // Замініть '/dashboard' на ваш шлях
        } 
        else if (!userExistsFriend && userType ==='friend') {
  
            const addFriend = async () => {
                try {
                    const response = await fetch('/api/friends', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name, phone }),
                    });
            
                    if (!response.ok) {
                        throw new Error('Мережева відповідь не вдалася');
                    }
            
                    const contentType = response.headers.get('content-type');
                    let data;
            
                    if (contentType && contentType.includes('application/json')) {
                        // Розбирайте відповідь як JSON, якщо тип контенту - JSON
                        data = await response.json();
                    } else {
                        // Обробляйте відповідь як звичайний текст, якщо інший тип контенту
                        data = await response.text();
                    }
            
                    console.log(data);
                    navigate('/signin');
                } catch (error) {
                    console.error('Помилка додавання клієнта:', error);
                }
            };
            
            // Викликаємо функцію
            addFriend();
            
            
            
        }
        else {
            alert('Користувач вже існує. Перевірте введені дані.');
        }
    }

  return (
    <div>
        <h1 className='text-center'>Реєстрація</h1>
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
            <button type="button" class="btn btn-primary" onClick={handleSignUp}>Sign in</button>
        </form>
    </div>
  )
}

export default Signup
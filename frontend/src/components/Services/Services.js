import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import './services-module.css';

function Services() {
  const [backendData, setBackendData] = useState([]);
  const [backendGifts, setBackendGifts] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedGift, setSelectedGift] = useState("");
  const [selectedFriendForGift, setSelectedFriendForGift] = useState("");
  const [selectedDateForGift, setSelectedDateForGift] = useState("");
  const [freeFriends, setFreeFriends] = useState([]);
  const [allFriends, setAllFriends] = useState([]);
  const [complaintText, setComplaintText] = useState("");
  const [selectedFriendForComplaint, setSelectedFriendForComplaint] = useState("");
  const [selectedDateForComplaint, setSelectedDateForComplaint] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [friendForDate, setFriendForDate] = useState("");
  const { userId } = useAuth();


  useEffect(() => {
    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });

      const fetchData = async () => {
        try {
            // Використовуємо Promise.all для виконання обох запитів паралельно
            const [response1, response2, response3] = await Promise.all([
              fetch('/api/events'),
              fetch('/api/gifts'),
              fetch('/api/friends')
            ]);
    
            // Отримуємо дані з першого запиту
            const events = await response1.json();
            setBackendData(events);
    
            // Отримуємо дані з другого запиту
            const gifts = await response2.json();
            setBackendGifts(gifts);

            const friends = await response3.json();
            setAllFriends(friends);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
      };
    
    fetchData();
    console.log(userId);
  }, []);


  
  useEffect(() => {
    console.log("Free in useEffect: ", freeFriends);
  }, [freeFriends]);

  const fetchData = async () => {
    try {
      if (!selectedDate || new Date(selectedDate).toString() === "Invalid Date") {
        setError("Обрано невірну дату");
        return;
      } else {
        setError("");
      }
  
      setLoading(true);
  
      const dateObject = new Date(selectedDate);
      const year = dateObject.getFullYear();
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObject.getDate().toString().padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
  
      const apiUrl = `http://localhost:5000/api/friends/date/${dateString}`;
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Data: ", data);
  
      setFreeFriends(data);
      console.log(freeFriends);
      setLoading(false);
    } catch (error) {
      console.error("Помилка при отриманні вільних друзів:", error);
      setLoading(false);
    }
  };
  
  
  const handleForm = () => {
    // При натисканні на кнопку встановлюємо значення стану buttonClicked в true
    setButtonClicked(true);
    fetchData();
  };
  
  const handleGift = async () => {
    try {
      // Перевірка чи введені всі необхідні дані
      console.log(selectedGift);
      console.log(selectedFriendForGift);
      console.log(selectedDateForGift);
      console.log(userId);
      if (!selectedGift || !selectedFriendForGift || !selectedDateForGift) {
        alert("Будь ласка, введіть всі дані для подарунку.");
        return;
      }

      const matchingFriend = allFriends.find(
        (user) => user.name === selectedFriendForGift
      );
      console.log(matchingFriend);

      if (matchingFriend) {
        const friendId = matchingFriend.friend_id;
        console.log(friendId);

        if (!friendId) {
          alert("Помилка при отриманні ідентифікатора друга або подарунка.");
          return;
        }

        const response = await fetch('/api/gifts/tofriend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: userId,
            friend_id: friendId,
            gift_name: selectedGift,
            present_date: selectedDateForGift,
          }),
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

        alert("Ти подарував подарунок");
        console.log(userId);
      } else {
        alert("Друга не знайдено. Перевірте введені дані.");
      }
    } catch (error) {
      console.error('Помилка додавання подарунку:', error);
    }
  };


  const handleEvent = async (friendId) => {
    try {
      // Перевірка, чи вибрано подію "Побачення"
      console.log(selectedEvent);
      if (selectedEvent == "Побачення") {
        // Ваш код для виконання POST-запиту
        const response = await fetch('/api/friends/invite/date', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: userId,
            friend_id: friendId,
            date: selectedDate,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Мережева відповідь не вдалася');
        }
  
        const contentType = response.headers.get('content-type');
        let data;
  
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }
  
        console.log(data);
  
        alert("Запрошення відправлено успішно");
      }
      else {
        const response = await fetch('/api/friends/invite/event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: userId,
            friend_id: friendId,
            date: selectedDate,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Мережева відповідь не вдалася');
        }
  
        const contentType = response.headers.get('content-type');
        let data;
  
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }
  
        console.log(data);
  
        alert("Запрошення відправлено успішно");
      }
    } catch (error) {
      console.error('Помилка відправлення запрошення:', error);
    }
  };
  
  
  const handleComplaint = async () => {
    try {
      // Перевірка чи введені всі необхідні дані
      console.log(complaintText);
      console.log(selectedFriendForComplaint);
      console.log(selectedDateForComplaint);
      console.log(userId);
      if (!complaintText || !selectedDateForComplaint || !selectedDateForComplaint) {
        alert("Будь ласка, введіть всі дані для подарунку.");
        return;
      }

      const matchingFriend = allFriends.find(
        (user) => user.name === selectedFriendForComplaint
      );
      console.log(matchingFriend);

      if (matchingFriend) {
        const friendId = matchingFriend.friend_id;
        console.log(friendId);

        if (!friendId) {
          alert("Помилка при отриманні ідентифікатора друга або подарунка.");
          return;
        }

        const response = await fetch('/api/complaints', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: complaintText,
            date: selectedDateForComplaint,
            client_id: userId,
            friend_id: friendId,
          }),
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

        alert("Скарга надіслана успішно");
        console.log(userId);
      } else {
        alert("Друга не знайдено. Перевірте введені дані.");
      }
    } catch (error) {
      console.error('Помилка надсилання скарги:', error);
    }
  }

  return (
    <div className="container main-container">
      <form className="col-4">
        <div>
          <span>Вибери подію: </span>
          <select
            className="form-select"
            aria-label="Select Event"
            value={selectedEvent}
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedEvent(e.target.value);
            }}
          >
            <option>Побачення</option>
            <option>Інша подія</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="datepicker">Select a date:</label>
          <input
            type="date"
            id="datepicker"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          {error && <p className="text-danger">{error}</p>}
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleForm}
        >
          Знайти вільних друзів
        </button>
        <div>
        <span>Надішли подарунок другові </span>
          <select
            className="form-select"
            aria-label="Select Event Type"
            value={selectedGift}
            onChange={(e) => setSelectedGift(e.target.value)}
          >
            {backendGifts.map((gift) => (
              <option key={gift.id}>{gift.name}</option>
            ))}
          </select>
          <span>Вибери друга: </span>
          <select
            className="form-select"
            aria-label="Select Event Type"
            value={selectedFriendForGift}
            onChange={(e) => setSelectedFriendForGift(e.target.value)}
          >
            {allFriends.map((friend) => (
              <option key={friend.id}>{friend.name}</option>
            ))}
          </select>
          <label htmlFor="datepicker">Вибери дату:</label>
          <input
            type="date"
            id="datepicker"
            className="form-control"
            value={selectedDateForGift}
            onChange={(e) => setSelectedDateForGift(e.target.value)}
          />
          <button type="button" class="btn btn-primary" onClick={handleGift}>Надіслати подарунок</button>
        </div>
        <div>
          <label>Поскаржитись на друга:</label>
          <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" value={complaintText}
            onChange={(e) => setComplaintText(e.target.value)} />
          <span>Вибери друга:</span>
          <select
            className="form-select"
            aria-label="Select Event Type"
            value={selectedFriendForComplaint}
            onChange={(e) => setSelectedFriendForComplaint(e.target.value)}
          >
            {allFriends.map((friend) => (
              <option key={friend.id}>{friend.name}</option>
            ))}
          </select>
          <label htmlFor="datepicker">Вибери дату:</label>
          <input
            type="date"
            id="datepicker"
            className="form-control"
            value={selectedDateForComplaint}
            onChange={(e) => setSelectedDateForComplaint(e.target.value)}
          />
          <button type="button" class="btn btn-primary" onClick={handleComplaint}>Надіслати скаргу</button>

        </div>
      </form>
      {/* Таблиця для виведення результатів */}
      <div className="offset-1 col-8">
        <h3>Вільні друзі:</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Ім'я друга</th>
              <th scope="col">Телефон</th>
              {/* Додайте інші необхідні стовпці */}
            </tr>
          </thead>
          <tbody>
            {freeFriends.map((friend) => (
              <tr key={friend.friend_id}>
                <td>{friend.name}</td>
                <td>{friend.phone}</td>
                <td>
                  <button type="button" class="btn btn-warning ml-3" onClick={() => handleEvent(friend.friend_id)}>Запросити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Services;

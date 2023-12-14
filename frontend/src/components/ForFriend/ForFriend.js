import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";

function ForFriend() {
  const { userId } = useAuth();
  const [gifts, setGifts] = useState([]);
  const [weekends, setWeekends] = useState([]);
  const [weekendDate, setWeekendDate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gift, weekend] = await Promise.all([
          fetch(`/api/gifts/${userId}`),
          fetch(`/api/events/myWeekends/${userId}`),
        ]);

        const resGifts = await gift.json();
        setGifts(resGifts);

        const resWeeks = await weekend.json();
        setWeekends(resWeeks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleDelete = async (presentId) => {
    try {
      const response = await fetch(`/api/gifts/${presentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Оновити стан gifts після видалення
      const updatedGifts = gifts.filter(
        (gift) => gift.present_id !== presentId
      );
      setGifts(updatedGifts);
    } catch (error) {
      console.error("Error deleting gift:", error);
    }
  };

  const handleWeekend = async () => {
    if (!weekendDate) {
      alert("Будь ласка, введіть всі дані.");
    }
    const response = await fetch("/api/events/weekend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friend_id: userId,
        date: weekendDate,
      }),
    });
    if (!response.ok) {
      throw new Error("Мережева відповідь не вдалася");
    }
    const newWeekend = { leave_id: new Date().getTime(), leave_date: weekendDate };
    setWeekends((prevWeekends) => [...prevWeekends, newWeekend]);

    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      // Розбирайте відповідь як JSON, якщо тип контенту - JSON
      data = await response.json();
    } else {
      // Обробляйте відповідь як звичайний текст, якщо інший тип контенту
      data = await response.text();
    }

    console.log(data);

    alert("Ти подарував подарунок");
  };

  return (
    <div className="container">
      <div className="gifts-container col-6">
        <h3>Мої подарунки:</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Клієнт</th>
              <th scope="col">Подарунок</th>
              <th scope="col">Дата</th>
            </tr>
          </thead>
          <tbody>
            {gifts.map((gift) => (
              <tr key={gift.present_id}>
                <td>{gift.client_name}</td>
                <td>{gift.gift_name}</td>
                <td>{gift.date}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => handleDelete(gift.present_id)}
                  >
                    Повернути
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="weekends-container col-6">
        <h3>Мої вихідні</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Дата</th>
            </tr>
          </thead>
          <tbody>
            {weekends.map((day) => (
              <tr key={day.leave_id}>
                <td>{day.leave_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h5>Додати вихідний день:</h5>
        <label htmlFor="datepicker">Вибери дату:</label>
        <input
          type="date"
          id="datepicker"
          className="form-control"
          value={weekendDate}
          onChange={(e) => setWeekendDate(e.target.value)}
        />
        <button type="button" class="btn btn-primary" onClick={handleWeekend}>
          Додати вихідний
        </button>
      </div>
    </div>
  );
}

export default ForFriend;

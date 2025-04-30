const apiKey = "e88d9ca3c9e24d55916114158252904"; // Use your own API key

const messages = [
  "🌞 Stay bright, just like the sun!",
  "😂 Why did the cloud date the sun? It found them hot!",
  "🌈 A good day starts with good vibes!",
  "❄ Some days are made for warm tea and soft sweaters.",
  "☔ Life isn’t about waiting for the storm to pass… it’s about dancing in the rain!",
];

function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const resultBox = document.getElementById("weatherResult");

  if (!location) {
    resultBox.innerHTML = "<p>👋 Please enter a city name!</p>";
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("City not found. Try again.");
      return response.json();
    })
    .then((data) => {
      const weather = data.current;
      const temp = weather.temp_c;
      const condition = weather.condition.text.toLowerCase();
      const body = document.body;

      body.classList.remove("default-bg", "hot-bg", "warm-bg", "mild-bg", "cold-bg");

      let bgClass = "";
      let emoji = "";
      let advice = "";

      if (temp >= 30) {
        bgClass = "hot-bg";
        emoji = "🔥";
        advice = "💧 It's hot – stay hydrated and avoid too much sun!";
      } else if (temp >= 20) {
        bgClass = "warm-bg";
        emoji = "🌞";
        advice = "🌻 Lovely weather – take a stroll and enjoy it!";
      } else if (temp >= 10) {
        bgClass = "mild-bg";
        emoji = "🌤";
        advice = "🍃 It's mild – dress light and smile bright!";
      } else {
        bgClass = "cold-bg";
        emoji = "❄";
        advice = "🧥 It’s cold – wear a sweater and keep warm!";
      }

      body.classList.add(bgClass);

      const message = messages[Math.floor(Math.random() * messages.length)];

      resultBox.innerHTML = `
        <p><strong>📍 Location:</strong> ${data.location.name}, ${data.location.country}</p>
        <p><strong>🌡 Temperature:</strong> ${temp}°C</p>
        <p><strong>${emoji} Condition:</strong> ${weather.condition.text}</p>
        <img src="https:${weather.condition.icon}" alt="Weather icon">
        <p class="suggestion">${advice}</p>
        <p style="margin-top:15px;">💬 ${message}</p>
      `;
    })
    .catch((error) => {
      resultBox.innerHTML = `<p>❌ ${error.message}</p>`;
    });
}

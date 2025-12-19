// havent learned js yet :( so copying from online source

// 1) Elements pakdo
const daysEl = document.getElementById("days-number");
const hoursEl = document.getElementById("hours-number");
const minutesEl = document.getElementById("minutes-number");
const secondsEl = document.getElementById("seconds-number");
const timezoneSelect = document.getElementById("timezone-select");

// 2) Target date set karo (1 Jan 2026, 00:00)
const targets = {
  IST: new Date("Jan 1, 2026 00:00:00 GMT+0530"), // India
  UTC: new Date("Jan 1, 2026 00:00:00 GMT+0000"), // UTC
  EST: new Date("Jan 1, 2026 00:00:00 GMT-0500"), // New York (rough, DST ignore)
  CET: new Date("Jan 1, 2026 00:00:00 GMT+0100"), // Central Europe
};

let currentTarget = targets.IST.getTime(); 

// 3) Har 1 second update function chalao
setInterval(function () {

  const now = new Date().getTime();
  const diff = currentTarget - now;  // milliseconds [web:319][web:325]

  // Agar time khatam ho gaya
  if (diff <= 0) {
    daysEl.textContent = 0;
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  // 4) ms -> days, hours, minutes, seconds [web:319][web:325]
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // 5) DOM update karo
  daysEl.textContent = days;
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}, 1000);  // 1000 ms = 1 second [web:324]


function createSnowflake() {
  const snowContainer = document.getElementById("snow-container");
  if (!snowContainer) return;

  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");

  // random symbol (*) ya ❄
  snowflake.textContent = "✶";

  // random horizontal position
  const xPos = Math.random() * window.innerWidth;
  snowflake.style.left = `${xPos}px`;

  // random size
  const size = 8 + Math.random() * 8; // 8px–16px
  snowflake.style.fontSize = `${size}px`;

  // random duration (speed)
  const duration = 5 + Math.random() * 5; // 5–10 seconds
  snowflake.style.animationDuration = `${duration}s`;

  snowContainer.appendChild(snowflake);

  // animation khatam hone ke baad DOM clean
  setTimeout(() => {
    snowflake.remove();
  }, duration * 1000);
}


// dropdown change pe target badlo
if (timezoneSelect) {
  timezoneSelect.addEventListener("change", () => {
    const tz = timezoneSelect.value;
    const date = targets[tz];
    if (date) {
      currentTarget = date.getTime();
      setInterval(); // turant numbers refresh
    }
  });
}

// har 200ms pe ek naya snowflake
setInterval(createSnowflake, 200);

document.addEventListener('DOMContentLoaded', function() {
  // 1) Elements - ONLY here
  const daysEl = document.getElementById("days-number");
  const hoursEl = document.getElementById("hours-number");
  const minutesEl = document.getElementById("minutes-number");
  const secondsEl = document.getElementById("seconds-number");
  const timezoneSelect = document.getElementById("timezone-select");

  // 2) Targets - HTML se exact match
  const targets = {
    "IST": new Date("2026-01-01T00:00:00+05:30"),
    "UTC": new Date("2026-01-01T00:00:00Z"),
    "EST": new Date("2026-01-01T00:00:00-05:00"),
    "CET": new Date("2026-01-01T00:00:00+01:00"),
    "JST": new Date("2026-01-01T00:00:00+09:00"),
    "MSK": new Date("2026-01-01T00:00:00+03:00")
  };
  let currentTarget = targets["IST"].getTime();  // India default

  // 3) Timer
  function updateTimer() {
    const now = new Date().getTime();
    const diff = currentTarget - now;
    if (diff <= 0) {
      daysEl.textContent = 0; hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = "00";
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    daysEl.textContent = days;
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }
  
  // 4) Timezone change
  timezoneSelect.addEventListener("change", () => {
    const tz = timezoneSelect.value;
    if (targets[tz]) currentTarget = targets[tz].getTime();
    updateTimer();
  });

  // 5) Snowflake
  let snowflakeCount = 0; const MAX_SNOWFLAKES = 16;
  function createSnowflake() {
    if (snowflakeCount >= MAX_SNOWFLAKES) return;
    const snowContainer = document.getElementById("snow-container");
    if (!snowContainer) return;
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake"); snowflake.textContent = "✶";
    snowflake.style.left = `${Math.random() * window.innerWidth}px`;
    snowflake.style.fontSize = `${6 + Math.random() * 6}px`;
    snowflake.style.animationDuration = `${8 + Math.random() * 4}s`;
    snowContainer.appendChild(snowflake); snowflakeCount++;
    setTimeout(() => { snowflake.remove(); snowflakeCount--; }, 12000);
  }

  // 6) Padoru
  let isDancing = false;
  const padoru = document.querySelector('#padoru');
  padoru.addEventListener('click', function() {
    if (isDancing) return;
    padoru.style.animation = 'padoruDance 1s infinite'; isDancing = true;
    setTimeout(() => { padoru.style.animation = ''; isDancing = false; }, 1000);
  });

  // START intervals AFTER everything loads
  setInterval(updateTimer, 1000);
  setInterval(createSnowflake, 600);
  updateTimer(); // initial call
});

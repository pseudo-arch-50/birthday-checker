const input = document.getElementById("bday"); 
const output = document.getElementById("output"); 
const openBtn = document.getElementById("openBtn");
const envelope = document.getElementById("envelope");

let timer; 

input.addEventListener("change", startCountdown); 

function startCountdown(){
  clearInterval(timer); 
  update(); 
  timer = setInterval(update, 1000); 
}

function update() {
  if (!input.value) return;

  const today = new Date();
  const birth = new Date(input.value);
  const year = today.getFullYear();

  const todayDate = new Date(year, today.getMonth(), today.getDate());
  let nextBirthday = new Date(year, birth.getMonth(), birth.getDate());

  if (nextBirthday < todayDate) {
    nextBirthday = new Date(year + 1, birth.getMonth(), birth.getDate());
  }

  const diff = nextBirthday - today; 
  const totalseconds = Math.floor(diff / 1000); 

  const days = Math.floor(totalseconds / (3600*24)); 
  const hours = Math.floor((totalseconds % (3600*24)) / 3600); 
  const minutes = Math.floor((totalseconds % 3600)/60); 
  const seconds = totalseconds % 60; 

  document.getElementById("days").innerText = days.toString().padStart(2,"0");
  document.getElementById("hours").innerText = hours.toString().padStart(2,"0");
  document.getElementById("minutes").innerText = minutes.toString().padStart(2,"0");
  document.getElementById("seconds").innerText = seconds.toString().padStart(2,"0");

  // Birthday check
  if (today.getMonth() === birth.getMonth() && today.getDate() === birth.getDate()) {
    clearInterval(timer);
    document.querySelector(".countdown").style.display = "none";
    openBtn.style.display = "block";

    // Set scrolling message once
    output.innerText = "🎉 Happy Birthday! 🎂 🎉 Happy Birthday! 🎂";

    launchConfetti();
  } 
  else {
    document.querySelector(".countdown").style.display = "flex";
    output.innerText = "Oops.. There's still time :)";
    openBtn.style.display = "none";
    envelope.classList.add("hidden");
  }
}

// Button click
openBtn.addEventListener("click", () => {
  envelope.classList.remove("hidden");
});

// Confetti
function launchConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    const left = Math.random()*100;
    confetti.style.left = left + "vw";
    const size = Math.random()*10 + 5;
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";
    confetti.style.backgroundColor = `hsl(${Math.random()*360},100%,50%)`;
    const duration = Math.random()*3 + 2;
    confetti.style.animationDuration = duration + "s";
    const sway = Math.random()*30 - 15;
    confetti.style.setProperty('--sway', sway + "px");
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

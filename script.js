// Automatically show popup on page load
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('popupOverlay').style.display = 'flex';
  document.getElementById('popup1').style.visibility = 'hidden';
  document.getElementById('popup1').style.opacity = '0';
});

function closePopup() {
  document.getElementById('popupOverlay').style.display = 'none';
  startGame()
}

function closePopup2() {
  // Hide the overlay
  document.getElementById('popup1').style.visibility = 'hidden';
  document.getElementById('popup1').style.opacity = '0';

  // Start a new game
  startGame();
}

src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
type="module"


function updateChipImages() {
  const isMobile = window.innerWidth <= 800;

  document.querySelectorAll('.btn-container').forEach(container => {
    const imgElement = container.querySelector('img');
    const imgContainer = container.querySelector('.img-container');
    const button = container.querySelector('.chip');

    if (isMobile) {
      const imgTopping = imgElement?.src;
      if (imgTopping && button) {
        // Set background image on button
        button.style.backgroundImage = `url(${imgTopping})`;
        button.style.backgroundSize = 'contain'; // ✅ Shrinks the image to fit
        button.style.backgroundRepeat = 'no-repeat'; // Prevents tiling
        button.style.backgroundPosition = 'center';
        button.style.backgroundSize = '60%';
        button.textContent = ''; // Optional: remove text
        button.style.height = '5rem';
        button.style.width = '5rem';

        // Hide the image element and container
        imgElement.style.display = 'none';
        imgElement.style.width = '0';
        imgElement.style.height = '0';
        imgElement.style.margin = '0';
        imgElement.style.padding = '0';

        if (imgContainer) {
          imgContainer.style.display = 'none';
          imgContainer.style.width = '0';
          imgContainer.style.height = '0';
        }
      }
    } else {
      // Reset styles when going back to desktop
      if (button) {
        button.style.backgroundImage = '';
        button.style.backgroundSize = '';
        button.style.backgroundPosition = '';
        button.style.height = '';
        button.style.width = '';
        button.textContent = button.id.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase()); // Restore name
      }

      if (imgElement) {
        imgElement.style.display = '';
        imgElement.style.width = '';
        imgElement.style.height = '';
        imgElement.style.margin = '';
        imgElement.style.padding = '';
      }

      if (imgContainer) {
        imgContainer.style.display = '';
        imgContainer.style.width = '';
        imgContainer.style.height = '';
      }
    }
  });
}



// 🧠 Persistent sauce layers array
let imgSauces = ["assets/crust_default.webp"];

document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', (event) => {
    event.preventDefault();

    chip.classList.toggle('selected');

    const pizzaToppings = {
      'pineapple': ['assets/pineapple_toppings.webp', 'Pineapple topping', 'topping-pineapple'],
      'olive': ['assets/olive_toppings.webp', 'Olive topping', 'topping-olive'],
      'bacon': ['assets/bacon_toppings.webp', 'Bacon topping', 'topping-bacon'],
      'jalapeno': ['assets/jalapeno_toppings.webp', 'Jalapeno topping', 'topping-hotpepper'],
      'basil': ['assets/basil_toppings.webp', 'Basil topping', 'topping-basil'],
      'pepperoni': ['assets/pepperoni_toppings.webp', 'Pepperoni topping', 'topping-pepperoni'],
      'onion': ['assets/onion_toppings.webp', 'Onion topping', 'topping-onion'],
      'sausage': ['assets/sausage_toppings.webp', 'Sausage topping', 'topping-sausage'],
      'ham': ['assets/ham_toppings.webp', 'Ham topping', 'topping-ham'],
      'jalapano': ['assets/jalapano_toppings.webp', 'Jalapano topping', 'topping-jalapano'],
    }

    const img = document.querySelector('.crust-image');
    const topping = chip.id;

    if (topping === 'red-sauce') {
      if (chip.classList.contains('selected')) {
        if (!imgSauces.includes("assets/crust_red.webp")) {
          imgSauces.push("assets/crust_red.webp");
        }
      } else {
        imgSauces = imgSauces.filter(src => src !== "assets/crust_red.webp");
      }
    } else if (topping === 'cheese') {
      if (chip.classList.contains('selected')) {
        if (!imgSauces.includes("assets/crust_cheese.webp")) {
          imgSauces.push("assets/crust_cheese.webp");
        }
      } else {
        imgSauces = imgSauces.filter(src => src !== "assets/crust_cheese.webp");
      }
    }

    // Update the main crust image to the last added sauce layer (or default)
    img.src = imgSauces[imgSauces.length - 1];

    // 🍕 Toppings (like pineapple, pepperoni, etc.)
    if (topping in pizzaToppings) {
      if (chip.classList.contains('selected')) {
        const imgToppings = document.createElement('img');
        imgToppings.src = pizzaToppings[topping][0];
        imgToppings.alt = pizzaToppings[topping][1];
        imgToppings.className = pizzaToppings[topping][2];
        document.querySelector('.pizza-img-container').appendChild(imgToppings);
      } else {
        const imgToppings = document.querySelector(`.${pizzaToppings[topping][2]}`);
        if (imgToppings) imgToppings.remove();
      }
    }
  });
});

const pizzaOptions = [
  { name: "Margherita", ingredients: ["red-sauce", "cheese", "basil"], score: 300 },
  { name: "Hawaiian", ingredients: ["red-sauce", "cheese", "pineapple", "ham"], score: 400 },
  { name: "Veggie Lovers", ingredients: ["red-sauce", "cheese", "onion", "jalapano"], score: 400 },
  { name: "Meat Lovers", ingredients: ["red-sauce", "cheese", "pepperoni", "sausage", "ham", "bacon"], score: 600 },
  { name: "Supreme", ingredients: ["red-sauce", "cheese", "pepperoni", "olive", "onion", "jalapano"], score: 600 },
  { name: "Cheese Lover", ingredients: ["red-sauce", "cheese"], score: 200 },
  { name: "Garden Fresh", ingredients: ["red-sauce", "cheese", "basil", "olive", "onion"], score: 500 },
  { name: "Spicy Pepperoni", ingredients: ["red-sauce", "cheese", "pepperoni", "jalapano"], score: 400},
];

let timerInterval = null;
let randomPizza = null;

function showPopup(title, message, message2, message3, message4, message5, isWin) {

  if (isWin){
    document.getElementById("popupContent1").textContent = "+" + randomPizza.score + " points";
    document.getElementById("popupContent1").style.color = "green";
  }else{
    document.getElementById("popupContent1").textContent = "+0 points";
    document.getElementById("popupContent1").style.color = "red";
  }

  if (rounds <= 4){
    // Set the content dynamically
    document.getElementById("popupTitle").textContent = title;
    document.getElementById("popupContent").textContent = message;
    document.getElementById("popupContent2").textContent = message2;
    document.getElementById("popupContent3").textContent = message3;
    document.getElementById("popupContent4").textContent = message4;
    document.getElementById("popupContent5").textContent = message5;

    document.getElementById("popupContent3header").textContent = "✅ Correct:";
    document.getElementById("popupContent4header").textContent = "❌ Wrong:";
    document.getElementById("popupContent5header").textContent = "🔍 Missing:";
    

    // Show the popup by changing the location hash
    window.location.hash = "popup1";

    document.getElementById('popup1').style.visibility = 'visible';
    document.getElementById('popup1').style.opacity = '1';

    document.getElementById("animation-results").style.display = 'block';

    startGame()
  } else{
    document.getElementById("popupTitle").textContent = "Thank you for playing!";
    document.getElementById("popupContent").textContent = "";
    document.getElementsByClassName("points-earned").visibility = "0";
    document.getElementById("popupContent2").textContent = `Final Score: ${score} points`;
    document.getElementById("popupContent3").textContent = "";
    const container = document.getElementById("popupContent4");
    container.textContent = "";

    // Ensure container uses flexbox for centering
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.flexDirection = "column"; // optional, good if there's more content
    container.style.height = "100%"; // ensure there's space to center

    const container_qr = document.getElementById("popupContent1");

    // Clear any existing content
    container_qr.textContent = "";

    // Create and configure the QR code
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      data: "www.google.com",
      image: "assets/google.svg", // Google logo
      dotsOptions: {
        color: "#000000", //
        type: "rounded"
      },
      backgroundOptions: {
        color: "white"
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 8
      }
    });

    // Append QR code to the container
    qrCode.append(container);

    document.getElementById("popupBtn").hidden = true;

    document.getElementById("popupContent5").textContent = "";
    document.getElementById("popupContent3header").textContent = "";
    document.getElementById("popupContent4header").textContent = "";
    document.getElementById("popupContent5header").textContent = "";

    window.location.hash = "popup1";

    document.getElementById('popup1').style.visibility = 'visible';
    document.getElementById('popup1').style.opacity = '1';
  }

  
}

function createButtons(){
  const submitButton = document.getElementById("doneButton");
  const clearButton = document.getElementById("clearButton");
  const startButton = document.getElementById("startButton");

  if (submitButton) submitButton.style.display = "block";
  if (clearButton) clearButton.style.display = "block";
  if (startButton) startButton.style.display = "none";
}

function removeButtons(){
  const submitButton = document.getElementById("doneButton");
  const clearButton = document.getElementById("clearButton");
  const startButton = document.getElementById("startButton");

  if (submitButton) submitButton.style.display = "none";
  if (clearButton) clearButton.style.display = "none";
  if (startButton) startButton.style.display = "block";
}

let rounds = 0;
// Score logic
let score = 0;

let pizza_list = [];

function startGame() {
  clearInterval(timerInterval); // Clear any previous timer

  clearPizza();
  
  const timerElement = document.getElementById("time");
  let timeLeft = 60;
  timerElement.innerText = timeLeft;

  randomPizza = pizzaOptions[Math.floor(Math.random() * pizzaOptions.length)];

  while (pizza_list.includes(randomPizza.name)){
    randomPizza = pizzaOptions[Math.floor(Math.random() * pizzaOptions.length)];
  }

  pizza_list.push(randomPizza);

  document.getElementById("orderText").innerText = randomPizza.name;

  const containerTimer = document.getElementById("game-timer");
  containerTimer.style.display = "block";

  createButtons()

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      console.log(timeLeft)
      timeLeft--;
      timerElement.innerText = timeLeft;
    } else {
      clearInterval(timerInterval);
      showPopup("Time's Up", "You Lose!");
      removeButtons()
    }
  }, 1000); // Changed to 1000ms to count seconds
}

function submitPizza() {
  const selectedChips = document.querySelectorAll('.chip.selected');
  const selectedIds = Array.from(selectedChips).map(chip => chip.id);

  const userAnswer = [...selectedIds].sort();
  const correctAnswer = [...randomPizza.ingredients].sort();

  // Analyze results
  const correctToppingsArray = userAnswer.filter(topping => correctAnswer.includes(topping));
  const wrongToppingsArray = userAnswer.filter(topping => !correctAnswer.includes(topping));
  const missingToppingsArray = correctAnswer.filter(topping => !userAnswer.includes(topping));

  let isWin = false;

  // Capitalize function
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  // Capitalized, comma-separated strings
  const message3 = ` ${correctToppingsArray.map(capitalize).join(', ') || 'None'}`;
  const message4 = ` ${wrongToppingsArray.map(capitalize).join(', ') || 'None'}`;
  const message5 = ` ${missingToppingsArray.map(capitalize).join(', ') || 'None'}`;

  let title, message, message2;

  if (userAnswer.length === correctAnswer.length &&
      userAnswer.every((val, index) => val === correctAnswer[index])) {
    title = "You Win!";
    message = `🎉 Winner winner, pepperoni dinner! 🍕`;
    score += randomPizza.score;
    isWin = true;
  } else {
    title = "Oh no... Nice try but Incorrect!";
    message = `Oof. That guess was extra wrong — no toppings for you!`;
    score += 0;
  }

  message2 = `This is your score so far: ${score} points`;



  clearInterval(timerInterval);
  removeButtons();
  clearPizza();
  rounds++;
  showPopup(title, message, message2, message3, message4, message5, isWin);
  
}


function clearPizza() {
  // Deselect all chips
  document.querySelectorAll('.chip.selected').forEach(chip => {
    chip.classList.remove('selected');
  });

  // Remove only topping layers (not the crust image)
  document.querySelectorAll('.pizza-img-container img:not(.crust-image)').forEach(img => {
    img.remove();
  });

  // Reset sauce layers array
  imgSauces = ["assets/crust_default.webp"];

  // Reset the crust image
  const crustImg = document.querySelector('.crust-image');
  if (crustImg) {
    crustImg.src = "assets/crust_default.webp";
  }
}


window.addEventListener('resize', updateChipImages);
updateChipImages(); // call it initially
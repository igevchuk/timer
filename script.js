/***Define your global variables at the top of file***/

// array of prime numbers
var primes = [];
// counter for divs
var COUNT = 7;
// timer id
var timerID;

// returns true if number is a prime otherwise returns false
function isPrime(n) {
  // by default we consider number is not a prime
  var isPrime = false;

  // if number is less than 2 or divisible by 2 it is not a prime
  if (n <= 2 || n % 2 == 0) {
    isPrime = false;
  // check if number is divisible by 3, 5 or 7 and is not 3, 5 or 7 itself
  } else if ((n % 3 == 0) && (n != 3)) {
    isPrime = false;
  } else if ((n % 5 == 0) && (n != 5)) {
    isPrime = false;
  } else if ((n % 7 == 0) && (n != 7)) {
    isPrime = false;
  // otherwise we consider the number is prime
  } else {
    isPrime = true;
  }

  // return prime (true or false)
  return isPrime;
}

/*
* find 7 primes following age and push them to the array
* get passed age as a parameter
*/
function getPrimes(n) {
  // increment = n which is age
  var inc = n;
  // empty array
  primes = [];

  // loop 7 times
  for (var i = 0; i <= COUNT; i++) {
    // increment number while it is not a prime
    do {
      inc++;
    } while (!isPrime(inc));

    // push found value to the primes array
    primes.push(inc);
  }

  // once loop is done render divs for found primes
  renderDiv();
}

// function render div element for each prime number and insert some child nodes (buttons, text nodes etc)
function renderDiv() {
  // get main container div
  var container = document.getElementById("container");
  // clear container inner HTML if need to re-render divs
  container.innerHTML = "";

  // create element for each prime
  for(var i = 0; i < primes.length; i++) {
    // create div which will hold other components
    var div = document.createElement("div");
    // div to display prime number
    var prime = document.createElement("div");
    // div to display current time
    var timer = document.createElement("div");
    // button On
    var startBtn = document.createElement("button");
    // button Off
    var stopBtn = document.createElement("button");
    // div to display time when color changes
    var moduloTimeEl = document.createElement("div");

    // set color for div
    setColor(div);

    //set class name for div
    div.className = "item";
    //set class name for prime div
    prime.className = "prime";
    //set class name for timer
    timer.className = "timer";
    // set class name for modulo div
    moduloTimeEl.className = "modulo";

    // set text for prime div
    prime.textContent = primes[i];

    // set text content for control buttons
    startBtn.textContent = "On";
    stopBtn.textContent = "Off";

    // append event to On button
    startBtn.addEventListener("click", handleTimer);
    // append event to Off button
    stopBtn.addEventListener("click", function() {
      clearInterval(timerID);
    });

    // set class name for buttons
    startBtn.className = "btn start";
    stopBtn.className = "btn stop";
    // append prime div to div
    div.appendChild(prime);
    // append timer to div
    div.appendChild(timer);
    // append modulo div to container div
    div.appendChild(moduloTimeEl);
    // append buttons to the div
    div.appendChild(startBtn)
    div.appendChild(stopBtn);
    // finally append div to the container
    container.appendChild(div);
  }
}

// get time in format h:m:s
function formatDate() {
  // new date object representing current time
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();

  // prepend 0 if number is less than 10
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  return h + ":" + m + ":" + s;
}

// get time
function checkModulo(n) {
  // new date object representing current time
  var now = new Date();
  var s = now.getSeconds();
  var isModulo = true;

  if (s % n == 0) {
    isModulo = false;
  }

  return isModulo;
}

// function start timer once button is clicked
function handleTimer(e) {

  // get element - target on which click event was called
  var targetEl = e.target;
  var divEl = targetEl.closest(".item");
  var primeEl = divEl.getElementsByClassName("prime")[0];
  var prime = primeEl.textContent;
  var timerEl = divEl.getElementsByClassName("timer")[0];
  var moduloTimeEl = divEl.getElementsByClassName("modulo")[0];

  // function called within timer every 1s
  var update = function() {
    // get formatted current time
    var now = formatDate();
    // check if seconds in current time are divided by prime without modulo
    var isModulo = checkModulo(prime);
    //update timer div content
    timerEl.textContent = now;
    // if modulo is false display current time in modulo div
    if (isModulo == false) {
      setColor(divEl);
      moduloTimeEl.textContent = now;
    }
  }

  update();

  // each time user clicks on Start button it creates new timer id which we can use to clear interval
  timerID = window.setInterval(update, 1000);

}


// function returns a randon number between 0 and 255 (256 in total)
function getRandom() {
  return Math.floor(Math.random() * 256);
}

// function returns a random rgb color
function getRGB() {
  var red = getRandom();
  var green = getRandom();
  var blue = getRandom();
  // concatenate and return a string representing color
  return red + "," + green + "," + blue;
}

/*
* function set a new color for element's background
* takes a element which background should be changed as a parameter
*/
function setColor(el) {
  // get random rgb color
  var color = getRGB();
  // element's background color
  el.style.backgroundColor = "rgb(" + color + ")";
}

// call functions after the DOM content is loaded
document.addEventListener("DOMContentLoaded", function(e) {
  // button calling the prompt popup to get user's age
  var ageButton = document.getElementById("age");

  // attach event listener to the button
  ageButton.addEventListener("click", function(e) {
    // get the value provided by user
    var age = prompt("Enter your age:");

    if (isNaN(age)) {
      alert("Value is not a number. Please provide a valid age.");
    } else if (age != Math.round(age)) {
      alert("Value is not an integer. Please provide a valid age.");
    } else if(age <= 0) {
      alert(age + " must be greater than 0. Please provide a valid age.");
    } else {
      getPrimes(age);
    }
  });
});

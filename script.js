//
// var count=0;
// var arra=[];
//
// 	function myprime(x){
// 		var h = 0;
// 			if (x==1){
// 				return false;
// 	 		}
// 				for (var i = 1; i <= x; i++){
// 					if (x%i==0){
// 						h++;
// 					}
// 				}
// 						if (h>2){
// 							return false;
// 						}
// 							else{
// 								return true;
// 								}
// 	}
//
// //var age= parseInt(prompt("yours number"));
// 	function mynumber(age){
// 		var age = prompt ("enter your age");
// 			j=0;
// 			for (var i=age; i <= 1000; i++){
// 				j++;
// 				if (myprime(i)==true) {
// 					//arra[i]=i;
// 					arra.push(i);
// 					document.getElementById('chiffre'+count).innerHTML = i;
// 					count++;
// 					//document.write(arra[i]+"<br>");
// 						if (count==7){
// 							break;
// 						}
// 				}
// 			}
// 			console.log(arra);
// 			return (arra);
// 	}
//
//
//
//
//
// //var element = document.getElementsByClassName("para2")
//
// 	for(var i=0; i<7;i++){
// 		var d = document.createElement('div');
// 		d.className = "one";
// 		document.body.appendChild(d);
//
// 		var btnOn = document.createElement('button')
// 		btnOn.className = "bt";
// 		btnOn.innerHTML = "On";
// 		d.appendChild(btnOn);
//
// 		var btnOff = document.createElement('button')
// 		btnOff.className = "bt";
// 		btnOff.innerHTML = "Off";
// 		d.appendChild(btnOff);
//
// 		var para = document.createElement('p')
// 		para.className = "para";
// 		d.appendChild(para);
//
//
// 		var para2 = document.createElement('p')
// 		para2.id = "chiffre"+i;
// 		para2.className = "para2";
// 		d.appendChild(para2);
//
//
// }
//
//
// function wr_hours(){
// time=new Date();
// time_sec=time.getSeconds();
// time_min=time.getMinutes();
// time_hours=time.getHours();
// time_wr=((time_hours<10)?"0":"")+time_hours;
// time_wr+=":";
// time_wr+=((time_min<10)?"0":"")+time_min;
// time_wr+=":";
// time_wr+=((time_sec<10)?"0":"")+time_sec;
// para.innerHTML=time_wr;
// }
// wr_hours();
// setInterval("wr_hours();",1000);







/*
changeColor Random
function changeColor() {
var r = Math.floor(Math.random() * 256);
var g = Math.floor(Math.random() * 256);
var b = Math.floor(Math.random() * 256);
var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
document.body.style.backgroundColor = rgb
}

*/

/***Define your variables at the top of file***/

// array of prime numbers
var primes = [];
// counter
var COUNT = 7;

function isPrime(n) {
  var isPrime = false;

  if (n <= 2) {
    isPrime = false;
  } else {
    if (n % 2 == 0 || n % 3 == 0 || n % 5 == 0 || n % 7 == 0) {
      isPrime = false;
    } else {
      isPrime = true;
    }
    return isPrime;
  }
}

function getPrimes(n) {

  var inc = n;

  // loop 7 times
  for (var i = 0; i <= COUNT; i++) {
    // increment number while it is not a prime
    do {
      inc++;
    } while (!isPrime(inc));

    // push found value to the primes array
    primes.push(inc);
  }

  // once loop is done render 7 divs
  renderDiv();

}

function clear(e) {
  var target = e.target;
  var div = target.closest(".item");
  
}

function getTime() {
  var time = new Date();
  var h = time.getHours();
  var m = time.getMinutes();
  var s = time.getSeconds();

  var parsedTime = h + ":" + m + ":" + s;

  console.log(parsedTime);
}

// function start timer once button is clicked
function startTimer(e) {
  // get element - target on which click event was called
  var target = e.target;
  // get time
  setInterval("getTime()", 1000);
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

function renderDiv() {
  // get container div
  var container = document.getElementById("container");
  // clear container inner HTML if need to re-render divs
  container.innerHTML = "";

  for(var i = 0; i < primes.length; i++) {
    // create div, Start and Stop buttons
    var div = document.createElement("div");
    var prime = document.createElement("div");
    var timer = document.createElement("div");
    var startBtn = document.createElement("button");
    var stopBtn = document.createElement("button");


    setColor(div);

    //set class name for div
    div.className = "item";
    //set class name for prime div
    prime.className = "prime";
    //set class name for timer
    timer.className = "timer";

    // set text for prime div
    prime.textContent = primes[i];

    // set text content for control buttons
    startBtn.textContent = "On";
    stopBtn.textContent = "Off";

    // append event to On button
    startBtn.addEventListener("click", startTimer);


    // set class name for buttons
    startBtn.className = stopBtn.className = "btn";
    // append prime div to div
    div.appendChild(prime);
    // append timer to div
    div.appendChild(timer);
    // append buttons to the div
    div.appendChild(startBtn)
    div.appendChild(stopBtn);
    // append div to the container
    container.appendChild(div);
  }
}

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

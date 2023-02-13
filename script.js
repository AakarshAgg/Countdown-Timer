const counterFormArea = document.querySelector(".form-area")
const counterForm = document.getElementById("counter-form");
const counterE1 = document.getElementById("counter")
const ct = document.getElementById("ct")

const counterTitleE1 = document.getElementById("counter-title")
const timeElements = document.querySelectorAll("span")
const counterResetBtn = document.getElementById("counter-reset")

const complete = document.getElementById("complete")
const completeInfo = document.getElementById("complete-info")
const completeBtn = document.getElementById("complete-button")

const datePicker = document.getElementById("counter-date")
const timePicker = document.getElementById("counter-time")

let countdownValue;
let countdownActive;
let music = new Audio("tic.mp3")
let alarm = new Audio("alarm.mp3")


const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let title = "";
let date = "";
let time = ""

//use to prevent selection from previous date

let today = new Date().toISOString().split("T")[0];
//console.log("today : " + today)

datePicker.setAttribute("min", today)

function updateDom() {
    countdownActive = setInterval(() => {
        let now = new Date().getTime();
       // console.log("hour: " + new Date().getHours())
        let distance = countdownValue - now;
        // console.log("distance: "+distance)
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)
         console.log(days,hours,minutes,seconds)

        if (distance < 0) {
            counterE1.hidden = true;
            counterFormArea.hidden = true;
            complete.hidden = false;
            alarm.loop=true;
            alarm.autoplay=true;
            music.pause()
            alarm.play()
            clearInterval(countdownActive); //pass the variable in which set interval is stored
            completeInfo.textContent = `${title} has started on ${date} at ${time}`
        } else {
            timeElements[0].textContent = days;
            timeElements[1].textContent = hours;
            timeElements[2].textContent = minutes;
            timeElements[3].textContent = seconds;
            ct.textContent = "Your "+ title + " Starts In ";
            music.loop=true;
            music.autoplay=true;
            music.play()
            counterFormArea.hidden = true;
            counterE1.hidden = false;
        }
    }, 1000)

}

function updateCountdown(e) {
    e.preventDefault();  //To stop page from refreshing
    // console.log("e is",e)
    // console.log("e target: ",e.target)
    title = e.srcElement[0].value;
    date = e.srcElement[1].value;
    time = e.srcElement[2].value;

    //to save data in local storage 
    const savedCountdown = {
        title: title,
        date: date,
        time: time
    }

    localStorage.setItem('countdown', JSON.stringify(savedCountdown));  //to show the object as string

    console.log(title, date , time)

    if (date === "") {
        alert("Please enter a valid date!")
    }
    else if (title === "") {
        alert("Please Enter the title")
    } else if (date === "") {
        alert("Please enter correct time")
    } else {
       // countdownValue = new Date("2023-01-18 14:56").getTime();
        countdownValue = new Date(date.concat(" ",time)).getTime();
        //date.concat(" ",time)
        //console.log("t"+new Date("time").getTime())
        console.log("countdown: ",countdownValue)
        console.log("ty"+typeof date)
        console.log("tm"+typeof time)
        console.log("time"+time)
        console.log("dt",typeof("2023-01-18 14:36"))
        console.log(date,time)
        console.log(typeof(date,time))
        /*console.log("countdown value : " + countdownValue)
        console.log("hours: " + new Date(date).getHours())
        console.log("minutes: " + new Date(date).getMinutes())
        console.log("date: " + new Date(date).getDate())
        console.log("time: " + new Date(date).getTime())*/
        updateDom();
    }
}

function reset() {
    localStorage.removeItem('countdown')  //to remove local storage by clicking on reset button
    counterE1.hidden = true;
    complete.hidden = true;
    music.pause()
    alarm.pause()
    clearInterval(countdownActive);
    title = " ";
    date = " ";
    time=" ";
    counterFormArea.hidden = false;
}

function restoreCountdown() {
    if (localStorage.getItem('countdown')) {
        counterFormArea.hidden = true;
        let countdownData = JSON.parse(localStorage.getItem('countdown'))  //json.parse will convert string into object

        title = countdownData.title;
        date = countdownData.date;
        time = countdownData.time;
        countdownValue = new Date(date.concat(" ",time)).getTime();

        updateDom();
    }
}

counterForm.addEventListener("submit", updateCountdown) //when we click on submit updateCountdown fuction is called
counterResetBtn.addEventListener("click", reset)
completeBtn.addEventListener("click", reset)

restoreCountdown()
// importing necessary files
import{ mobileLargeView, mobileView, tabletView, laptopView } from './functions/screens.js'
import { jackpot, flicker, spriteMaker } from "./functions/effects.js"
import { spriteData, wheelData } from "./spritesData.js"


// dom elements
const wheelDiv = document.getElementById("wheel-div"),
      canvas = document.getElementById("canvas-one"),
      msHundreds = document.getElementById('ms-hundreds'),
      seconds = document.getElementById('seconds'),
      testing = document.getElementById('testing')


// Setting pixi functions to variables
const Application = PIXI.Application,
Sprite = PIXI.Sprite

// utility variables
let counter = 5,
    spritesArray = [],
    secs = 5,
    msHuns = 10


//creating sprites and storing in array
spriteMaker(spriteData, spritesArray)

// creating pixi application
const app = new Application ({
    view: canvas,
    autoResize: true,
    backgroundColor: 333,
})

// Adding resize event listener for responsiveness
window.addEventListener('resize',resize)

// storing the background images for reuse
const canvasHeader = spritesArray.find(item => item.name === "header")
const theShowDown = spritesArray.find(item => item.name === "showdown")


// staging the background sprites
app.stage.addChild(canvasHeader.sprite)
app.stage.addChild(theShowDown.sprite)


// Resize function
function resize() {
    const parent = app.view.parentNode   
    app.renderer.resize(parent.clientWidth, parent.clientHeight)  
    canvasHeader.sprite.width = parent.clientWidth 
    canvasHeader.sprite.height = parent.clientHeight
    theShowDown.sprite.height = parent.clientHeight
    theShowDown.sprite.width = parent.clientWidth
    letterResize(window.innerWidth, spritesArray)
}
resize()


// resizing the showdown text
function letterResize (width, spritesArray) {
    width <= 400 ? spritesArray.map(sprite => mobileView(sprite, app)):
    width <=600 ? spritesArray.map(sprite => mobileLargeView(sprite, app)):
    width <= 800 ? spritesArray.map(sprite => tabletView(sprite, app)):
    spritesArray.map(sprite => laptopView(sprite, app))
}


// timers for light flickering
setTimeout(vegasRender, 500)
setTimeout(renderLetters, 1200)
setTimeout(boltFlicker,2000)
setTimeout(mustDrop, 3000)
// setTimeout(()=>{jackpot(spritesArray, wheelElements, flicker)}, 5000)


// timer functions
function vegasRender() {
    app.stage.addChild(spritesArray[2].sprite)
    app.stage.addChild(spritesArray[5].sprite)
    setTimeout(()=>{flicker(spritesArray[2], spritesArray[5])}, 700)    
}

function mustDrop() {
    app.stage.addChild(spritesArray[14].sprite)
    setTimeout(()=>{flicker(spritesArray[14])}, 100) 
}


function boltFlicker () {
    app.stage.addChild(spritesArray[3].sprite)           
    app.stage.addChild(spritesArray[4].sprite) 
    let checkFlicker = 0,
    flickerCounter = 0
let flicker = setInterval(()=>{
if(flickerCounter < 5 && checkFlicker === 1){
    flickerCounter = flickerCounter + 1
    checkFlicker = checkFlicker - 1
    spritesArray[4].sprite.alpha = checkFlicker            
} else if(flickerCounter < 5 && checkFlicker === 0){
    flickerCounter = flickerCounter + 1
    checkFlicker = checkFlicker + 1
    spritesArray[4].sprite.alpha = checkFlicker            
} else {
    clearInterval(flicker)
    checkFlicker = 0
    flickerCounter = 0
}
},100)         
    setInterval(()=>{
        let flickering = setInterval(()=>{
            if(flickerCounter < 5 && checkFlicker === 1){
                flickerCounter = flickerCounter + 1
                checkFlicker = checkFlicker - 1
                spritesArray[4].sprite.alpha = checkFlicker            
            } else if(flickerCounter < 5 && checkFlicker === 0){
                flickerCounter = flickerCounter + 1
                checkFlicker = checkFlicker + 1
                spritesArray[4].sprite.alpha = checkFlicker            
            } else {
                clearInterval(flickering)
                checkFlicker = 0
                flickerCounter = 0
            }
            },100) 
    }, 10000)
}

function renderLetters() {
    let lightingInt = setInterval(()=>{
        counter < 13 ? 
        (counter = counter + 1, 
        app.stage.addChild(spritesArray[counter].sprite)) :
        (counter = 5,
        clearInterval(lightingInt))
    }, 180)
}


// setting up the spinners
let spinRange = 0
let spunWheel = []
const wheelPositions = [5403, 5493, 5583, 5673]
let isTimer = false

// creating wheels
for(let i=0; i<wheelData.length; i++) {
    let wheelHolder = document.createElement('div')
    wheelHolder.classList.add("wheel-holder")
    wheelData.map((data)=> {
        let img = document.createElement("img")
        img.src = data.url
        img.name = data.name
        img.classList.add(data.class)
        wheelHolder.appendChild(img)
    })
    wheelDiv.appendChild(wheelHolder)
}


// SPIN FUNCTION
    async function spin(e, theWheel, button) {
    if(!isTimer) {
        clockTimer()
        isTimer = true
    }
    let number = await wheelPicker()
    spunWheel.push(number)
    button.style.display = 'none'
    spinRange = Math.floor(wheelPositions[number] + Math.random() * 90)
    if(navigator.userAgent.match("Chrome")){
		theWheel.style.WebkitTransition = 'all 2s ease-out'
		theWheel.style.WebkitTransform = `rotate(${spinRange}deg)`
	} else if(navigator.userAgent.match("Firefox")){
		theWheel.style.MozTransition = 'all 2s ease-out'
		theWheel.style.MozTransform = `rotate(${spinRange}deg)`
	} else if(navigator.userAgent.match("MSIE")){
		theWheel.style.msTransition = 'all 2s ease-out'
		theWheel.style.msTransform = `rotate(${spinRange}deg)`
	} else if(navigator.userAgent.match("Opera")){
		theWheel.style.OTransition = 'all 2s ease-out'
		theWheel.style.OTransform = `rotate(${spinRange}deg)`
	} else {
		theWheel.style.transition = 'all 2s ease-out'
        theWheel.style.transform = `rotate(${spinRange}deg)`
	}
}

// adding event listeners to wheels and buttons
const wheelElements = Array.from(document.getElementsByClassName("wheel"))
wheelElements.forEach((item, index) => {
    if(item.name === 'button') {
        item.addEventListener('click', (e) => spin(e, wheelElements[index - 1], item))
    } else {
        item.addEventListener('transitionend', () => {spun(spunWheel)})
    }
})

// checking a wheel spin has ended
function spun(array) {
    if (array.length === 3) {
        if (array[0] === array[1] && array[0] === array[2]) {
            setTimeout(()=>{
                jackpot(spritesArray, wheelElements, flicker)
            },1500)
            spunWheel = []
        } else {
            console.log("Try again")
            spunWheel = []
            console.log(spunWheel)
        }
    } else {}      
}

// reset function to reset all wheels
function resetWheel() {
    let wheels = []
    let buttons = []
    wheelElements.map((item) => {
        item.name === "wheel" ?
        wheels.push(item) : buttons.push(item)
    })
    const currentSpinRange = 0
    wheels.forEach((theWheel) => {
        if(navigator.userAgent.match("Chrome")){
            // theWheel.style.WebkitTransition = 'all 1s ease-out'
            theWheel.style.webkitTransform = `rotate(${currentSpinRange}deg)`
        } else if(navigator.userAgent.match("Firefox")){
            // theWheel.style.MozTransition = 'all 1s ease-out'
            theWheel.style.MozTransform = `rotate(${currentSpinRange}deg)`
        } else if(navigator.userAgent.match("MSIE")){
            // theWheel.style.msTransition = 'all 1s ease-out'
            theWheel.style.msTransform = `rotate(${currentSpinRange}deg)`
        } else if(navigator.userAgent.match("Opera")){
            // theWheel.style.OTransition = 'all 1s ease-out'
            theWheel.style.OTransform = `rotate(${currentSpinRange}deg)`
        } else {
            // theWheel.style.transition = 'all 1s ease-out'
            theWheel.style.transform = `rotate(${currentSpinRange}deg)`
        }
    })
    buttons.forEach((button, index) => {
        button.style.display = 'inline-block'
    })
}



async function wheelPicker()  {
    let data = await axios.get('http://localhost:5000/spinner')
    let number = await data.data.POSITION
    return number
  };




// Countdown Timer
function clockTimer() { 
    isTimer = true
    seconds.innerText = secs
  let microTens = setInterval(secondsCounter, 100)
  function secondsCounter() {
      if(msHuns === 10) {
        msHundreds.innerText = msHuns
        msHuns -= 1
      } else if(msHuns > 0 && msHuns <= 10 && secs >= 0) {
        msHundreds.innerText =  "0" + msHuns
          msHuns -= 1
      } else if (msHuns === 0 && secs > 0) {
          secs -= 1
          msHundreds.innerText =  "0" + msHuns
          seconds.innerText = secs
          msHuns = 10          
      } else if (msHuns === 0 && secs === 0) {
        msHundreds.innerText =  '00'
        seconds.innerText = '0'
          msHuns = 10
          secs = 4
          clearInterval(microTens)
          resetWheel()
          isTimer = false
      }
  }
}



const testView = new Application ({
    backgroundColor: 333,
    height: 200,
    width: 200,
})

testing.appendChild(testView.view)

const marker = new Sprite.from(wheelData[0].url)
const testWheel = new Sprite.from(wheelData[1].url)
const testButton = new Sprite.from(wheelData[2].url)
marker.position.set(80, -10)
marker.height = 50
marker.width = 20

testWheel.position.set(92, 100)
testButton.position.set(50,180)
testWheel.height = 100
testWheel.width = 100
testButton.height = 20
testButton.width = 100
testWheel.anchor.set(0.5)


// let spinTest = setInterval(testSpin, 10)

function testSpin() {
    if(testWheel.angle < 360) {
        testWheel.rotation +=0.3
        console.log(testWheel.angle)
    } else if(testWheel.angle > 360 && testWheel.angle < 700) {
        testWheel.rotation +=0.28
        console.log(testWheel.angle)
    } else if (testWheel.angle > 700 && testWheel.angle < 1020) {
        testWheel.rotation +=0.26
        console.log(testWheel.angle)
    } else if (testWheel.angle > 1020 && testWheel.angle < 1320 ) {
        testWheel.rotation +=0.24
        console.log(testWheel.angle)
    } else if (testWheel.angle > 1320 && testWheel.angle < 1600 ) {
        testWheel.rotation +=0.22
        console.log(testWheel.angle)
    } else if (testWheel.angle > 1600 && testWheel.angle < 1860 ) {
        testWheel.rotation +=0.20
        console.log(testWheel.angle)
    } else if (testWheel.angle > 1860 && testWheel.angle < 2100 ) {
        testWheel.rotation +=0.18
        console.log(testWheel.angle)
    } else if (testWheel.angle > 2100 && testWheel.angle < 2320 ) {
        testWheel.rotation +=0.16
        console.log(testWheel.angle)
    } else if (testWheel.angle > 4800 && testWheel.angle < 4900 ) {
        testWheel.rotation +=0.14
        console.log(testWheel.angle)
    } else if (testWheel.angle > 4800 && testWheel.angle < 4900 ) {
        testWheel.rotation +=0.12
        console.log(testWheel.angle)
    }  else if (testWheel.angle > 4800 && testWheel.angle < 4900 ) {
        testWheel.rotation +=0.1
        console.log(testWheel.angle)
    }  else if (testWheel.angle > 4800 && testWheel.angle < 4900 ) {
        testWheel.rotation +=0.08
        console.log(testWheel.angle)
    }  else if (testWheel.angle > 4800 && testWheel.angle < 4900 ) {
        testWheel.rotation +=0.06
        console.log(testWheel.angle)
    }  else if (testWheel.angle > 4800 && testWheel.angle < 4900 ) {
        testWheel.rotation +=0.04
        console.log(testWheel.angle)
    }  else if (testWheel.angle > 4800 && testWheel.angle < 4900 ) {
        testWheel.rotation +=0.02
        console.log(testWheel.angle)
    }  else {
        clearInterval(spinTest)
    }
    
}

let lesser = 360
let theDenominator = 340
let degree = 0.3

function spanner() {
    let spinTest = setInterval(() => {
        spinnerRedo(lesser, theDenominator, testWheel, degree, spinTest)
    }, 100)
}

window.addEventListener('click', spanner)
function spinnerRedo(lesser, denominator, sprite, degree, spinTest) {
    if(degree <= 0) {
        clearInterval(spinTest)
        return
    } else if(sprite.angle < lesser) {
        sprite.rotation += degree
        // console.log(sprite.angle)
    } else if(sprite.angle > lesser) {
        lesser = lesser + denominator 
        // console.log(lesser)       
        degree -= 0.02
        console.log(degree)
        sprite.rotation += degree
        denominator -= 20
        spinnerRedo(lesser, denominator, sprite, degree, spinTest)
    }
}


testView.stage.addChild(marker)
testView.stage.addChild(testWheel)
testView.stage.addChild(testButton)
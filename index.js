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
    secs = 7,
    msHuns = 10


//creating sprites and storing in array
spriteMaker(spriteData, spritesArray)

// creating pixi application
const app = new Application ({
    view: canvas,
    autoResize: true,
    backgroundColor: 333,
})

const wheelCanvas = new Application({
    backgroundColor: 333,
    width: 350,
    height: 150,
})

wheelDiv.appendChild(wheelCanvas.view)

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
const wheelPositions = [5303, 5493, 5583, 5673]
let isTimer = false

const wheelSpritePositions = [
    [[32, -8],[43, 75],[10, 125]],
    [[165, -8],[175, 75],[140, 125]],
    [[300, -8],[310, 75],[275, 125]]
]

let wheelSprites = [],
    buttonSprites = []


for(let i=0; i<wheelSpritePositions.length; i++) {
    let counter = 0
    wheelData.forEach((wheel) => {
        let sprite = new Sprite.from(wheel.url)
        sprite.height = wheel.height
        sprite.width = wheel.width
        sprite.position.set(wheelSpritePositions[i][counter][0],wheelSpritePositions[i][counter][1])
        counter += 1
        wheel.name === 'wheel' ?
        (wheelSprites.push(sprite),
        sprite.anchor.set(0.5)) :
        wheel.name === 'button' ? 
        (buttonSprites.push(sprite),
        sprite.interactive = true,
        sprite.buttonMode = true) :
        null    
        wheelCanvas.stage.addChild(sprite)
    })
}


let theDenominator = 370
let degree = 0.3 
let isSpinning = false
let canSpin = true

buttonSprites.forEach((button, index)=>{
    button.on('touchstart', (e)=>{
        spin(theDenominator, wheelSprites[index], button, degree)});
})

async function spin(denom, sprite, button, deg ) {
    let number = 2 // await wheelPicker()
    let spinTest = setInterval(() => {
        spinnerRedo(wheelPositions[number], denom, sprite, deg, spinTest, number)
    }, 10)
      if(!isTimer) {
        clockTimer(spinTest)
        isTimer = true
    }
    button.alpha = 0
    button.removeAllListeners()   
    console.log(number) 
}

function spinnerRedo(lesser, denominator, sprite, degree, spinTest, number) {
    if(canSpin === false) {
        sprite.angle = 0
        clearInterval(spinTest)
    } else if(degree <= 0) {
        clearInterval(spinTest)
        console.log(number)
        spunWheel.push(number)
        spun(spunWheel)
        // return
    } else if(sprite.angle < lesser) {
        sprite.rotation += degree
        // console.log(sprite.angle)
    } else if(sprite.angle >= lesser) {
        lesser = lesser + denominator 
        // console.log(lesser)       
        degree -= 0.01
        sprite.rotation += degree
        denominator -= 1
        spinnerRedo(lesser, denominator, sprite, degree, spinTest, number)
    }
}


// checking a wheel spin has ended
function spun(array) {
    if (array.length === 3) {
        if (array[0] === array[1] && array[0] === array[2]) {                 
                setTimeout(()=>{jackpot(spritesArray, flicker)}, 1000) 
                setTimeout(()=>{isTimer = false},100)
                setTimeout(()=>{
                    msHundreds.innerText =  '00'
                    seconds.innerText = '0'
                    msHuns = 10
                    secs = 10          
                    resetWheel()
                    isTimer = false
                }, 4536)
                console.log(spunWheel)          
            // spunWheel = []
        } else {
            setTimeout(()=>{isTimer = false},100)
                setTimeout(()=>{
                    msHundreds.innerText =  '00'
                    seconds.innerText = '0'
                    msHuns = 10
                    secs = 10          
                    resetWheel()
                    isTimer = false
                }, 2000)
                console.log(spunWheel) 
            console.log("Try again")
            // spunWheel = []
        }
    } else {console.log("Spin another")}      
}

// reset function to reset all wheels
function resetWheel() {
        canSpin = false
        wheelSprites.forEach((wheel)=> {
        wheel.angle = 0
    })
    spunWheel = []
    buttonSprites.forEach((button, index) => {
        button.alpha = 1
        button.on('touchstart', (e)=>{
            spin(theDenominator, wheelSprites[index], button, degree)})
    })
    setTimeout(()=>{
        canSpin = true
    },11)
}



async function wheelPicker()  {
    let data = await axios.get('http://localhost:5000/spinner')
    let number = await data.data.POSITION
    return number
  };




// Countdown Timer
function clockTimer(spinTest) { 
    isTimer = true
    seconds.innerText = secs
  let microTens = setInterval(secondsCounter, 100)
  function secondsCounter() {
      if(!isTimer) {
        clearInterval(microTens)
      } else if(msHuns === 10) {
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
          secs = 10
          clearInterval(microTens)
          buttonSprites.forEach(button => clearInterval(spinTest))
          resetWheel()
          isTimer = false
      }
  }
}



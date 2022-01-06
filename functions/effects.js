export function spriteMaker(array, array2) {
    array.forEach((item) => {
        let sprite = {}
        sprite.sprite = PIXI.Sprite.from(item.url)
        sprite.name = item.name
        sprite.smallMobile = item.smallMobile
        sprite.largeMobile = item.largeMobile
        sprite.tablet = item.tablet
        sprite.laptop = item.laptop
        array2.push(sprite)
    })
}

export function flicker(...sprites) {
        let checkFlicker = 0,
            flickerCounter = 0
    let flickering = setInterval(()=>{
        if(flickerCounter < 5 && checkFlicker === 1){
            flickerCounter = flickerCounter + 1
            checkFlicker = checkFlicker - 1
            sprites.map(sprite => sprite.sprite.alpha = checkFlicker)            
        } else if(flickerCounter < 5 && checkFlicker === 0){
            flickerCounter = flickerCounter + 1
            checkFlicker = checkFlicker + 1
            sprites.map(sprite => sprite.sprite.alpha = checkFlicker)            
        } else {
            clearInterval(flickering)
            // checkFlicker = 0
            // flickerCounter = 0
        }
    },100)
}


export function makeSpinners(array, buttonDiv, wheelDiv) {
    for(let i=0; i<array.length; i++) {
        let wheelHolder = document.createElement('div')
        wheelHolder.classList.add("wheel-holder")
        array.map((data)=> {
           if (data.name !== 'button') {
            let img = document.createElement("img")
            img.src = data.url
            img.name = data.name
            img.classList.add(data.class)
            wheelHolder.appendChild(img)
           }
        })
        wheelDiv.appendChild(wheelHolder)
    }

    let spinner = document.createElement('img')
    let buttonData = array.find(item => item.name === 'button')
    spinner.src = buttonData.url
    spinner.name = buttonData.name
    spinner.id = 'spin'
    spinner.classList.add(buttonData.class)
    buttonDiv.appendChild(spinner)
}

export function jackpot(spritesArray, wheelElements, flicker) {
    let jackpotCounter = 0
    wheelElements.forEach((item) => {
        item.name === 'button' ?
        item.style.display = 'none' :
        null
    })
    spritesArray.forEach(item => item.sprite.alpha = 0)
    let jackpotDisplay = setInterval(() => {
        if(jackpotCounter < 15) {
            spritesArray[jackpotCounter].sprite.alpha = 1
            jackpotCounter += 1 
        } else if(jackpotCounter === 15) {
            spritesArray.forEach(sprite => flicker(sprite))
            clearInterval(jackpotDisplay)
            wheelElements.forEach((item) => {
                item.name === 'button' ?
                item.style.display = 'inline-block' :
                null
            })
        }
             
    }, 180);
}


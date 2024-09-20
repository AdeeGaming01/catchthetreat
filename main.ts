/**
 */
function playerEncouragement () {
    basic.clearScreen()
    encouragement = randint(0, 2)
    if (encouragement == 0) {
        basic.clearScreen()
        basic.showString("Nice!")
    } else if (encouragement == 1) {
        basic.clearScreen()
        basic.showString("Amazing!")
    } else if (encouragement == 2) {
        basic.clearScreen()
        basic.showString("You Rock!")
    }
}
input.onButtonPressed(Button.A, function () {
    led.unplot(playerXPos, playerYPos)
    playerXPos += 1
    if (playerXPos > 4) {
        playerXPos = 0
    }
    led.plot(playerXPos, playerYPos)
})
function restartGame () {
    basic.pause(1000)
    basic.showString("Restarting...")
    basic.pause(500)
    playerScore = 0
    timer = 0
}
input.onButtonPressed(Button.AB, function () {
    led.unplot(playerXPos, playerYPos)
    playerXPos += 1
    playerYPos += 1
    if (playerXPos > 4) {
        playerXPos = 0
    }
    if (playerYPos > 4) {
        playerYPos = 0
    }
    led.plot(playerXPos, playerYPos)
})
input.onButtonPressed(Button.B, function () {
    led.unplot(playerXPos, playerYPos)
    playerYPos += 1
    if (playerYPos > 4) {
        playerYPos = 0
    }
    led.plot(playerXPos, playerYPos)
})
function generateLevel () {
    basic.clearScreen()
    playerXPos = 0
    playerYPos = 0
    treatXPos = randint(0, 4)
    treatYPos = randint(0, 4)
    if (playerXPos == treatXPos) {
        if (playerYPos == treatYPos) {
            generateLevel()
        }
    }
    led.plot(playerXPos, playerYPos)
    led.plot(treatXPos, treatYPos)
}
let treatYPos = 0
let treatXPos = 0
let playerYPos = 0
let playerXPos = 0
let encouragement = 0
let timer = 0
let playerScore = 0
playerScore = 0
timer = 0
generateLevel()
loops.everyInterval(1000, function () {
    timer += 1
})
basic.forever(function () {
    if (playerXPos == treatXPos) {
        if (playerYPos == treatYPos) {
            basic.clearScreen()
            basic.showLeds(`
                . . . . #
                . # . # #
                # # # . #
                . # . . #
                . . . . #
                `)
            basic.pause(200)
            playerScore += 1
            if (playerScore == 4) {
                playerEncouragement()
            } else if (playerScore == 9) {
                playerEncouragement()
            } else if (playerScore == 14) {
                playerEncouragement()
            } else if (playerScore == 19) {
                playerEncouragement()
            } else if (playerScore == 24) {
                basic.showString("Congratulations! You Win!")
                restartGame()
            }
            generateLevel()
        }
    }
    if (timer > 85) {
        basic.showString("Out of time")
        basic.pause(200)
        basic.showString("Score:")
        basic.showNumber(playerScore)
        basic.pause(1000)
        restartGame()
    }
})

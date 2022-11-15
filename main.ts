bluetooth.onBluetoothConnected(function () {
    let a: number;
let b: number;
let distance: number;
basic.showLeds(`
        . . . . .
        # . . . #
        # # # # #
        # . . . #
        . # # # .
        `)
    basic.pause(1000)
    Tinybit.RGB_Car_Big(Tinybit.enColor.Green)
    connected = 1
    while (connected == 1) {
        uartdata = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        CarCtrl()
        domusic()
        SevenColorLED()
        a = 0
        if (input.buttonIsPressed(Button.A)) {
            a = 1
        }
        b = 0
        distance = Tinybit.Ultrasonic_Car()
        if (input.buttonIsPressed(Button.B)) {
            b = 1
        }
        left = 0
        if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.Black)) {
            left = 1
        }
        right = 0
        if (Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.Black)) {
            right = 1
        }
        str1 = "" + distance + ","
        str2 = "" + a + "," + b + ","
        str3 = "" + left + "," + right + "#"
        CSB = "$CSB" + str1 + str2 + str3
        bluetooth.uartWriteString(CSB)
    }
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        . # # # .
        # . . . #
        `)
    connected = 0
    Tinybit.RGB_Car_Big(Tinybit.enColor.Blue)
})
function domusic () {
    if (uartdata == "1") {
        music.ringTone(262)
    } else if (uartdata == "2") {
        music.ringTone(294)
    } else if (uartdata == "3") {
        music.ringTone(330)
    } else if (uartdata == "4") {
        music.ringTone(349)
    } else if (uartdata == "5") {
        music.ringTone(392)
    } else if (uartdata == "6") {
        music.ringTone(440)
    } else if (uartdata == "7") {
        music.ringTone(494)
    } else if (uartdata == "8") {
        music.ringTone(523)
    } else if (uartdata == "B1") {
        music.ringTone(277)
    } else if (uartdata == "B2") {
        music.ringTone(311)
    } else if (uartdata == "B3") {
        music.ringTone(370)
    } else if (uartdata == "B4") {
        music.ringTone(415)
    } else if (uartdata == "B5") {
        music.ringTone(466)
    } else if (uartdata == "O") {
        music.stopAllSounds()
    }
}
function SevenColorLED () {
    if (uartdata == "G") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Red)
    } else if (uartdata == "H") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Green)
    } else if (uartdata == "I") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Blue)
    } else if (uartdata == "J") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Yellow)
    } else if (uartdata == "K") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Cyan)
    } else if (uartdata == "L") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Pinkish)
    } else if (uartdata == "M") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.White)
    } else if (uartdata == "N") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.OFF)
    }
}
function CarCtrl () {
    if (uartdata == "A") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, 150)
    } else if (uartdata == "B") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Back, 150)
    } else if (uartdata == "C") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinLeft, 150)
    } else if (uartdata == "D") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinRight, 150)
    } else if (uartdata == "E") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinLeft, 150)
    } else if (uartdata == "F") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinRight, 150)
    } else if (uartdata == "0") {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Right, 0)
    }
}
let CSB = ""
let str3 = ""
let str2 = ""
let str1 = ""
let right = 0
let left = 0
let uartdata = ""
let connected = 0
let distance2 = 0
Tinybit.RGB_Car_Big(Tinybit.enColor.Red)
bluetooth.setTransmitPower(7)
bluetooth.startUartService()
bluetooth.startLEDService()
basic.showString(control.deviceName())
basic.showString("S")

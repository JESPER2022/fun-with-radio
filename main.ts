function right () {
    if (control_LR > 220) {
        control_LR = 220
    } else {
        control_LR += 3
    }
    powerbrick.Servo(powerbrick.Servos.S2, control_LR)
}
function up () {
    powerbrick.MotorRun(powerbrick.Motors.M1, 100)
}
function left () {
    if (control_LR < -40) {
        control_LR = -40
    } else {
        control_LR += -3
    }
    powerbrick.Servo(powerbrick.Servos.S2, control_LR)
}
function down () {
    powerbrick.MotorRun(powerbrick.Motors.M1, -100)
}
powerbrick.onBumperEvent(powerbrick.Ports.PORT2, powerbrick.Slots.B, function () {
    open = !(open)
    if (open) {
        powerbrick.Servo(powerbrick.Servos.S1, -10)
    } else {
        powerbrick.Servo(powerbrick.Servos.S1, 100)
    }
})
let temp = 0
let gesture = 0
let open = false
let control_LR = 0
basic.showIcon(IconNames.Happy)
control_LR = 90
open = true
powerbrick.Servo(powerbrick.Servos.S1, -10)
powerbrick.Servo(powerbrick.Servos.S2, control_LR)
powerbrick.GC_MODE(powerbrick.GCMode.Gesture)
basic.forever(function () {
    gesture = powerbrick.GC_Gesture()
    if (gesture != 0) {
        temp = gesture
    }
})
basic.forever(function () {
    if (powerbrick.Bumper(powerbrick.Ports.PORT2, powerbrick.Slots.A)) {
        if (temp == 3) {
            left()
        } else if (temp == 2) {
            down()
        } else if (temp == 1) {
            right()
        } else {
            if (temp == 4) {
                up()
            }
        }
    } else {
        powerbrick.MotorStopAll()
    }
})

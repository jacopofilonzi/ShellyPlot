/**
 * Author: Filonzi Jacopo
 * GitHub: https://github.com/jacopofilonzi
 * 
 * Note: This script has been tested on Shelly Plus 2PM on a garage door.
 * Description: This script allows you to automatically open and close the cover by double tapping the switch,
 *              it might be unperfect in some cases beacouse it runs by watching when the cover is opening or closing
 *              so when the relé to the engine is activated and not when the switch is pressed due to the shelly lake of
 *              a double tap event.
 */


// CHANGE THIS
let tapDelay = 250; // delay between taps in milliseconds


// DON'T CHANGE THIS
let counter = 0; // counter to check the ammount of times the button has been pressed
let action = ""; // action to perform "open" or "close"
let timerStore; // timer variable




//Shelly Handler
Shelly.addStatusHandler(function (e) {
    if (e.component === "cover:0") 
    {
        if (e.delta.state === "opening")
        {
            print("open button pushed");

            action = "open";
            counter++;
            
            Timer.clear(time);
            time = Timer.set(tapDelay, false, editStatus);
        }
        else if (e.delta.state === "closing") 
        {
            print("close button pushed");

            action = "close";
            counter++;

            Timer.clear(time);
            timerStore = Timer.set(tapDelay, false, editStatus);
        }
    }
});

//Edit the status of the cover
function editStatus() {

    //Debug
    print("edit status invoked");
    print("counter: " + counter);
    print("action: " + action);


    if (counter == 2)
    { //If double tap is detected
        Timer.clear(timerStore);
        timerStore = "";

        if (action == "open") {
            print("opening automatically");
            Shelly.call("Cover.open", { id: 0 });
        } 
        else if (action == "close")
        {
            print("Closing automatically");
            Shelly.call("Cover.close", { id: 0 });
        }

        counter = 0;
        action = "";
    } 
    else
    { //Reset the counter and the action
        counter = 0;
        action = "";
        Timer.clear(timerStore);
        timerStore = "";
    }
}

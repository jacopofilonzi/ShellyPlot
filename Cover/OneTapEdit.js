/**
 * Author: Filonzi Jacopo
 * GitHub: https://github.com/jacopofilonzi
 * 
 * Note: This script has been tested on Shelly Plus 2PM on a garage door.
 * Description: This script allows you to automatically open and close the cover by tapping the switch one time and
 *              regulate the aperture percentage by holding the switch and releasing it to stop the cover.
 *
 * License: MIT
 */


// CHANGE THIS
let tapDelay = 600; // delay between taps in milliseconds


// DON'T CHANGE THIS
let action = ""; // action to perform "opening" or "closing"
let time = "";
let automatic = false;


Shelly.addStatusHandler(function(e) {
    if (e.component != "cover:0") return;

    switch (e.delta.state) {
        case "opening":
                print(e.delta.state);
                action = e.delta.state;
                time = Date.now();
            break;
        case "closing":
                print(e.delta.state);
                action = e.delta.state;
                time = Date.now();
            break;
        case "stopped":
            print(e.delta.state);
            if ((Date.now() - time) < tapDelay) {
                print("Automatically " + action);
                automatic = true;
                
                if (action == "opening")
                    Shelly.call("Cover.open", {id: 0});
                else if (action == "closing")
                    Shelly.call("Cover.close", {id: 0});
            }  
            break;
        default:
            break;
    }
})

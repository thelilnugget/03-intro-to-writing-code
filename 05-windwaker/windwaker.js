//----------------------------------------------------------------------------------------------------------------------
// Challenge 5: Windwaker
//----------------------------------------------------------------------------------------------------------------------

const keys = require('./lib/keys');
const sounds = require('./lib/songs');

//----------------------------------------------------------------------------------------------------------------------

let timeoutChecks = 0;
let timeoutHandle;
let currentKeys = [];

//----------------------------------------------------------------------------------------------------------------------

function clearKeys()
{
    // If we have an outstanding timer, we need to clear it.
    if (timeoutHandle)
    {
        clearTimeout(timeoutHandle);
        timeoutHandle = undefined;
    }

    // Visually put a space on the console, to make it easier to tell when we've cleared the current combination.
    console.log('');

    // Clear variables
    timeoutChecks = 0;
    currentKeys = [];
}

function setKeyTimeout()
{
    // If we have a currently running timer, we need to clear it and all variables associated with it.
    if (timeoutHandle)
    {
        clearTimeout(timeoutHandle);
        timeoutHandle = undefined;
        timeoutChecks = 0;
    }

    // Create a new timer
    timeoutHandle = setTimeout(() =>
    {
        // Clearing this makes it easy to tell if we have a currently running timer, or not
        timeoutHandle = undefined;

        // If the last thin in `currentKeys` is 'pause', that means we've inserted a pause and need to check for a 
        // timeout instead. (This is because we make this timer do double duty.)
        if (currentKeys[currentKeys.length - 1] === 'pause')
        {
            // With a .5s timeout, 4 timeouts is 2 seconds, our timeout value
            if (timeoutChecks < 4)
            {
                // Since we have less than 4 timeouts, we add one to the counter, and set a new timer.
                timeoutChecks += 1;
                setKeyTimeout();
            }
            else
            {
                // We've hit the timeout value, time to clear the keys
                clearKeys();
            }
        }
        else if (currentKeys.length > 0)
        {
            // The last thing in the array is not a 'pause', so we should insert one, but only if `currentKeys` isn't 
            // empty, since we can't start with a pause.
            currentKeys.push('pause');

            // Print out, as if it were a key
            console.log('pause!');

            // Now, do logic as if it were a key
            checkForSong();
            setKeyTimeout();
        }
        else
        {
            // Set a new timeout
            setKeyTimeout();
        }
    }, 500);
}

function checkForSong()
{
    // Build a string of the currently pressed keys

    const thePlaceForStrings = currentKeys.join(':');

    // Look up any song that matches

    const musics = sounds.songs[thePlaceForStrings];


    // If a song matches, we print out the song name, play the song, and then clear the `currentKeys` array.

    if(musics)
    {
        console.log(musics.name);
        sounds.playSong(musics.path);
        clearKeys();
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Application Start
//----------------------------------------------------------------------------------------------------------------------

console.log('Wind Waker Wand Simulator! Press arrow keys to emulate wand movements.');
console.log('Escape clears the current sequence, as does waiting 2 seconds between inputs. CTRL + d exists the app.\n');

//----------------------------------------------------------------------------------------------------------------------

keys.on('key', (key) =>
{
    if(['up', 'down', 'right', 'left'].includes(key.name))
    {
        console.log(key.name);
        currentKeys.push(key.name);
        checkForSong();
        setKeyTimeout();
    }

    if(key.name === 'escape')
    {
        clearKeys();
    }

    if(key.ctrl && key.name === 'd')
    {
        process.exit();
    } 
});

//----------------------------------------------------------------------------------------------------------------------

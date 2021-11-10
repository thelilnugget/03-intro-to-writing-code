//----------------------------------------------------------------------------------------------------------------------
// Songs and Sound Playing
//----------------------------------------------------------------------------------------------------------------------

const sound = require('sound-play');

//----------------------------------------------------------------------------------------------------------------------

const songs = {
    'up:left:right': {
        path: './sfx/windsRequiem.mp3',
        name: 'Wind\'s Requiem'
    },
    'down:right:left:up': {
        path: './sfx/balladOfGales.mp3',
        name: 'Ballad of Gales'
    },
    'left:pause:right:pause': {
        path: './sfx/commandMelody.mp3',
        name: 'Command Melody'
    },
    'right:left:down': {
        path: './sfx/songOfPassing.mp3',
        name: 'Song of Passing'
    },
    'down:down:pause:right:left:pause': {
        path: './sfx/earthGodsLyric.mp3',
        name: 'Earth God\'s Lyric'
    },
    'up:up:down:right:left:right': {
        path: './sfx/windGodsAria.mp3',
        name: 'Wind God\'s Aria'
    },
}

//----------------------------------------------------------------------------------------------------------------------

function playSong(songPath)
{
    sound.play(songPath, 1);
}

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    songs,
    playSong
};

//----------------------------------------------------------------------------------------------------------------------

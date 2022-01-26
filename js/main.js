"use strict"

// import {} from ".j"

const APP = {
    init: (ev) => {
        let currentTrack = 0;
        let player = document.getElementById('player');
        let btnPlay = document.getElementById('btnSkipPre');
        let btnPlay = document.getElementById('btnReplay');
        let btnPlay = document.getElementById('btnPlay');
        let btnPlay = document.getElementById('btnPause');
        let btnPlay = document.getElementById('btnStop');
        let btnPlay = document.getElementById('btnForward');
        let btnPlay = document.getElementById('btnSkipNext');
        let songList = [
        //array of objects representing the songs to be played
        ];
        btnStop.addEventListener('click', stopTrack);
        btnPlay.addEventListener('click', playTrack);
        player.addEventListener('ended', APP.playNextTrack);
        player.addEventListener('play', APP.startAnimations);
        player.addEventListener('durationchange', APP.updateTotalTime);
        player.addEventListener('timeupdate', APP.updateCurrentTime);
    },
    playTrack: (ev) => {
        if (!player.paused) return; //already playing
        player.src = songList[currentTrack].src;
        player.play();
        startAnimations();
    },
    stopTrack: (ev) => {
        player.pause();
        player.currentTime = 0;
        stopAnimations();
    },
    playNextTrack: (ev) => {

    },
    startAnimations: (ev) => {

    },
    updateTotalTime: (ev) => {

    },
    updateCurrentTime: (ev) => {

    },
};

document.addEventListener("DOMContentLoaded", APP.init);
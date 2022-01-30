"use strict"

import TRACKS from "./tracks.js"

const APP = {
    init: (ev) => {
        let currentTrack = 0;
        let player = document.getElementById('player');
        let btnSkipPre = document.getElementById('btnSkipPre');
        let btnReplay = document.getElementById('btnReplay');
        let btnPlay = document.getElementById('btnPlay');
        let btnPause = document.getElementById('btnPause');
        let btnStop = document.getElementById('btnStop');
        let btnForward = document.getElementById('btnForward');
        let btnSkipNext = document.getElementById('btnSkipNext');
        let songList = [
        //array of objects representing the songs to be played
        ];
        btnStop.addEventListener('click', APP.stopTrack);
        btnPlay.addEventListener('click', APP.playTrack);
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
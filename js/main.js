"use strict"

import TRACKS from "./tracks.js"

const APP = {
    init: () => {
        let currentTrack = 0;
        let player = document.getElementById('player');
        let btnSkipPre = document.getElementById('btnSkipPre');
        let btnReplay = document.getElementById('btnReplay');
        let btnPlay = document.getElementById('btnPlay');
        let btnPause = document.getElementById('btnPause');
        let btnStop = document.getElementById('btnStop');
        let btnForward = document.getElementById('btnForward');
        let btnSkipNext = document.getElementById('btnSkipNext');
        APP.songList()
        // btnStop.addEventListener('click', APP.stopTrack);
        // btnPlay.addEventListener('click', APP.playTrack);
        // player.addEventListener('ended', APP.playNextTrack);
        // player.addEventListener('play', APP.startAnimations);
        // player.addEventListener('durationchange', APP.updateTotalTime);
        // player.addEventListener('timeupdate', APP.updateCurrentTime);
    },
    songList: () => {
        TRACKS.forEach(track => {
            let div = document.createElement("div")
            div.classList.add("list-item")
            let playlistArea = document.getElementById("playlist-area")
            playlistArea.append(div)
            let img = document.createElement("img")
            img.src = track.img
            img.alt = "Track Thumbnail"
            div.append(img)
            let div2 = document.createElement("div")
            div2.classList.add("track-info-pl")
            div.append(div2)
            let artist = document.createElement("p")
            artist.classList.add("artist-list")
            artist.innerText = track.artist
            div2.append(artist)
            let song = document.createElement("p")
            song.classList.add("track-list")
            song.innerText = track.title
            div2.append(song)
            let audio = document.createElement("audio")
            audio.src = track.src
            audio.addEventListener("durationchange", (ev) => {
                let duration = ev.target.duration
                let durationMinutes =  Math.trunc(duration/60)
                if (durationMinutes < 10) {durationMinutes = "0" + durationMinutes}
                let durationSecondes = Math.trunc(duration % 60)
                if (durationSecondes < 10) {durationSecondes = "0" + durationSecondes}
                let formatedDuration = (durationMinutes + ":" + durationSecondes)
                let HTMLduration = document.createElement("p")
                HTMLduration.classList.add("duration")
                HTMLduration.innerText = formatedDuration
                div.append(HTMLduration)
            })
        })
    },
    // playTrack: (ev) => {
    //     if (!player.paused) return; //already playing
    //     player.src = songList[currentTrack].src;
    //     player.play();
    //     startAnimations();
    // },
    // stopTrack: (ev) => {
    //     player.pause();
    //     player.currentTime = 0;
    //     stopAnimations();
    // },
    // playNextTrack: (ev) => {

    // },
    // startAnimations: (ev) => {

    // },
    // updateTotalTime: (ev) => {

    // },
    // updateCurrentTime: (ev) => {

    // },
};

document.addEventListener("DOMContentLoaded", APP.init);
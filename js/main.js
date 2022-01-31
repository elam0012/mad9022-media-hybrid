"use strict"

import TRACKS from "./tracks.js"

let currentTrack = 0;
let player
let thumbnail = document.getElementById("thumbnail")
let audioTracks = document.getElementsByClassName("audioTrack")
let artistName = document.getElementById("artist-name")
let trackName = document.getElementById("track-name")
let listItems =document.getElementsByClassName("list-item")
let durations =document.getElementsByClassName("duration")
let trackDuration = document.getElementById("track-duration")

const APP = {
    init: () => {
        let btnSkipPre = document.getElementById('btnSkipPre');
        let btnReplay = document.getElementById('btnReplay');
        let btnPlay = document.getElementById('btnPlay');
        let btnPause = document.getElementById('btnPause');
        let btnStop = document.getElementById('btnStop');
        let btnForward = document.getElementById('btnForward');
        let btnSkipNext = document.getElementById('btnSkipNext');
        APP.songList()
        thumbnail.src = audioTracks[currentTrack].dataset.img
        artistName.innerText = audioTracks[currentTrack].dataset.artist
        trackName.innerText = audioTracks[currentTrack].dataset.title
        btnPlay.addEventListener ("click", () => {
            APP.playTrack()
        });
        btnPause.addEventListener ('click', () => {
            APP.pauseTrack()
        });
        btnStop.addEventListener ('click', () => {
            APP.stopTrack()
        });
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
            APP.createAudio(track, div)
        })
    },
    createAudio: (track, div) => {
        let audio = document.createElement("audio")
        audio.classList.add("audioTrack")
        let main = document.getElementById("main")
        main.append(audio)
        audio.src = track.src
        audio.dataset.artist = track.artist
        audio.dataset.title = track.title
        audio.dataset.img = track.img
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
    },
    playTrack: (ev) => {
        player = audioTracks[currentTrack]
        if (!player.paused) return; //already playing
        thumbnail.src = audioTracks[currentTrack].dataset.img
        artistName.innerText = audioTracks[currentTrack].dataset.artist
        trackName.innerText = audioTracks[currentTrack].dataset.title
        player.play()
        btnPlay.classList.add("display-none")
        btnPause.classList.remove("display-none")
        listItems[currentTrack].classList.add("active")
        trackDuration.innerText = durations[currentTrack].innerText
        // startAnimations();
    },
    pauseTrack: (ev) => {
        if (player.paused) return;
        player.pause();
        btnPause.classList.add("display-none")
        btnPlay.classList.remove("display-none")
        // stopAnimations();
    },
    stopTrack: (ev) => {
        player.pause();
        player.currentTime = 0;
        btnPause.classList.add("display-none")
        btnPlay.classList.remove("display-none")
        // stopAnimations();
    },
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
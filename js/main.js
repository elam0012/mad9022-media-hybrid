"use strict"

import TRACKS from "./tracks.js"

const APP = {
    currentTrack: 0,
    artistName: null,
    player: null,
    thumbnail: null,
    audioTracks: null,
    trackName: null,
    listItems: null,
    durations: null,
    trackDuration: null,
    init: () => {
        APP.artistName = document.getElementById("artist-name") 
        APP.thumbnail = document.getElementById("thumbnail")
        APP.audioTracks = document.getElementsByClassName("audioTrack")
        APP.trackName = document.getElementById("track-name")
        APP.listItems =document.getElementsByClassName("list-item")
        APP.durations =document.getElementsByClassName("duration")
        APP.trackDuration = document.getElementById("track-duration")
        let btnSkipPre = document.getElementById('btnSkipPre');
        let btnReplay = document.getElementById('btnReplay');
        let btnPlay = document.getElementById('btnPlay');
        let btnPause = document.getElementById('btnPause');
        let btnStop = document.getElementById('btnStop');
        let btnForward = document.getElementById('btnForward');
        let btnSkipNext = document.getElementById('btnSkipNext');
        APP.songList()
        APP.thumbnail.src = APP.audioTracks[APP.currentTrack].dataset.img
        APP.artistName.innerText = APP.audioTracks[APP.currentTrack].dataset.artist
        APP.trackName.innerText = APP.audioTracks[APP.currentTrack].dataset.title
        btnPlay.addEventListener ("click", () => {
            APP.playTrack()
        });
        btnPause.addEventListener ('click', () => {
            APP.pauseTrack()
        });
        btnStop.addEventListener ('click', () => {
            APP.stopTrack()
        });
        // APP.player.addEventListener('ended', APP.playNextTrack);
        // APP.player.addEventListener('play', APP.startAnimations);
        // APP.player.addEventListener('durationchange', APP.updateTotalTime);
        // APP.player.addEventListener('timeupdate', APP.updateCurrentTime);
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
        APP.player = APP.audioTracks[APP.currentTrack]
        if (!APP.player.paused) return; //already playing
        APP.thumbnail.src = APP.audioTracks[APP.currentTrack].dataset.img
        APP.artistName.innerText = APP.audioTracks[APP.currentTrack].dataset.artist
        APP.trackName.innerText = APP.audioTracks[APP.currentTrack].dataset.title
        APP.player.play()
        btnPlay.classList.add("display-none")
        btnPause.classList.remove("display-none")
        APP.listItems[APP.currentTrack].classList.add("active")
        APP.trackDuration.innerText = APP.durations[APP.currentTrack].innerText
        // startAnimations();
    },
    pauseTrack: (ev) => {
        if (APP.player.paused) return;
        APP.player.pause();
        btnPause.classList.add("display-none")
        btnPlay.classList.remove("display-none")
        // stopAnimations();
    },
    stopTrack: (ev) => {
        APP.player.pause();
        APP.player.currentTime = 0;
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
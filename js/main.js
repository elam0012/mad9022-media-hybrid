"use strict"

import TRACKS from "./tracks.js"

const APP = {
    currentTrack: 0,
    player: null,
    audioTracks: null,
    listItems: null,
    trackLength: null,
    init: () => { 
        APP.audioTracks = document.getElementsByClassName("audio-track")
        APP.listItems =document.getElementsByClassName("list-item")
        APP.buildSongList()
        APP.playerBackground()
        APP.addListeners()
        APP.selectTrack()
    },
    buildSongList: () => {
        APP.trackLength = TRACKS.length
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
        audio.classList.add("audio-track")
        let main = document.getElementById("main")
        main.append(audio)
        audio.src = track.src
        audio.dataset.artist = track.artist
        audio.dataset.title = track.title
        audio.dataset.img = track.img
        APP.setDuration(audio, div)
    },
    setDuration: (audio, div) => {
        audio.addEventListener("durationchange", (ev) => {
            let duration = ev.target.duration
            let durationMinutes =  Math.trunc(duration/60)
            if (durationMinutes < 10) durationMinutes = "0" + durationMinutes
            let durationSecondes = Math.trunc(duration % 60)
            if (durationSecondes < 10) durationSecondes = "0" + durationSecondes
            let formatedDuration = (durationMinutes + ":" + durationSecondes)
            let HTMLduration = document.createElement("p")
            HTMLduration.classList.add("duration")
            HTMLduration.innerText = formatedDuration
            div.append(HTMLduration)
            audio.dataset.duration = formatedDuration
        })
    },
    playerBackground: () => {
        let thumbnail = document.getElementById("thumbnail")
        thumbnail.src = APP.audioTracks[APP.currentTrack].dataset.img
        let artistName = document.getElementById("artist-name")
        artistName.innerText = APP.audioTracks[APP.currentTrack].dataset.artist
        let trackName = document.getElementById("track-name")
        trackName.innerText = APP.audioTracks[APP.currentTrack].dataset.title
    },
    addListeners: () => {
        let btnPlay = document.getElementById('btnPlay');
        btnPlay.addEventListener ("click", APP.playTrack)
        let btnPause = document.getElementById('btnPause');
        btnPause.addEventListener ('click', APP.pauseTrack)
        let btnStop = document.getElementById('btnStop');
        btnStop.addEventListener ('click', APP.stopTrack)
        let btnNext = document.getElementById('btnSkipNext');
        btnNext.addEventListener ("click", APP.changeTrack)
        let btnPrevious = document.getElementById('btnSkipPre');
        btnPrevious.addEventListener ("click", APP.changeTrack)
        let btnForward10 = document.getElementById('btnForward');
        btnForward10.addEventListener ("click", APP.forward10)
        let btnReplay10 = document.getElementById('btnReplay');
        btnReplay10.addEventListener ("click", APP.replay10)
    },
    selectTrack: () => {
        let arr = [].slice.call(APP.listItems)
        arr.forEach((item, index) => {
            item.addEventListener("click" , () => {
                APP.player = APP.audioTracks[APP.currentTrack]
                APP.stopTrack()
                APP.currentTrack = index
                APP.player = APP.audioTracks[APP.currentTrack]
                APP.playerBackground()
                APP.playTrack()
            })
        })
    },
    playTrack: () => {
        APP.updateTotalDuration()
        if (!APP.player.paused) return
        APP.player.play()
        btnPlay.classList.add("display-none")
        btnPause.classList.remove("display-none")
        APP.listItems[APP.currentTrack].classList.add("active")
    },
    pauseTrack: () => {
        if (APP.player.paused) return
        APP.player.pause();
        btnPause.classList.add("display-none")
        btnPlay.classList.remove("display-none")
    },
    stopTrack: (ev) => {
        APP.player.pause();
        APP.player.currentTime = 0;
        btnPause.classList.add("display-none")
        btnPlay.classList.remove("display-none")
        if (!ev) APP.listItems[APP.currentTrack].classList.remove("active") //to keep the current track highlighted if Stop button clicked
    },
    changeTrack: (ev) => {
        let pauseStatus = APP.player.paused
        APP.stopTrack()
        ev.path[1].id === "btnSkipNext" ? APP.nextTrack() : APP.previousTrack()
        if (ev) APP.listItems[APP.currentTrack].classList.add("active") // to highlight the track when click on button
        if (!pauseStatus) APP.playTrack()
        APP.playerBackground()
        APP.updateTotalDuration()
    },
    nextTrack: () => {
        APP.currentTrack ++
        if (APP.currentTrack === TRACKS.length) APP.currentTrack = 0
    },
    previousTrack: () => {
        if (APP.currentTrack === 0) APP.currentTrack = TRACKS.length
        APP.currentTrack --
    },
    forward10: (ev) => {
        APP.player.currentTime = APP.player.currentTime + 10
    },
    replay10: (ev) => {
        APP.player.currentTime = APP.player.currentTime - 10
    },
    updateTotalDuration: () => {
        APP.player = APP.audioTracks[APP.currentTrack]
        let trackDuration = document.getElementById("track-duration")
        trackDuration.innerText =  APP.player.dataset.duration
    },
};

document.addEventListener("DOMContentLoaded", APP.init);
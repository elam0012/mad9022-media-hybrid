"use strict"

import TRACKS from "./tracks.js"

const APP = {
    currentTrack: 0,
    player: null,
    audioTracks: null,
    listItems: null,
    init: () => { 
        APP.audioTracks = document.getElementsByClassName("audio-track")
        APP.listItems =document.getElementsByClassName("list-item")
        APP.buildSongList()
        APP.playerBackground()
        APP.mapButtons()
        APP.addListeners()
        APP.selectTrack()
    },
    buildSongList: () => {
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
            if (durationMinutes < 10) {durationMinutes = "0" + durationMinutes}
            let durationSecondes = Math.trunc(duration % 60)
            if (durationSecondes < 10) {durationSecondes = "0" + durationSecondes}
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
    mapButtons: () => {
        let btnPlay = document.getElementById('btnPlay');
        let btnSkipPre = document.getElementById('btnSkipPre');
        let btnReplay = document.getElementById('btnReplay');
        let btnPause = document.getElementById('btnPause');
        let btnStop = document.getElementById('btnStop');
        let btnForward = document.getElementById('btnForward');
        let btnSkipNext = document.getElementById('btnSkipNext');
    },
    addListeners: () => {
        btnPlay.addEventListener ("click", APP.playTrack)
        btnPause.addEventListener ('click', APP.pauseTrack)
        btnStop.addEventListener ('click', APP.stopTrack)
        btnNext.addEventListener ("click", APP.nextTrack)
        btnPrevious.addEventListener ("click", APP.previousTrack)
        btnForward10t.addEventListener ("click", APP.forward10)
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
        APP.player = APP.audioTracks[APP.currentTrack]
        if (!APP.player.paused) return
        APP.player.play()
        btnPlay.classList.add("display-none")
        btnPause.classList.remove("display-none")
        APP.listItems[APP.currentTrack].classList.add("active")
        let trackDuration = document.getElementById("track-duration")
        trackDuration.innerText =  APP.player.dataset.duration
    },
    pauseTrack: () => {
        if (APP.player.paused) return;
        APP.player.pause();
        btnPause.classList.add("display-none")
        btnPlay.classList.remove("display-none")
    },
    stopTrack: () => {
        APP.player.pause();
        APP.player.currentTime = 0;
        btnPause.classList.add("display-none")
        btnPlay.classList.remove("display-none")
        APP.listItems[APP.currentTrack].classList.remove("active")
    },
    nextTrack: () => {
        console.log(ev.target)
        //stop audio playing - this could be a function call
        //change CSS class indicating that a track is playing - this could be called from stop audio function
        //hide pause button and show play button - this could be called from stop audio function
        APP.currentTrack = APP.changeNextTrack();
    },
    changeNextTrack: () => {
        let len = TRACKS.length; //get length of array
        APP.currentTrack++; //increment the currentTrack number
        if (APP.currentTrack >= len) {
            //if the current track number is greater than or equal to the length
            APP.currentTrack = 0;
        } 
    },
    previousTrack: () => {
        //user clicked on the next button
        console.log(ev.target)
        //stop audio playing - this could be a function call
        //change CSS class indicating that a track is playing - this could be called from stop audio function
        //hide pause button and show play button - this could be called from stop audio function
        APP.currentTrack = APP.changePreviousTrack();
    },
    changePreviousTrack: () => {
        let len = TRACKS.length; //get length of array
        APP.currentTrack--; //increment the currentTrack number
        if (APP.currentTrack === 0) {
            APP.currentTrack = len+1;
        }
    },
    forward10: () => {
        console.log(ev.target)
        
    },
    replay10: () => {
        console.log(ev.target)
        
    }
};

document.addEventListener("DOMContentLoaded", APP.init);
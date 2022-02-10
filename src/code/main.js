var sound = new Audio()
var clicks = 0
var sound_i = 0
var playlistID = -1
var text = ""
let i, iSystem
var nextVar = false
const data = {
   "dev": "patYczakus",
   "playlists": [
        {
            "playlistTitle": "Cute L0ve",
            "description": "Playlista dedykowana dla wspaniałego słodziaka :3",
            "playlistAuthor": "patYczakus",
            "playlistImg": "heart-5983106_960_720.png",
            "sources": [
                { "soundTitle": "Pragnienie miłości", "soundAuthors": "Akcent", "src": { "sound": "akcent-pragnienie-milosci.mp3", "img": "pragnienie-milosci-b-iext49271929.jpg" } },
                { "soundTitle": "Nadzieja", "soundAuthors": "Skaner", "src": { "sound": "skaner-nadzieja.mp3", "img": "maxresdefault.jpg" } },
                { "soundTitle": "Dlaczego", "soundAuthors": "Boys", "src": { "sound": "boys-dlaczego.mp3", "img": "boys-dlaczego-soundcloud.jpg" } },
                { "soundTitle": "OBOK", "soundAuthors": "Żabson, Vladimir Chauchemar", "src": { "sound": "zabson-obok-feat-vladimir-cauchemar.mp3", "img": "obok.jfif" } },
                { "soundTitle": "Sama [Explicit]", "soundAuthors": "E V, Boyfifty", "src": { "sound": "e-v-sama-prod-boyfifty.mp3", "img": "NaN" } },
                { "soundTitle": "Nanana", "soundAuthors": "Detmi", "src": { "sound": "detmi-nanana-official-video.mp3", "img": "1609258793_nana.jpg" } },
            ]
        },
    ]
}

function loading() {
    text = ""
    iSystem = 0
    for (i = 0; i<data.playlists["length"]; i++) {
        text += `
        <div class="playlist">
            <div class="playlistImg"><img src="src/albums_images/${data.playlists[iSystem].playlistImg}" width="150px" height="150px"></div>
            <div class="playlistInfo">
                ${data.playlists[iSystem].playlistTitle} <span class="authors">Od: ${data.playlists[iSystem].playlistAuthor}</span><br />
                <span class="description">${data.playlists[iSystem].description}</span><br />
                <button onclick="albumPlay(${iSystem})">Słuchaj</button>
            </div>
        </div>
        `
        iSystem++
    }
}
window.onload = loading()
window.onload = function() {
    document.getElementById("playlists").innerHTML = text
}

// --------------------------------------------------------------------------------------------------------------------------

function playerOn(source) {
    sound.volume = 0
    try { document.getElementById("player").classList.add("show"); document.getElementById("timer").classList.remove("stop") } catch (err) {}
    sound = new Audio(`./src/music/sounds/${source}`)
    nextVar = false
    setTimeout(function(){sound.volume = document.getElementById("value").value / 100; playSound()}, 1000)
}

function playerOff() {
    try { document.getElementById("player").classList.remove("show") } catch (err) {}

    sound.pause()
    sound.currentTime = 0;
    sound_i++
}

function playSound() {
    playerTimer()
    sound.play()
}

function playerTimer() /* Czas */ {
    document.getElementById("timer").style.width = `${sound.currentTime / sound.duration * 100}%`
    if (document.getElementById("timer").style.width.replace("%", "") >= 100 || nextVar) next() 
    else setTimeout(playerTimer, 100)
}

function volume() {
    sound.volume = document.getElementById("value").value / 100
}

//------------------------------------------
function albumPlay(ID) {
    playlistID = ID
    sound_i = 0

    text = ""
    if (data.playlists[playlistID].sources[sound_i].src.img != "NaN") 
        text += `<div style="float: left;"><img src="src/music/images/${data.playlists[playlistID].sources[sound_i].src.img}" width="43px" height="43px" /></div>`
    text += `<div style="float: left; margin-left: 5px">${data.playlists[playlistID].sources[sound_i].soundTitle}<br /><span class="authors">${data.playlists[playlistID].sources[sound_i].soundAuthors}</div></span>`

    document.getElementById("info").innerHTML = text
    playerOn(data.playlists[playlistID].sources[sound_i].src.sound)
}

function next() {
    nextVar = false
    document.getElementById("timer").style.width = 0
    clicks = 0
    document.getElementById("pause").innerText = "⏸"
    document.getElementById("timer").classList.remove("stop")
    sound.pause()
    sound.currentTime = 0;
    sound_i++
    if (sound_i < data.playlists[playlistID].sources["length"]) {
        text = ""
        if (data.playlists[playlistID].sources[sound_i].src.img != "NaN") text += `<div style="float: left;"><img src="src/music/images/${data.playlists[playlistID].sources[sound_i].src.img}" width="43px" height="43px" /></div>`
        text += `<div style="float: left; margin-left: 5px">${data.playlists[playlistID].sources[sound_i].soundTitle}<br /><span class="authors">${data.playlists[playlistID].sources[sound_i].soundAuthors}</div></span>`

        document.getElementById("info").innerHTML = text
        setTimeout(function(){ playerOn(data.playlists[playlistID].sources[sound_i].src.sound) }, 50)
    }
    else playerOff()
}

function skip() { nextVar = true }

function soundChange() /* Czyli pauza */ {
    clicks++
    clicks = clicks % 2
    document.getElementById("timer").classList.toggle("stop")
    if (clicks) { 
        sound.pause()
        document.getElementById("pause").innerText = "▶"
    }
    else {
        sound.play()
        document.getElementById("pause").innerText = "⏸"
    }
}
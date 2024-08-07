var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var videoID;
var playlistID;

function onYouTubeIframeAPIReady() {
    // player = new YT.Player('existing-iframe-example', {
    //     events: {
    //       'onReady': onPlayerReady,
    //       'onStateChange': onPlayerStateChange
    //     }
    // });
}

function onPlayerReady(event) {
    console.log('Player ready')
    if(playlistID){
        event.target.cuePlaylist({listType: "playlist", list: playlistID, index: 0, startSeconds: 0});
    }
    //event.target.playVideoAt(0);
    setupMediaSession();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        navigator.mediaSession.playbackState = "playing";
    } 
    else {
        navigator.mediaSession.playbackState = "paused";
    }
}

function embedYouTube() {
    const playlistUrl = document.getElementById('youtubeUrl').value;
    const embedContainer = document.getElementById('embedContainer');

    // Extract the playlist ID from the URL
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:.*list=([a-zA-Z0-9_-]+))?/;
    const match = playlistUrl.match(youtubeRegex);
    videoID = match[1];
    playlistID = match[2];

    if (playlistID || videoID) {
        const embedHtml = `
            <iframe id='embedIFrame' width="560" height="315"
                src="https://www.youtube.com/embed/${videoID}?enablejsapi=1"
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>`;
        embedContainer.innerHTML = embedHtml;

        player = new YT.Player('embedIFrame', {
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
        });
    }
    else {
        embedContainer.innerHTML = '<p>Please enter a valid YouTube video or playlist URL.</p>';
    }
}

function setupMediaSession() {
    if ('mediaSession' in navigator) {
        // navigator.mediaSession.metadata = new MediaMetadata({
        //     title: 'Video Title', // Replace with your video title
        //     artist: 'Artist Name', // Replace with artist name or channel name
        //     album: 'Album Name', // Replace with album name if applicable
        //     artwork: [
        //         { src: 'path-to-your-album-art.jpg', sizes: '96x96', type: 'image/jpeg' }
        //     ]
        // });

        navigator.mediaSession.setActionHandler('play', function() {
            player.playVideo();
            navigator.mediaSession.playbackState = "playing";
        });

        navigator.mediaSession.setActionHandler('pause', function() {
            player.pauseVideo();
            navigator.mediaSession.playbackState = "paused";
        });

        navigator.mediaSession.setActionHandler('seekbackward', function() {
            player.seekTo(player.getCurrentTime() - 10);
        });

        navigator.mediaSession.setActionHandler('seekforward', function() {
            player.seekTo(player.getCurrentTime() + 10);
        });

        navigator.mediaSession.setActionHandler('stop', function() {
            player.stopVideo();
            navigator.mediaSession.playbackState = "none";
        });

        navigator.mediaSession.setActionHandler("previoustrack", () => {
            player.nextVideo();
        });

        navigator.mediaSession.setActionHandler("nexttrack", () => {
            player.previousVideo();
        });
    }
}

function loadRemoteFile(url){
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // or response.text() if you expect plain text
        })
        .then(data => {
            console.log(data); // Handle the data from the API
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

var url = 'https://youtubesync.onrender.com/api/data'
loadRemoteFile(url);

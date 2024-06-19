var tag = document.createElement('script');
  tag.id = 'iframe-demo';
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  function onYouTubeIframeAPIReady() {
    // player = new YT.Player('existing-iframe-example', {
    //     events: {
    //       'onReady': onPlayerReady,
    //       'onStateChange': onPlayerStateChange
    //     }
    // });
  }
  function onPlayerReady(event) {
    document.getElementById('embedIFrame').style.borderColor = '#FF6D00';
  }

  function changeBorderColor(playerStatus) {
    var color;
    if (playerStatus == -1) {
      color = "#37474F"; // unstarted = gray
    } else if (playerStatus == 0) {
      color = "#FFFF00"; // ended = yellow
    } else if (playerStatus == 1) {
      color = "#33691E"; // playing = green
    } else if (playerStatus == 2) {
      color = "#DD2C00"; // paused = red
    } else if (playerStatus == 3) {
      color = "#AA00FF"; // buffering = purple
    } else if (playerStatus == 5) {
      color = "#FF6DOO"; // video cued = orange
    }
    if (color) {
      document.getElementById('embedIFrame').style.borderColor = color;
    }
  }
  function onPlayerStateChange(event) {
    changeBorderColor(event.data);
  }

  function embedYouTube() {
    const playlistUrl = document.getElementById('youtubeUrl').value;
    const embedContainer = document.getElementById('embedContainer');

    // Extract the playlist ID from the URL
    const urlParams = new URLSearchParams(new URL(playlistUrl).search);
    const videoID = urlParams.get("v")
    const playlistID = urlParams.get('list');

    if (playlistID) {
        const embedHtml = `
            <iframe id='embedIFrame' width="560" height="315"
                src="https://www.youtube.com/embed/videoseries?list=${playlistID}?enablejsapi=1"
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
    else if(videoID){
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

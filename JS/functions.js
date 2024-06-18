// var form = $('#youtubeurl').on('submit', function(e){
//     e.preventDefault()
//     let url = $('input.url').val()
//     socket.emit('new url', {
//         url : url
//     })
//     $('input.url').val('').focus() // clear text field
// })

function embedPlaylist() {
    const playlistUrl = document.getElementById('playlistUrl').value;
    const embedContainer = document.getElementById('embedContainer');

    // Extract the playlist ID from the URL
    const urlParams = new URLSearchParams(new URL(playlistUrl).search);
    const videoID = urlParams.get("v")
    const playlistID = urlParams.get('list');

    if (playlistID) {
        const embedHtml = `
            <iframe width="560" height="315"
                src="https://www.youtube.com/embed/videoseries?list=${playlistID}"
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>`;
        embedContainer.innerHTML = embedHtml;
    }
    else if(videoID){
        const embedHtml = `
            <iframe width="560" height="315"
                src="https://www.youtube.com/embed/${videoID}"
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>`;
        embedContainer.innerHTML = embedHtml;
    }
    else {
        embedContainer.innerHTML = '<p>Please enter a valid YouTube video or playlist URL.</p>';
    }
}
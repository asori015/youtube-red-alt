var form = $('#youtubeurl').on('submit', function(e){
    e.preventDefault()
    let url = $('input.url').val()
    socket.emit('new url', {
        url : url
    })
    $('input.url').val('').focus() // clear text field
})
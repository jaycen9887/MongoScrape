$(document).on('click', '.save', function() {
    let thisId = $(this).attr('data-id');
        $.ajax({
            method: 'POST',
            url: '/save/' + thisId,
        }).done((data)=> {
            //console.log('Saved', data);
        });
});

$(document).on('click', '#saveBtn', function(){
    let thisId = $(articleId).text();
    //console.log(thisId);
    let thisBody = $(noteContent).val();
    //console.log(thisBody);

    $.ajax({
        method: 'POST',
        url: '/notes/' + thisId,
        data: {
            newNote: thisBody
        } 
    }).done((data) => {

    })
});


$(document).on('click', '.delete', function(){
    console.log('Removed');
    let thisId = $(this).attr('data-id');

    $.ajax({
        method: 'POST',
        url: '/delete/' + thisId,
    }).done((data)=> {
        //console.log(data);
    });
});

$(document).on('click', '#addNotes', function() {
    //console.log('Note');
    let thisId = $(this).attr('data-id');
    $(articleId).text(thisId);
    //console.log(thisId);
    $('articleTitle').text(thisId);
    $.ajax({
        method: 'GET',
        url: '/notes/' + thisId
    }).done((data) => {
        $.getJSON('/notes/:id', function(data){
            //console.log("DATA!!!", data);
            for(var i = 0; i < data.length; i++){
                //console.log('DATA: ',data[i]);
                $('#articleNotes').append('<div id="content" class="col s8"><p>' + data[i].note + '</p>');
                $('#articleNotes').append('<div id="links" class="col s4"><span class="deleteNote"<i data-id="' + data[i]._id + '" class="small material-icons">delete</i></span><span class="editNote"<i data-id="' + data[i]._id + '" class="small material-icons">edit</i></span></div>');
            }
        });
    });
});


/* $('#addNote').on('click', () => {
    let thisId = $(this).attr('data-id');
    
    $.ajax({
        method: "GET",
        url: '/articles/' + thisId
    }).done((data)=> {
        console.log(data);

        if(data.note){
            //put existing notes in div
        }
    });
});

$('#saveNote').on('click', () => {
    let thisId = $(this).attr('data-id');
    
    $.ajax({
        method: 'POST',
        url: '/articles/' + thisId,
        data: {
            title: $('#titleInput').val(),
            body: $('#bodyInput').val()
        }
    }).done((data)=> {
        console.log(data);
    });
    $('#titleInput').val('');
    $('#bodyInput').val('');
}); */
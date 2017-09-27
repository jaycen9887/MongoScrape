$(document).on('click', '.save', function() {
    
    console.log('SAVED!');
    let thisId = $(this).attr('data-id');
    let thisSave = $(this).attr('data-saved');
    console.log('ID: ', thisId, " Save: ", thisSave);
        $.ajax({
            method: 'POST',
            url: '/save/' + thisId,
            data: {
                saved: thisSave
            }
        }).done((data)=> {
            console.log(data);
        });
        
});


$(document).on('click', '.delete', function(){
    console.log('Removed');
    let thisId = $(this).attr('data-id');

    $.ajax({
        method: 'POST',
        url: '/delete/' + thisId,
    }).done((data)=> {
        console.log(data);
    });
});

$(document).on('click', '.note', function() {
    console.log('Note');
});

$('#addNote').on('click', () => {
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
        //$('#notes').empty();

    });
    $('#titleInput').val('');
    $('#bodyInput').val('');
});
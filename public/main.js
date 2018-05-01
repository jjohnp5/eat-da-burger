$(document).ready(()=>{
    updateLists();
    $('#alert').hide();
})

$(document).on('click','.delete', function(e){
    console.log($(this).data('burger'));
    $.post(`/devour/${$(this).data('burger')}`)
        .then(data =>{
            if(data.response){
                $('#alert').removeClass('alert-danger').addClass('alert-success').text('Successfully devoured burger.');
            }else{
                $('#alert').removeClass('alert-success').addClass('alert-danger').text('Failed to devour burger. Try again later.')
            }

            updateLists();
        })
})

$('input[type=submit]').on('click', (e)=>{
    e.preventDefault();
    $.post('/add/burger', {burger: $('#burger').val().trim()}).then(d=>{
        if(d.response){
            $('#alert').removeClass('alert-danger').addClass('alert-success').text('Successfully added to burger list.');
        }else{
            $('#alert').removeClass('alert-success').addClass('alert-danger').text('Failed to add to db. Try again later.')
        }
        $('#alert').show();
    })
    $('#burger').val('');
    updateLists();
})


function updateLists(){
    $('.undevoured-burgers').empty();
    $('.devoured-burgers').empty();
    $.get('/burgers').then(d=>{
        console.log(d);
        d.forEach(b => {
    
        if(b.devoured === 0){
            let template = `
            <li>${b.burger_name}  <span class="delete pull-right" data-burger="${b.id}">Devour</span></li>
        `;
        $('.undevoured-burgers').append(template);
        }else{
            let template = `
            <li>${b.burger_name} </li>
        `;
        $('.devoured-burgers').append(template);
        }
        
        })
    })
}
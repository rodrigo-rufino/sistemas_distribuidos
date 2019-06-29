var mid = 'http://localhost:5000/musicfy/';

$(document).ready(function() {
    $.ajax({
        url: mid + 'listarGeneros',
        type: 'GET',
        success: function(result) {
            $.each(result, function(indice, genero) {
                $("#genero").append(`<option value="` + genero.descricao + `">` + genero.descricao + `</option>`);
            });
        },
        error: function() {
            alert('Houve um erro.');
        },
        complete: function() {
            $('#genero').formSelect();
        }
    })
});

$("#genero").change(function() {
    //$("#tabela > tbody").empty();
    $("#lista").empty();

    var genero_id = this.value;
    
    $.ajax({
        url: mid + 'buscarMusicaPorGenero?genero_id=' + genero_id,
        type: 'GET',
        beforeSend: function() {
            $("#genero").attr("disabled", true);
        },
        success: function(result) {
            /*$.each(result, function(indice, musica) {
                $("#tabela > tbody").append(`<tr>`
                    +`<td>`+ musica.musica_id + `</td>`
                    +`<td>`+ musica.titulo + `ml</td>`
                    +`<td>`+ musica.artista + `</td>`
                    +`</tr>`);
            });*/

            $.each(result, function(indice, musica) {
                $("#lista").append(`<ul>`
                    +`<li>`+ musica.musica_id + `</td>`
                        + `<ul>`
                        +`<li>`+ musica.titulo + `ml</td>`
                        +`<li>`+ musica.artista + `</td>`
                        +`</ul>`
                    +`</ul>`);
            });

        },
        error: function() {
            alert('Houve um erro.');
        },
        complete: function() {
            $("#genero").attr("disabled", false);
        }
    })
});
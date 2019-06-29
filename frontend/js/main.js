var mid = 'http://localhost:5000/musicfy/';

function disable_box(state) {
    $("#genero").attr("disabled", state);
}

$(document).ready(function () {
    console.log('ready');

    $.ajax({
        url: mid + 'listarGeneros',
        beforeSend: () => {
            console.log(`before send`);
            disable_box(true);
        }
    }).done(result => {
        console.log(`received results: ${JSON.stringify(result)}`);
        $.each(result, function (indice, genero) {
            $("#genero").append(`<option value="` + genero.descricao + `">` + genero.descricao + `</option>`);
        });
    }).fail((err) => {
        alert(`Erro: ${JSON.stringify(err)}`);
    }).always(() => {
        disable_box(false);
    });

    $("#genero").change(() => {
        //$("#tabela > tbody").empty();
        $("#lista").empty();

        var genero_id = this.value;

        $.ajax({
            url: mid + 'buscarMusicaPorGenero?genero_id=' + genero_id,
            beforeSend: () => {
                disable_box(true);
            }
        }).done(result => {
            console.log(`received results: ${JSON.stringify(result)}`);
            $.each(result, function (indice, musica) {
                $("#lista").append(`<ul>`
                    + `<li>` + musica.musica_id + `</td>`
                    + `<ul>`
                    + `<li>` + musica.titulo + `ml</td>`
                    + `<li>` + musica.artista + `</td>`
                    + `</ul>`
                    + `</ul>`);
            });
        }).fail((err) => {
            alert(`Erro: ${JSON.stringify(err)}`);
        }).always(() => {
            disable_box(false);
        });
    });
});

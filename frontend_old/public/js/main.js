function disable_refresh_btn(state) {
    $('#refresh_btn').prop('disabled', state);
}

function disable_get_btn(state) {
    $('#get_lote').prop('disabled', state);
}

function make_lotes_options(arr) {
    var options = '<option value="_placeholder">Selecione o Lote</option>';
    for (var i = 0; i < arr.length; i++) {
        options += `<option value="${arr[i]}">${arr[i]}</option>\n`;
    }
    return options;
}

function get_lotes() {
    $.ajax({
        url: 'http://localhost:5000/toddy/listarLotes',
        beforeSend: () => {
            disable_refresh_btn(true);
        }
    }).done(data => {
        $('#lotes').html(make_lotes_options(data));
    }).fail(() => {
        alert(`Não foi possível buscar os lotes`);
    }).always(() => {
        disable_refresh_btn(false);
    });
}

function make_lote_table(data) {
    var table = "";
    for (var i = 0; i < data.length; i++) {
        table += "<tr>\n";
        table += `<td>${data[i]._id}</td>\n`;
        table += `<td>${data[i].lote}</td>\n`;
        table += `<td>${data[i].conteudo}</td>\n`;
        table += `<td>${data[i].validade}</td>\n`; 
        table += "</tr>\n";
    }
    return table;
}

function get_single_lote() {
    const lote = $('#lotes').val();

    if (lote === '_placeholder') {
        alert('Por favor, selecione um lote');
    } else {
        $.ajax({
            url: `http://localhost:5000/toddy/listar?lote=${lote}`,
            beforeSend: () => {
                disable_get_btn(true);
            }
        }).done(data => {
            $("#lote-table-body").html(make_lote_table(data));
        }).fail(() => {
            alert(`Não foi possível buscar o lote ${lote}`);
        }).always(() => {
            disable_get_btn(false);
        });
    }
}

$(document).ready(() => {
    get_lotes();
    $('#refresh_btn').click(get_lotes);
    $('#get_lote').click(get_single_lote);
});

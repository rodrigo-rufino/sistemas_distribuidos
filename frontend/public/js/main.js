function disable_refresh_btn(state) {
    $('#refresh_btn').prop('disabled', state);
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

function get_single_lote() {
    // TODO
    // get every toddinho from specified lote
}

$(document).ready(() => {
    get_lotes();
    $('#refresh_btn').click(get_lotes);
    $('#get_lote').click(get_single_lote);
});

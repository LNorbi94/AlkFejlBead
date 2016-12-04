function ajaxSearch(url, name) {
  const headers = {
    'csrf-token': $('[name="_csrf"]').val()
  }
  return Promise.resolve(
    $.post({
      url,
      method: 'POST',
      dataType: 'json',
      headers,
      data: { todoName: name }
    })
  )
}

function showHint(data, $hint) {
    var found;
    if (data.todos.length > 0) {
        found = data.todos[0].name;
    } else {
        found = '';
    }
    if (found.length > 0) {
        $hint.show(200);
        $hint.text(found);
    } else {
        $hint.hide(200);
    }
}

const $hint = $(`<div class="list-group todo-suggestions suggestions well well-sm"></div>`);
$hint.insertAfter('.search-form');
$hint.hide()

$('#todoName').on('keyup', function (e) {
    const $form = $(this);
    const search = $form.val();
    if (search.length > 0) {
        ajaxSearch('/ajax/search', search)
            .then(data => {
                showHint(data, $hint);
            })
            .catch(err => {
                $hint.hide(200);
            });
    } else {
        $hint.hide(200);
    }
})
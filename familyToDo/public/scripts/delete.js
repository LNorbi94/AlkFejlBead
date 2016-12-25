function ajaxDelete (url) {
  const headers = {
    'csrf-token': $('[name="_csrf"]').val()
  }
  return Promise.resolve(
    $.ajax({
      url,
      method: 'DELETE',
      dataType: 'json',
      headers
    })
  )
}

function my_confirm (question) {
    let _resolve
    let _reject

    const $modal = $('.confirm-modal');
    $modal.modal('show');

    $modal.find('.modal-ok').on('click', function (e) {
        _resolve(true);
    })
    $modal.find('.modal-cancel').on('click', function (e) {
        _reject(true);
    })

    return new Promise(function (resolve, reject) {
        _resolve = resolve;
        _reject = reject;
    });
}

$deleteButtons = $('.btnDelete');

for (var i = 0; i < $deleteButtons.length; i++) {
    btn = $($deleteButtons[i]);
    btn.on('click', function (e) {
        e.preventDefault()
        my_confirm('Biztos törölni akarod?').then(response => {
            if (response) {
                const url = '/ajax' + $(this).attr('href');
                ajaxDelete(url)
                    .then(data => {
                        if (url.indexOf('categories') !== -1) {
                            location.assign('/');
                        } else {
                            $container = $(this).closest('.jumbotron');
                            $container.hide();
                        }
                    })
                    .catch(err => {
                    });
            }
        }).catch(err => {

        })
    })
}
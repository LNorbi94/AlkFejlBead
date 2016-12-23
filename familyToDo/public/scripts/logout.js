function my_confirm ($modal) {
    let _resolve
    let _reject

    // const $modal = $('.confirm-modal');
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

function ajaxLogout (url) {
  return Promise.resolve(
    $.ajax({
      url,
      method: 'GET'
    })
  )
}

$(document).on('click', 'a[href="/logout"]', function (e) {
    e.preventDefault();

    const $modal = ('#logoutModal');

    if ($modal.length < 1) {
        $modal.modal('show');
    } else {
        const $modal = $(`
            <div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="logoutModal">
                <div class="modal-dialog modal-sm" role="document">
                    <div class="modal-content">
                    <div class="modal-body">
                        Biztosan ki szeretnél lépni?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success modal-ok" data-dismiss="modal">OK</button>
                        <button type="button" class="btn btn-danger modal-cancel" data-dismiss="modal">Mégse</button>
                    </div>
                    </div>
                </div>
            </div>
        `);
        my_confirm($modal).then(response => {
            if (response) {
                const url = '/ajax/logout';
                ajaxLogout(url)
                    .then(data => {
                        $('#navContainer').load('/ #navContainer', function (e) {
                            $modal.modal('hide');
                        });
                    })
                    .catch(err => {
                    });
            }
        }).catch(err => {

        })
    }
})
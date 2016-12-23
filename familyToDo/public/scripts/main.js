const $panels = $('.panel')
$panels.each(function () {
    const $panel = $(this);
    const db = $panel.find('.list-group-item').length;
    $panel.find('.panel-heading span').before(`(${db})`);
})

$headings = $('.panel-heading');
$headings.on('click', function (e) {
    const $ul = $(this).next();
    $ul.slideToggle();
})
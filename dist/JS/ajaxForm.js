$(function () {
  $('form').submit(function (e) {
    var form = $(this);

    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
    })
      .done(function () {
        // code if form was successfully sent
        console.log('Form Submitted Successfully');
      })
      .fail(function () {
        // code if form was failed
        console.log('error');
      });

    e.preventDefault();
  });
});

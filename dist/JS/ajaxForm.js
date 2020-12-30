$(function () {
  $('form').submit(function (e) {
    const form = $(this);
    const name = $('#name').val();
    const email = $('#email').val();

    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
    })
      .done(function () {
        // code if form was successfully sent
        $('#contactForm').trigger('reset'); //reset form
        console.log(`Form Submitted Successfully ${name} ${email}`);
      })
      .fail(function () {
        // code if form was failed
        console.log('error');
      });

    e.preventDefault();
  });
});

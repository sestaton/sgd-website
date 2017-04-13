var mailgunURL;

mailgunURL = window.location.protocol + "//" + window.location.hostname + '/assets/scripts/mailgun.php';

$('#mgform').on('submit',function(e) {
  e.preventDefault();

  $('#mgform *').fadeOut(200);
  $('#mgform').prepend('Your submission is being processed...');

  $.ajax({
    type     : 'POST',
    cache    : false,
    url      : mailgunURL,
    data     : $(this).serialize(),
    success  : function(data) {
      responseSuccess(data);
      console.log(data);
    },
    error  : function(data) {
      console.log('Silent failure.');
    }
  });

  return false;

});

function responseSuccess(data) {

  data = JSON.parse(data);

  if(data.status === 'success') {
    $('#mgform').html('Submission sent succesfully.');
  } else {
    $('#mgform').html('Submission failed, please contact directly.');
  }

}

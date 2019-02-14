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
    error: function (xhr, status) {
              switch (status) {
                 case 404:
                     alert('File not found');
                     break;
                 case 500:
                     alert('Server error');
                     break;
                 case 0:
                     alert('Request aborted');
                     break;
                 default:
                     alert('Unknown error ' + xhr.status);
             }
         }
    //error  : function(data) {
    //  console.log('Silent failure.');
    //  console.log(data);
    //}
  });

  return false;

});

function responseSuccess(data) {

  //data = JSON.parse(data);

  //if(data.status === 'success') {
  var str = JSON.parse(JSON.stringify(body));

  if(str['message'] === 'Queued. Thank you.') {
    $('#mgform').html('Submission sent succesfully.');
  } else {
    $('#mgform').html('Submission failed, please contact directly.');
  }

}

var vForm = document.getElementById('mgform');
var vInput = document.getElementById('email');

vForm.onsubmit = function() {
  if (this.hid == 'submit') {
    location = '/submit/'; // + encodeURIComponent(vInput.value);
  }

  return false;
}

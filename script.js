
  $(function() {
    $('.toaster').on('click', function() {
      let msg = document.querySelector('#msg');
      toastr.options.positionClass = 'toast-bottom-right';
      
      if (msg.value == 0) {
        //alert('Please, type or message')
            toastr.clear();
            toastr.error('Please, type your message');    
          } else {
            //alert('MESSAGE SENT!')
            toastr.clear();
            toastr.success('MESSAGE SENT!');
          }
      
          msg.value = "";
          
    });
  });



  
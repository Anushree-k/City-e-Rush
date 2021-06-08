const form_HTML1 = document.querySelector('#dpass');

function formSubmit(event) {
    event.preventDefault();
     
    const adult = document.querySelector('#dnor').value;
    const snr = document.querySelector('#dsnrno').value;
    
    console.log(adult,snr);

    let data = {
      adult: adult,
      snr:snr,
      cost:"def later"    
    }

    db.collection('P_Daypass').add(data).then(
        function(d) {
          console.log(d);
          console.log(d.id);
        }
    ).catch(
        function(error) {
          console.log(error);
        }
    )
}

form_HTML1.addEventListener('submit', formSubmit);
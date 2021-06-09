const form_HTML1 = document.querySelector('#dpass');

function formSubmit(event) {
  event.preventDefault();
    
  const adult = document.querySelector('#dnor').value;
  const snr = document.querySelector('#dsnrno').value;
  
  console.log(adult,snr);

  let data = {
    adult: adult,
    snr:snr,
    cost:"def later",
    // as p_ticket.js and this file is linked no need of declaring auth again:
    //FETCHING VALUES DIRECTLY FROM p_ticket.js
    user : fname+" "+lname,
    email : email      
  }

  db.collection('P_Daypass').doc(USER.uid).set(data).then(
      /* function(d) {
        console.log(d);
        console.log(d.id);
      } */
  ).catch(
      function(error) {
        console.log(error);
      }
  )
}

form_HTML1.addEventListener('submit', formSubmit);
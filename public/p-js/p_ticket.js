const db = firebase.firestore();
const storage = firebase.storage();

const form_HTML = document.querySelector('#ticket');

function formSubmit(event) {
    event.preventDefault();
     
    const adult = document.querySelector('#tnor').value;
    const snr = document.querySelector('#tsnrno').value;
    const child = document.querySelector('#tchildno').value;
    const source = document.querySelector('#tsource').value;
    const dest = document.querySelector('#tdest').value;
    
    console.log(adult,snr,child,source, dest);

    let data = {
      adult: adult,
      snr:snr,
      child:child,
      source:source,
      dest:dest,
      cost:"def later"    
    }

    db.collection('P_Ticket').add(data).then(
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

form_HTML.addEventListener('submit', formSubmit);
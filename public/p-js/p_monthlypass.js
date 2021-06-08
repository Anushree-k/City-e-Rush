const db = firebase.firestore();
const storage = firebase.storage();

const form_HTML = document.querySelector('#form');

function formSubmit(event) {
    event.preventDefault();

    //let today = new Date().toLocaleDateString()
    //console.log(today)

    var today = new Date();
    today.setDate(today.getDate()); 
    console.log(today)

    var date = new Date();
    date.setDate(date.getDate() + 30); 
    console.log(date)

    let data = {
    issued: today,
    valid : date
    }

    db.collection('P_MonthlyPass').add(data).then(
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
const db = firebase.firestore();
const storage = firebase.storage();

const auth = firebase.auth();

const form_HTML = document.querySelector('#ticket');

let USER = {};
auth.onAuthStateChanged(async (user) => {
  if (user) {
    USER.uid = user.uid;

    await extractData();
    displayData();
  }
});

//extract name and email from passengers db
async function extractData() {
  await db
    .collection("passengers")
    .doc(USER.uid)
    .get()
    .then((doc) => {
      let docData = doc.data();
      USER.data = docData;
    });
}

let fname, lname, email;

function displayData() {

  fname = USER.data.fname;
  lname = USER.data.lname;
  email = USER.data.email;

  console.log(fname, lname, email)
}
// end of extracting name and email

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
      cost:"def later",
      user : fname+" "+lname,
      email : email     
    }
    console.log(data)
    
    db.collection('P_Ticket').doc(USER.uid).set(data).then(
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

form_HTML.addEventListener('submit', formSubmit);
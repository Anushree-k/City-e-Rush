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

    const route = document.querySelector('#routeNum').value;
    const adult = document.querySelector('#tnor').value;
    const snr = document.querySelector('#tsnrno').value;
    const child = document.querySelector('#tchildno').value;
    const source = document.querySelector('#source_place').value;
    const dest = document.querySelector('#destination_place').value;
    
    console.log(route,adult,snr,child,source, dest);

    let data = {
      route:route,
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

    console.log("routes:"+ROUTES);
        
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
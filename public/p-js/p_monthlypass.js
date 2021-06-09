const db = firebase.firestore();
const storage = firebase.storage();

const auth = firebase.auth();

const form_HTML = document.querySelector('#form');

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
    valid : date,
    user : fname+" "+lname,
    email : email 
    }
    console.log(data)

    db.collection('P_MonthlyPass').doc(USER.uid).set(data).then(
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
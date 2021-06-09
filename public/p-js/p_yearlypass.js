const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

const form_HTML = document.querySelector('#form');
const idfile_HTML = document.querySelector('#idproof');

function id_dis(input) {
  if (input.files[0].size > 2097152) {
    alert("File is too big!! Upload between[2kb - 2Mb]!");
    input.value = "";
  } else if (input.files[0].size < 20000) {
    alert("File is too small!! Upload between[2kb - 2Mb]");
    input.value = "";
  }
}

let FILE1;

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
     
    const org_name = document.querySelector('#org_name').value;
    var cls = document.getElementsByName("cls");
    
    //const id = document.querySelector('#id_no').value;
    const source = document.querySelector('#source').value;
    const dest = document.querySelector('#dest').value;
    const change = document.querySelector('#change').value;

    //class
    for (var i = 0; i < cls.length; i++){
        if (cls[i].checked){
            var clss = cls[i].value;
            break;
        }
    }
    console.log(org_name,clss,source, dest,change);

    let data = {
      org_name: org_name || '',
      clss:clss || '',
      // id: `BMTC_${Math.round(Math.random() * (9999 - 1111)) + 1111}`,
      source:source || '',
      dest:dest || '',
      change:change || '',
      user : fname+" "+lname,
      email : email       
    }

    db.collection('P_YearlyPass').doc(USER.uid).set(data).then(
        // function(d) {
        //   console.log(d);
        //   console.log(d.id);
    
          
        //   storage.ref(`P_YearlyPass/${d.id}`).child(FILE1.name).put(FILE1).then(function() { 
        //   })
        //   storage.ref(`P_YearlyPass/${d.id}`).child(FILE2.name).put(FILE2).then(function() { 
        // })
        // storage.ref(`P_YearlyPass/${d.id}`).child(FILE3.name).put(FILE3).then(function() { 
        // })
    
        // }
      ).catch(
        function(error) {
          console.log(error);
        }
      )
    
    }

form_HTML.addEventListener('submit', formSubmit);

function fileupload1(e) {
    console.log(e.target.files[0]);
    FILE1 = e.target.files[0];
    console.log(FILE1);
  }
  
idfile_HTML.addEventListener('change', fileupload1)
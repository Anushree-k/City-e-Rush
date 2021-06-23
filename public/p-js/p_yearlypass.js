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

    await extractTime();
    displayTime();
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

/* fetch validity of pass*/
async function extractTime() {
  await db
    .collection("P_YearlyPass")
    .doc(USER.uid)
    .get()
    .then((doc) => {
      let docTime = doc.data();
      USER.data = docTime;
    });
}

let from, validity;

function displayTime() {
  from = USER.data.issued;
  validity = USER.data.valid;
  time=USER.data.time;
  console.log("valid from "+from+" to "+validity);

  //get present time
  var now = new Date();
  now.setDate(now.getDate()); 

  var dd = now.getDate();
  var mm = now.getMonth()+1; 
  var yyyy = now.getFullYear();
  if(dd<10) 
  {
      dd='0'+dd;
  } 

  if(mm<10) 
  {
      mm='0'+mm;
  } 

  day = yyyy+'/'+mm+'/'+dd;
  var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

  var now = day;
  now.toString();
  console.log("now "+now);

  //compare dates to check validity
  date1 = new Date(now);
  date2 = new Date(validity);
  console.log("js dates",date1, date2);

  if(date1 > date2)
  {
    alert("validity expired!");

  }
  else{
    alert("validity left");
  }

  }


function formSubmit(event) {
    event.preventDefault();

    //date and time
    var today = new Date();
    today.setDate(today.getDate()); 

    /* var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(time); */
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 

    today = yyyy+'/'+mm+'/'+dd;    
    console.log(today);

    //validity date
    var date = new Date();
    date.setDate(date.getDate() + 365); 
    
    var vdd = date.getDate();
    var vmm = date.getMonth()+1; 
    var vyyyy = date.getFullYear();
    if(vdd<10) 
    {
        vdd='0'+vdd;
    } 

    if(vmm<10) 
    {
        vmm='0'+vmm;
    } 

    date = vyyyy+'/'+vmm+'/'+vdd;
    console.log(date)

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
      org_name: org_name,
      clss:clss,
      source:source,
      dest:dest,
      change:change,
      user : fname+" "+lname,
      email : email,
      issued: today,
      valid : date       
    }
    console.log(data)

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
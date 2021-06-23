const form_HTML1 = document.querySelector('#dpass');

auth.onAuthStateChanged(async (user) => {
  if (user) {
    USER.uid = user.uid;

    await extractTime();
    displayTime();
  }
});

/* fetch validity of pass*/
async function extractTime() {
  await db
    .collection("P_Daypass")
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
  date.setDate(date.getDate() + 1); 
  
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
    email : email,
    issued: today,
    valid : date      
  }
  console.log(data);

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
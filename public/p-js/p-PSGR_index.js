// const db = firebase.firebase();

const ROUTES = [];

db.collection("buses")
  .get()
  .then((snaps) => {
    let docs = snaps.docs;

    docs.map((bus) => {
      let data = bus.data();
      ROUTES.push({ ...data, routeNum: bus.id });
    });
    displayRoutes();
  });

const routeNumHTML = document.querySelector("#routeNum");

const routeNumHTML1 = document.querySelector("#routeNum1");

function displayRoutes() {
  console.log(ROUTES);
  let option =
    '<option disabled selected value="Select Route Number"> Select Route Number</option>';
  ROUTES.map((route) => {
    option += `<option value="${route.routeNum}">${route.routeNum}</option>`;
  });
  routeNumHTML.innerHTML = option;
  routeNumHTML1.innerHTML = option;
}

let SOURCES = [];
function routeSelected(e) {
  // console.log(e.target.value);
  let value = e.target.value;
  for (let i = 0; i < ROUTES.length; i++) {
    if (ROUTES[i].routeNum == value) {
      ROUTES[i].stops.map((r) => {
        SOURCES.push(r);
      });
      break;
    }
  }
  displaySources();
}

routeNumHTML.addEventListener("change", routeSelected);

const destination_placeHTML = document.querySelector('#destination_place');
const source_placeHTML = document.querySelector('#source_place');

function displaySources() {
  let option =
    '<option disabled selected value="Select Route Number"> Select </option>';
  SOURCES.map((s) => {
    option += `<option   value="${s.name}">${s.name}</option>`;
  });
  destination_placeHTML.innerHTML = option;
  source_placeHTML.innerHTML = option;
}

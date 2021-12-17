var alldata = [];
const Submit = (e) => {
  var a = document.getElementById("rollno");
  var b = document.getElementById("name");
  var c = document.getElementById("subject");
  var d = document.getElementById("storage");
  if (a.value == "" || b.value == "" || c.value == ""){
    alert("Input Fields cant't be null")
    return ""
  }
  var rolllist = alldata.map((i)=>i.rollno)
  if (rolllist.includes(a.value)){
    alert("This roll number is already exists.")
    return ""
  }
  let studentData = {
    rollno: a.value,
    name: b.value,
    subject: c.value,
    storage: d.value,
  };
  a.value = "";
  b.value = "";
  c.value = "";

  alldata.push(studentData);
  dispData();
  storedata();
};

function dispData() {
  var table = "";
  console.log(alldata);
  for (i of alldata) {
    table += `
      <tr>
        <td>${i.rollno}</td>
        <td>${i.name}</td>
        <td>${i.subject}</td>
        <td>${i.storage}</td>
        <td>
          <button onclick="editHandler(${i.rollno})" class="action_button">Edit</button>
          <button onclick="deleteHandler(${i.rollno})" class="action_button">Delete</button>
        </td>
      </tr>
    `;
  }
  // if (localStorage.getItem("alldata")) {
  //   let { rollno, name, subject, storage } = JSON.parse(
  //     localStorage.getItem("studentData")
  //   );
  var output = document.getElementById("output");
  output.innerHTML = `
      <table id="info">
        <thead>
        <tr>
          <th>Roll no</th>
          <th>Student name</th>
          <th>Subject</th>
          <th>Storage Type</th>
          <th>Action</th>
        <tr>
        </thead>
        <tbody>${table}</tbody>
    </table>
  `;
}

document.addEventListener("DOMContentLoaded", function (event) {
  //Do work
  getdata()
  dispData();
});
// ///////////////////
function storedata() {
  localStorage.setItem(
    "students_details_local",
    JSON.stringify(alldata.filter((student) => student.storage == "Local"))
  );
  sessionStorage.setItem(
    "students_details_session",
    JSON.stringify(alldata.filter((student) => student.storage == "Session"))
  );
  document.cookie = JSON.stringify(
    alldata.filter((student) => student.storage == "Cookies")
  );
}
function getdata() {
  console.log(document.cookie);
  // var cookiesdata = JSON.parse(document.cookie);
  var cookiesdata = document.cookie != "" ? JSON.parse(document.cookie) : [];
  var localdata = JSON.parse(localStorage.getItem("students_details_local"));
  var sessiondata = JSON.parse(
    sessionStorage.getItem("students_details_session")
  );
  console.log(cookiesdata, localdata, sessiondata);

  if (cookiesdata != null) {
    for (i of cookiesdata) {
      alldata.push(i);
    }
  }
  if (localdata != null) {
    for (i of localdata) {
      alldata.push(i);
    }
  }
  if (sessiondata != null) {
    for (i of sessiondata) {
      alldata.push(i);
    }
  }
}

// delete function
function deleteHandler(num){
  if (!confirm("Are you sure?")){
    return ""
  }
  var new_list = []
  for (var i of alldata){
      if (i.rollno != num){
         new_list.push(i)
      }
  }
  alldata = new_list
  dispData()
  storedata()
}

function editHandler(num){
  var a = document.getElementById("rollno");
  var b = document.getElementById("name");
  var c = document.getElementById("subject");
  var d = document.getElementById("storage");
  var student = alldata.filter((x)=>x.rollno == num)[0]
  console.log(student);
  a.value = student.rollno
  b.value = student.name
  c.value = student.subject
  d.value = student.storage
  var sb = document.getElementById("submit_btn")
  sb.style.display = "none"
  var ub = document.getElementById("update_btn")
  ub.style.display = "block"
}
function updateHandler(){
  var a = document.getElementById("rollno");
  var b = document.getElementById("name");
  var c = document.getElementById("subject");
  var d = document.getElementById("storage");
  if (a.value == "" || b.value == "" || c.value == ""){
    alert("Input Fields cant't be null")
    return ""
  }
  var rolllist = alldata.map((i)=>i.rollno)
  var new_list = []
  for (var i of alldata){
      if (i.rollno != a.value){
         new_list.push(i)
      }
  }
  alldata = new_list
  if (!rolllist.includes(a.value)){
    alert("This roll number is not exists.")
    return ""
  }
  let studentData = {
    rollno: a.value,
    name: b.value,
    subject: c.value,
    storage: d.value,
  };
  a.value = "";
  b.value = "";
  c.value = "";
  var sb = document.getElementById("submit_btn")
  sb.style.display = "block"
  var ub = document.getElementById("update_btn")
  ub.style.display = "none"
  alldata.push(studentData);
  dispData();
  storedata();
}
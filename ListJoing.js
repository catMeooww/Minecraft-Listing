function addList() {
  window.location = "list-creating.html";
}

function joinList() {
  listName = document.getElementById("list-name").value;
  listNumber = Number(document.getElementById("list-number").value);
  if (!listName == "") {
    if(listNumber == 0){
      var listref = firebase.database().ref(listName + "/servermessage");
    }else{
    var listref = firebase.database().ref(listName + "|" + listNumber + "/servermessage");
    }
    var isListCreated;
    var isJoining = false;
    listref.on("value", data => {
      isListCreated = data.val();
      console.log(isListCreated);
      if (!isJoining) {
        isJoining = true;
        if (isListCreated == "Started a new list: " + listName) {
          if(listNumber == 0){
            localStorage.setItem("list", listName);
          }else{
            localStorage.setItem("list", listName + "|" + listNumber);
          }
          localStorage.setItem("list_title", listName);
          redirect();
        } else {
          document.getElementById("log-list-output").innerHTML = "Could not find list";
        }
      }
    });
  } else {
    document.getElementById("log-list-output").innerHTML = "Can not log-in a list without name";
  }
}

function redirect() {
  setTimeout(() => {
    window.location = "list.html";
  }, 500)
}

var theme = localStorage.getItem("theme");
function loadthemeJOIN() {
  console.log(theme)
  if (theme == "dark") {
    document.getElementById("Login").style.backgroundImage = "url(Assets/DarkWoodBackground.jpg)";
  }
}
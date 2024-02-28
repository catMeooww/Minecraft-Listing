function addList() {
  window.location = "list-creating.html";
}

function joinList() {
  listName = document.getElementById("list-name").value;
  if (!listName == "") {
    var listref = firebase.database().ref(listName + "/servermessage");
    var isListCreated;
    var isJoining = false;
    listref.on("value", data => {
      isListCreated = data.val();
      console.log(isListCreated);
      if (!isJoining) {
        isJoining = true;
        if (isListCreated == "Started a new list: " + listName) {
          localStorage.setItem("list", listName);
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
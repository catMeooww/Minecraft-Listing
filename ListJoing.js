function addList() {
  listName = document.getElementById("list-name").value;
  if (!listName == "") {
    sm = "Started a new list: " + listName
    firebase.database().ref("/").child(listName).update({
      servermessage: sm
    });
    localStorage.setItem("list", listName);
    redirect();
  } else {
    document.getElementById("log-list-output").innerHTML = "List name can not be Empty";
  }
}

function joinList() {
  listName = document.getElementById("list-name").value;
  if (!listName == "") {
    localStorage.setItem("list", listName);
    redirect();
  } else {
    document.getElementById("log-list-output").innerHTML = "Can not log-in a list without name";
  }
}

function redirect() {
  setTimeout(() => {
    window.location = "list.html";
  }, 500)
}
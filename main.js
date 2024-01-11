var listName = localStorage.getItem("list");

function getData() {
  firebase.database().ref("/" + listName).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val();
      if (childKey != "servermessage") {
        firebaseMessageId = childKey;
        listText = childData;

        message = listText['message'];
        important = listText['important'];

        if (important) {
          messageWithTag = "<div class='listItem'><hr><img src='icons/netherstar.gif' style='width: 50px; height: 50px; float: left;' title='Important Item'><h4>" + message + "</h4><p style='float:right;font-size:7px'>" + firebaseMessageId + "</p><hr></div>";
        } else {
          messageWithTag = "<div class='listItem'><hr><img src='icons/emerald.webp' style='width: 50px; height: 50px; float: left;' title='Default Item'><h4>" + message + "</h4><p style='float:right;font-size:7px'>" + firebaseMessageId + "</p><hr></div>";
        }

        document.getElementById("output").innerHTML += messageWithTag;
      } else {
        listText = childData;
        SMessage = listText;
        messageWithTag = "<div class='serverInfo'><hr><img src='icons/enchant_book.webp' style='width: 40px; height: 40px; float: left;' title='Server Message'><h4>" + SMessage + "</h4><p style='float:right;font-size:7px'></p><hr></div>";

        document.getElementById("output").innerHTML += messageWithTag;
      }
    });
  });
  document.getElementById("title").innerHTML = listName;
}
setTimeout(() => {
  getData();
}, 500)

function send(importants) {
  msg = document.getElementById("itemAdd").value;
  document.getElementById("itemAdd").value = "";
 if(importants){
  firebase.database().ref(listName).push({
    message: msg,
    important: true
  });
 }else{
  firebase.database().ref(listName).push({
    message: msg,
    important: false
  });
 }
}

function goTo(where) {
  window.location = where;
}
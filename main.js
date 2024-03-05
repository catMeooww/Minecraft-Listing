var listName = localStorage.getItem("list");
var listArray = [];
var importantListArray = [];
var normalListArray = [];

if(listName == undefined){
  window.location = "index.html";
}

function getData() {
  firebase.database().ref("/" + listName).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    listArray = [];
    importantListArray = [];
    normalListArray = [];
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val();
      if (childKey != "servermessage") {
        firebaseMessageId = childKey;
        listText = childData;

        message = listText['message'];
        important = listText['important'];

        listArray.push(message);

        if (important) {
          messageWithTag = "<div class='listItem'><hr><img src='icons/netherstar.gif' style='width: 50px; height: 50px; float: left;' title='Important Item'><h4>" + message + "</h4><p style='font-size:7px'>" + firebaseMessageId + "</p><hr></div>";
          importantListArray.push(message);
        } else {
          messageWithTag = "<div class='listItem'><hr><img src='icons/emerald.webp' style='width: 50px; height: 50px; float: left;' title='Default Item'><button id='"+firebaseMessageId+"' class='deletebtn' onclick='deleteItem(this.id)'></button><h4>" + message + "</h4><p style='font-size:7px'>" + firebaseMessageId + "</p><hr></div>";
          normalListArray.push(message);
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
  if (importants) {
    firebase.database().ref(listName).push({
      message: msg,
      important: true
    });
  } else {
    firebase.database().ref(listName).push({
      message: msg,
      important: false
    });
  }
}

function goTo(where) {
  window.location = where;
}

function selectRandomItem(type){
 if(type == 0){
  selected = Math.floor(Math.random() * listArray.length);
  document.getElementById("selectionItem").innerHTML = listArray[selected];
 }else if(type == 1){
  selected = Math.floor(Math.random() * normalListArray.length);
  document.getElementById("selectionItem").innerHTML = normalListArray[selected];
 }else{
  selected = Math.floor(Math.random() * importantListArray.length);
  document.getElementById("selectionItem").innerHTML = importantListArray[selected];
 }
}

function guide(n){
  if(n == 1){
    msg = "(axe) 2 sticks | 3 diamonds";
    firebase.database().ref(listName).push({
      message: msg,
      important: false
    });
  }else if(n == 2){
    msg = "(hoe) 2 sticks | 2 diamonds";
    firebase.database().ref(listName).push({
      message: msg,
      important: false
    });
  }else if(n == 3){
    msg = "(pickaxe) 2 sticks | 3 diamonds";
    firebase.database().ref(listName).push({
      message: msg,
      important: false
    });
  }else if(n == 4){
    msg = "(shovel) 2 sticks | 1 diamond";
    firebase.database().ref(listName).push({
      message: msg,
      important: false
    });
  }else{
    msg = "(sword) 1 sticks | 2 diamonds";
    firebase.database().ref(listName).push({
      message: msg,
      important: false
    });
  }
  window.location = "#output";
}

function deleteItem(itemId) {
  swal(
    {
      title: `DELETE THIS ITEM`,
      text: "Are you sure DELETING this?",
      imageUrl:
        "icons/Creeper.png",
      imageSize: "150x150",
      confirmButtonText: "DELETE ITEM"
    },
    function (isConfirm) {
      if (isConfirm) {
        firebase.database().ref(listName).child(itemId).update({
          message: null,
          important: null
        });
      }
    }
  );
}

function send_special() {
  msg = document.getElementById("commandbar").value;

  if(msg == ""){
    document.getElementById("commandbar").value += "Insert Item Here!";
  }else{
    window.location = "#output";
    firebase.database().ref(listName).push({
      message: msg,
      important: false
    });
  }

}

function addSpecial(tag){
  if(tag == "purple"){
    document.getElementById("commandbar").value += "<b class='sp'></b>";
  }else if(tag == "green"){
    document.getElementById("commandbar").value += "<b class='sg'></b>";
  }else if(tag == "red"){
    document.getElementById("commandbar").value += "<b class='sr'></b>";
  }else if(tag == "cyan"){
    document.getElementById("commandbar").value += "<b class='sb'></b>";
  }else{
  document.getElementById("commandbar").value += tag;
  }
}

function clear_command(){
  document.getElementById("commandbar").value = " ";
}
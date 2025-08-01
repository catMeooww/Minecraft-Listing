var listName = localStorage.getItem("list");
var listTitle = localStorage.getItem("list_title");
var theme = localStorage.getItem("theme");
var listArray = [];
var importantListArray = [];
var normalListArray = [];
var listSecurity = "";
var isAlreadyAccessed = false;

if (listName == undefined) {
  window.location = "index.html";
}

//OUTPUT

function getData() {
  firebase.database().ref("/" + listName).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    listArray = [];
    importantListArray = [];
    normalListArray = [];
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val();
      if (childKey == "password") {
        if (!isAlreadyAccessed) {
          //window.location = '#output';
          document.getElementById("passBox").style.visibility = 'visible';
          listSecurity = childData;
          document.getElementById("passwordHandler").innerHTML = "| password: " + listSecurity + " | Edit:";
        }
      } else {
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
            messageWithTag = "<div class='listItem'><hr><img src='icons/emerald.webp' style='width: 50px; height: 50px; float: left;' title='Default Item'><button id='" + firebaseMessageId + "' class='deletebtn' onclick='deleteBox(this.id)'></button><h4>" + message + "</h4><p style='font-size:7px'>" + firebaseMessageId + "</p><hr></div>";
            normalListArray.push(message);
          }

          document.getElementById("output").innerHTML += messageWithTag;
        } else {
          listText = childData;
          SMessage = listText;
          messageWithTag = "<div class='serverInfo'><hr><img src='icons/enchant_book.webp' style='width: 40px; height: 40px; float: left;' title='Server Message'><h4>" + SMessage + "</h4><p style='float:right;font-size:7px'></p><hr></div>";

          document.getElementById("output").innerHTML += messageWithTag;
        }
      }
    });
  });
  document.getElementById("title").innerHTML = listTitle;
  document.getElementById("subtitle").innerHTML = listName;
  document.getElementById("listIdHandler").innerHTML = listName;
}
setTimeout(() => {
  getData();
}, 500)

function loadtheme() {
  var testMobile = /iPhone|Android|iPad/i.test(navigator.userAgent);
  if (testMobile){
    document.getElementById("options-mobile").style.visibility = "visible";
    document.getElementById("options").style.visibility = "hidden";
    document.getElementById("mainDiv").style.width = "100%";
    document.getElementById("mainDiv").style.paddingTop = "100px";
  }
  console.log(theme)
  if (theme == "dark") {
    document.getElementById("mainDiv").style.backgroundImage = "url(Assets/DarkWoodBackground.jpg)";
  }
}

//send things
function send(importants) {
  msg = document.getElementById("itemAdd").value;

  if (msg == "") {
    document.getElementById("itemAdd").placeholder = "Item name can not be empty";
  } else {
    document.getElementById("itemAdd").value = "";
    document.getElementById("itemAdd").placeholder = "Insert Item to send!";
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
}

function goTo(where) {
  window.location = where;
}

//select random item
function selectRandomItem(type) {
  if (type == 0) {
    selected = Math.floor(Math.random() * listArray.length);
    document.getElementById("selectionItem").innerHTML = listArray[selected];
  } else if (type == 1) {
    selected = Math.floor(Math.random() * normalListArray.length);
    document.getElementById("selectionItem").innerHTML = normalListArray[selected];
  } else {
    selected = Math.floor(Math.random() * importantListArray.length);
    document.getElementById("selectionItem").innerHTML = importantListArray[selected];
  }
}


//craft guide
function guide(n) {
  if (n == 1) {
    msg = "(axe) 2 sticks | 3 diamonds";
    firebase.database().ref(listName).push({
      message: msg,
      important: false
    });
  } else if (n == 2) {
    msg = "(hoe) 2 sticks | 2 diamonds";
    firebase.database().ref(listName).push({
      message: msg,
      important: false
    });
  } else if (n == 3) {
    msg = "(pickaxe) 2 sticks | 3 diamonds";
    firebase.database().ref(listName).push({
      message: msg,
      important: false
    });
  } else if (n == 4) {
    msg = "(shovel) 2 sticks | 1 diamond";
    firebase.database().ref(listName).push({
      message: msg,
      important: false
    });
  } else {
    msg = "(sword) 1 sticks | 2 diamonds";
    firebase.database().ref(listName).push({
      message: msg,
      important: false
    });
  }
  window.location = "#output";
}

//item delete
var itemDeleting = "";
function deleteBox(itemId) {
  document.getElementById("infoBox").style.visibility = "visible";
  document.getElementById("boxButton").innerHTML = "<button id='dangerButton' onclick='deleteItem()'>DELETE ITEM</button>";
  itemDeleting = itemId
}
function deleteItem() {
  firebase.database().ref(listName).child(itemDeleting).update({
    message: null,
    important: null
  });
  closeBox();
  itemDeleting = "";
}
function closeBox() {
  document.getElementById("infoBox").style.visibility = "hidden";
}

//special text
function addSpecial(tag) {
  if (tag == "purple") {
    document.getElementById("itemAdd").value += "<b class='sp'></b>";
  } else if (tag == "green") {
    document.getElementById("itemAdd").value += "<b class='sg'></b>";
  } else if (tag == "red") {
    document.getElementById("itemAdd").value += "<b class='sr'></b>";
  } else if (tag == "cyan") {
    document.getElementById("itemAdd").value += "<b class='sb'></b>";
  } else if (tag == "Enchant") {
    document.getElementById("itemAdd").value += "<b class='sEnchant'></b>";
  } else {
    document.getElementById("itemAdd").value += tag;
  }
}

function randomSpecial() {
  rtext = Math.floor(Math.random() * 5);
  if (rtext == 1) {
    document.getElementById("itemAdd").value = "Hello World";
  } else if (rtext == 2) {
    document.getElementById("itemAdd").value = "Step 1: Just do It";
  } else if (rtext == 3) {
    document.getElementById("itemAdd").value = "This is better than paper";
  } else if (rtext == 4) {
    document.getElementById("itemAdd").value = "Creeper Aw Man";
  } else {
    document.getElementById("itemAdd").value = "Normal day in Ohiocraft";
  }
}

function clear_command() {
  document.getElementById("itemAdd").value = "";
}

//configs
function darkTheme() {
  localStorage.setItem("theme", "dark");
  location.reload();
}
function defaultTheme() {
  localStorage.setItem("theme", "default");
  location.reload();
}

function catmeow() {
  window.location = "https://catmeooww.github.io/CatMeooww/catmeoowwProjects.html";
}

function download() {
  if (!listArray == []) {
    downloadfile = listTitle + ".txt";
    downloadtext = JSON.stringify(listArray);
    var downloadelement = document.createElement('a');
    downloadelement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(downloadtext));
    downloadelement.setAttribute('download', downloadfile);
    downloadelement.style.display = 'none';
    document.body.appendChild(downloadelement);

    downloadelement.click();

    document.body.removeChild(downloadelement);
  }
}

//security
function passwordVerify() {
  typedPassword = document.getElementById("insertedPass").value;
  if (typedPassword == listSecurity) {
    document.getElementById("passBox").style.visibility = 'hidden';
    isAlreadyAccessed = true;
  } else {
    document.getElementById("passBox").style.border = '1px outset red';
    document.getElementById("insertedPass").style.borderColor = 'red';
  }
}

function addListPassword() {
  creatingPassword = document.getElementById("newPasswordInput").value;
  if (!creatingPassword == "") {
    console.log(creatingPassword);
    firebase.database().ref(listName).update({
      password: creatingPassword
    });
    setTimeout(()=>{
      location.reload();
    },300);
  }
}
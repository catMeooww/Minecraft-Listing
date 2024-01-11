function addList() {
    listName = document.getElementById("list-name").value;
    sm = "Started a new list: " + listName
    firebase.database().ref("/").child(listName).update({
      servermessage: sm
    });
    localStorage.setItem("list", listName);
    redirect();
  }

  function joinList(){
    listName = document.getElementById("list-name").value;
    localStorage.setItem("list", listName);
    redirect();
  }

  function redirect(){
    setTimeout(()=>{
      window.location = "list.html";
    },500)
  }
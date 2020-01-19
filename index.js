var firebaseConfig = {}; // Paste your Firebase Config here!!!!!

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let auth = firebase.auth();
  let database = firebase.database();
  let storage = firebase.storage();

  function loginToGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
  }

  function signOut() {
      auth.signOut();
  }

  function afterLogin(user) {
      if(user) {
          console.log(user.displayName + " has signed in!");
      }
  }

  auth.onAuthStateChanged(afterLogin);

  function addNameToDatabase() {
      let data = {
          "anotherPerson": "Bob"
      }
      database.ref("/").set({"person": auth.currentUser.displayName});
      database.ref("/").update(data);
      database.ref("/anotherPerson").remove();
  }

  function pushToDatabase(value) {
    database.ref("/push").push(value);
  }

  function readFromDatabase() {
      database.ref("person").on("value", function(snapshot) {
        document.getElementById("database-value").innerHTML = snapshot.val();
      });
  }

  function uploadFile() {
      let fileUpload = document.getElementById("file-upload");
      let file = fileUpload.files[0];

      storage.ref("/files/file.pdf").put(file).then(function(snapshot) {
        storage.ref("/files/file.pdf").getDownloadURL().then(function(url) {
            console.log(url);
        });
      });
  }
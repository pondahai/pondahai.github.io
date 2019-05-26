  'use strict';
  function downloadCurrentDocument () {

  	var container = document.getElementById('iAmHere');
    var base64doc = btoa(unescape(encodeURIComponent(container.innerHTML))),
        a = document.createElement('a'),
        e = new MouseEvent('click');

	var firstLine = $("#iAmHere")
	                       .contents()
	                       .filter(function() { 
	                           return !!$.trim( this.innerHTML || this.data ); 
	                       })
	                       .first();

	var firstLineText = "";
	var firstfirstLine = "";
	if (firstLine[0].innerText) {
		firstLineText = firstLine[0].innerText;
	}
	if (firstLineText.split('\n')[0]){
		firstfirstLine = firstLineText.split('\n')[0];
	}
	var filename = "";
	if (firstfirstLine == ""){
		filename = "untitled.html";
	}else{
		filename = firstfirstLine + ".html";
	}

    a.download = filename;
    a.href = 'data:text/html;base64,' + base64doc;
    a.dispatchEvent(e);
  }

  function checkAndFindMyContent(s) {
    var div = document.createElement('div');
    div.innerHTML = s;
 //    var innerDiv = div.getElementsByTagName('div');
    var foundedIds = div.getElementsByTagName('div');
    var outputHTML = "";
    var i = foundedIds.length;
    while(i--) {
		if(foundedIds[i].id == "iAmHere") {
			outputHTML = foundedIds[i].innerHTML;
		}
	}
	var foundedBodys = div.getElementsByTagName('body');
	if (foundedBodys.length > 0) {
		outputHTML = foundedBodys[0].innerHTML;
	}	
	if (outputHTML == "") {
		outputHTML = s;
	}
	// var container = div.getElementById('iAmHere');
	// if(container) {
	// 	outputHTML = container.innerHTML;
	// }
	return outputHTML;

  }
  function stripScripts(s) {
    var div = document.createElement('div');
    div.innerHTML = s;
    var scripts = div.getElementsByTagName('script');
    var i = scripts.length;
    while (i--) {
      scripts[i].parentNode.removeChild(scripts[i]);
    }
    return div.innerHTML;
  }

  function uploadToCurrentDocument () {
	var input = document.createElement('input');
	input.type = 'file';

	input.onchange = e => { 
	   var file = e.target.files[0];
	   // setting up the reader
	   var reader = new FileReader();
	   reader.readAsText(file,'UTF-8');

	   // here we tell the reader what to do when it's done reading...
	   reader.onload = readerEvent => {
	    	var content = readerEvent.target.result; // this is the content!
	     	document.getElementById("iAmHere").innerHTML=checkAndFindMyContent(stripScripts(content));
	     	document.getElementById("iAmHere").dispatchEvent(new MouseEvent('click'));
	   	}

  	    //document.getElementById("container").innerHTML='<object type="text/html" data='+file.name+' ></object>';
	}

	input.click();
  }

      // Client ID and API key from the Developer Console
      var CLIENT_ID = '169837891026-oag2vd4m6ibivp7cqajreu1um7svvdhh.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyCmieef4onzl_adyu8gwpCh8Lhsk7oX5Cw';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

      var authorizeButton = document.getElementById('authorize_button');
      var signoutButton = document.getElementById('signout_button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        }, function(error) {
          appendPre(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listFiles();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

      /**
       * Print files.
       */
      function listFiles() {
        gapi.client.drive.files.list({
          'pageSize': 10,
          'fields': "nextPageToken, files(id, name)"
        }).then(function(response) {
          appendPre('Files:');
          var files = response.result.files;
          if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              appendPre(file.name + ' (' + file.id + ')');
            }
          } else {
            appendPre('No files found.');
          }
        });
      }

  function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }

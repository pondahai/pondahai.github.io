  'use strict';

  function getFirstParagraph() {
  	var contentFiltered = $("#iAmHere")
	                       .contents()
	                       .filter(function() { 
	                           return !!$.trim( this.innerHTML || this.data ); 
	                       });
	var paragraphNode = null;
	for (var i=0; i<contentFiltered.length; i++){
		if (contentFiltered[i].nodeName == "P") {
			paragraphNode = contentFiltered[i];
			break;
		}
	}

	return (paragraphNode.innerHTML)?paragraphNode.innerHTML:null;
  }

  function getFirstLine () {
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
	return firstfirstLine;
  }

  function getFirstLineFotFileName () {
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

	return filename;
  }

  function downloadFileFromCurrentDocument () {

  	var container = document.getElementById('iAmHere');
    var base64doc = btoa(unescape(encodeURIComponent(container.innerHTML))),
        a = document.createElement('a'),
        e = new MouseEvent('click');
    var filename = getFirstLineFotFileName();


    a.download = filename;
    a.href = 'data:text/html;base64,' + base64doc;
    a.dispatchEvent(e);

    buildPageMeta("");
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

  function uploadFileToCurrentDocument () {
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
	     	$('html, body').animate({ scrollTop: 0 }, 'fast');
	     	buildPageMeta("");
	   	}

  	    //document.getElementById("container").innerHTML='<object type="text/html" data='+file.name+' ></object>';
	}

	input.click();
  }
  function createQueryData() {
  	var obj = new Object();
	//obj.url = document.querySelector("[property='og:url']").content;
	obj.type  = document.querySelector("[property='og:type']").content;
	obj.title = document.querySelector("[property='og:title']").content;
	obj.description = document.querySelector("[property='og:description']").content;
	obj.fileid = document.querySelector("[property='fileid']").content;
	var jsonString= JSON.stringify(obj);
	console.log(jsonString);
	//console.log(encodeURIComponent(jsonString));
	return jsonString;
  }
  function buildMetaUrl () {
  	var meta;
		if (document.querySelector("[property='og:url']")) {
			document.querySelector("[property='og:url']").remove();
		}
		meta = document.createElement('meta');
		meta.setAttribute('property', 'og:url');
		meta.content = 'https://'+window.location.hostname+'/?qdata=' + encodeURIComponent(createQueryData());
		document.getElementsByTagName('head')[0].appendChild(meta);  	
  }
  function buildPageMeta (id) {
		var meta;
		// if (document.querySelector("[property='og:url']")) {
		// 	document.querySelector("[property='og:url']").remove();
		// }
		if (document.querySelector("[property='og:type']")) {
			document.querySelector("[property='og:type']").remove();
		}
		if (document.querySelector("[property='og:title']")) {
			document.querySelector("[property='og:title']").remove();
		}
		if (document.querySelector("[property='og:description']")) {
			document.querySelector("[property='og:description']").remove();
		}
		if (document.querySelector("[property='fileid']")) {
			document.querySelector("[property='fileid']").remove();
		}
		
		// meta = document.createElement('meta');
		// meta.setAttribute('property', 'og:url');
		// meta.content = 'https://window.location.hostname/?qdata=' + createQueryData();
		// document.getElementsByTagName('head')[0].appendChild(meta);
		meta = document.createElement('meta');
		meta.setAttribute('property', 'og:type');
		meta.content = "article";
		document.getElementsByTagName('head')[0].appendChild(meta);
		meta = document.createElement('meta');
		meta.setAttribute('property', 'og:title');
		meta.content = getFirstLine();
		document.getElementsByTagName('head')[0].appendChild(meta);
		meta = document.createElement('meta');
		meta.setAttribute('property', 'og:description');
		meta.content = getFirstParagraph();
		document.getElementsByTagName('head')[0].appendChild(meta);
		meta = document.createElement('meta');
		meta.setAttribute('property', 'fileid');
		meta.content = id;
		document.getElementsByTagName('head')[0].appendChild(meta);

		buildMetaUrl();

		document.title = getFirstLine();
  }
  function rebuildPageMeta (json) {
		var meta;
		// if (document.querySelector("[property='og:url']")) {
		// 	document.querySelector("[property='og:url']").remove();
		// }
		if (document.querySelector("[property='og:type']")) {
			document.querySelector("[property='og:type']").remove();
		}
		if (document.querySelector("[property='og:title']")) {
			document.querySelector("[property='og:title']").remove();
		}
		if (document.querySelector("[property='og:description']")) {
			document.querySelector("[property='og:description']").remove();
		}
		if (document.querySelector("[property='fileid']")) {
			document.querySelector("[property='fileid']").remove();
		}
		
		meta = document.createElement('meta');
		meta.setAttribute('property', 'og:type');
		meta.content = json.type;
		document.getElementsByTagName('head')[0].appendChild(meta);
		meta = document.createElement('meta');
		meta.setAttribute('property', 'og:title');
		meta.content = json.title;
		document.getElementsByTagName('head')[0].appendChild(meta);
		meta = document.createElement('meta');
		meta.setAttribute('property', 'og:description');
		meta.content = json.description;
		document.getElementsByTagName('head')[0].appendChild(meta);
		meta = document.createElement('meta');
		meta.setAttribute('property', 'fileid');
		meta.content = json.fileid;
		document.getElementsByTagName('head')[0].appendChild(meta);
		
		buildMetaUrl();

		document.title = getFirstLine();
  }

  function downloadFromCloud (id,name) {
  	// hide fb share button
	var fbShareButton = document.getElementById('idFBshareButton');
	if (fbShareButton) {
			fbShareButton.parentNode.removeChild(fbShareButton);
	}
  	//console.log(id);
  	if (gapi) {
  		// dahai: accss_token is necessary for file download, but i dont believe, There must be a solution in the world.
  		var accessToken;
  		if (gapi.auth.getToken !== null) {
			accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
		}
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://www.googleapis.com/drive/v3/files/' + id + '?alt=media');
		if (accessToken) {
			xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
		}
		xhr.responseType = 'blob';
		xhr.onload = function(e) {
			if(this) {
				if (this.status === 200) {
					var blob = this.response;
					//console.log(blob); // Retrieve uploaded file ID.
					var reader = new FileReader();
					reader.onload = function() {
						//alert(reader.result);
				     	document.getElementById("iAmHere").innerHTML=checkAndFindMyContent(stripScripts(reader.result));
				     	document.getElementById("iAmHere").dispatchEvent(new MouseEvent('click'));
				     	$('html, body').animate({ scrollTop: 0 }, 'fast');
				     	document.title = getFirstLine();

				     	var url = 'https://'+window.location.hostname+'/?fileid=' + id;
				     	buildPageMeta(id);

				     	var file_id = null;
				     	var file_name = null;
				     	// when download finish check the filename value in the input element
				     	if (!name) {
					     	var filenameFromFirstLine = getFirstLineFotFileName();
				     		if (!document.getElementById('current_file_name')) {
					     		input = document.createElement("input");
				     		}else{
								input = document.getElementById('current_file_name');
				     		}
							input.setAttribute("type", "hidden");
							input.setAttribute("name", "current_file_name");
							input.setAttribute("id", "current_file_name");
							input.setAttribute("value", filenameFromFirstLine);
							document.body.insertBefore(input,document.getElementById('iAmHere'));
							name = filenameFromFirstLine;
						}
				     	// dahai: difference name difference file
				     	if (document.getElementById('current_file_id')) {
				     		file_id = document.getElementById('current_file_id');
				     	}
				     	if (document.getElementById('current_file_name')) {
				     		file_name = document.getElementById('current_file_name');
				     	}
				     	var input;
				     	if ((file_id&&file_name)&&(file_id.value === id)&&(file_name.value === name)) {
				     		input = document.getElementById('current_file_id');
				     		input.setAttribute("value", id);
				     		input = document.getElementById('current_file_name');
				     		input.setAttribute("value", name);
				     	}else{
				     		if (!document.getElementById('current_file_id')) {
								input = document.createElement("input");
				     		}else{
				     			input = document.getElementById('current_file_id');
				     		}
							input.setAttribute("type", "hidden");
							input.setAttribute("name", "current_file_id");
							input.setAttribute("id", "current_file_id");
							input.setAttribute("value", id);
							document.body.insertBefore(input,document.getElementById('iAmHere'));
				     		if (!document.getElementById('current_file_name')) {
					     		input = document.createElement("input");
				     		}else{
								input = document.getElementById('current_file_name');
				     		}
							input.setAttribute("type", "hidden");
							input.setAttribute("name", "current_file_name");
							input.setAttribute("id", "current_file_name");
							input.setAttribute("value", name);
							document.body.insertBefore(input,document.getElementById('iAmHere'));
						}
					};
					reader.readAsText(blob);
				}else{
					//console.log(this.response);
					if (this.response.type === "application/json") {
						var blob = this.response;
						var reader = new FileReader();
						reader.onload = function() {
							var res = reader.result;
							console.log(res);
							if (res.match("requires signup")) {
								// "requires signup"
								handleAuthClick();
							}							
						};
						reader.readAsText(blob);
					}
				}
			}
		};
		xhr.send();
	}
  }
  function rebuildShareButton (id, name) {
		// remove button if it is exist
		var fbShareButton = document.getElementById('idFBshareButton');
		if (fbShareButton) {
				fbShareButton.parentNode.removeChild(fbShareButton);
		}

		// build and show fb share button
//		var url_encoded = encodeURIComponent("https://window.location.hostname/?fileid=" + id);
		// createQueryData()
		var url_encoded = encodeURIComponent("https://"+window.location.hostname+"/?qdata=" + encodeURIComponent(createQueryData()));
		var name_encoded = encodeURIComponent(name);
		var buttonimg = document.createElement('img');
		buttonimg.src = "https://assets.cobaltnitra.com/teams/repository/export/685/994e08a161005809f00505692530e/685994e08a161005809f00505692530e.png";
		buttonimg.setAttribute("style","width: 30px;");
		var fbShareButton = document.createElement('a');
		fbShareButton.setAttribute('id','idFBshareButton');
		fbShareButton.setAttribute('href', 'javascript:fbshareCurrentPage("'+url_encoded+'","'+name_encoded+'")');
		fbShareButton.setAttribute('target', '_blank');
		fbShareButton.appendChild(buttonimg);
		document.getElementById('fbsharebuttonposition').parentNode.insertBefore(fbShareButton,document.getElementById('fbsharebuttonposition'));

//<a href="javascript:fbshareCurrentPage()" target="_blank" alt="Share on Facebook"><img src="https://assets.cobaltnitra.com/teams/repository/export/685/994e08a161005809f00505692530e/685994e08a161005809f00505692530e.png" style="width: 30px; alt=" alt="" /></a>		  	
  }
  function uploadToCloudAndShare () {
  	var afterUploadThenShare = function (id, name) {
//		var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
		var accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token; // Here gapi is used for retrieving the access token.
	    var init = function() {
	        var s = new gapi.drive.share.ShareClient();
	        s.setOAuthToken(accessToken);
	        s.setItemIds([id]);

	        	s.showSettingsDialog();

	    }

	    	

	    gapi.load('drive-share', init);

	    var url = 'https://'+window.location.hostname+'/?fileid=' + id;
	    //console.log(url);

	    buildPageMeta(id);

	    rebuildShareButton(id, name);
	 };

  	uploadToCloud (afterUploadThenShare);
  }

  function uploadToCloud (afterUploadThenShareFunction) {
  	var container = document.getElementById('iAmHere');
  	if (container.innerHTML) {
	    //var base64doc = btoa(unescape(encodeURIComponent(container.innerHTML)));
	    var filename = getFirstLineFotFileName();

	  	var fileContent = container.innerHTML; // As a sample, upload a text file.
		var file = new Blob([fileContent], {type: 'text/html'});
		var metadata = {
		    'name': filename, // Filename at Google Drive
		    'mimeType': 'text/html'
		};

		var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
		var form = new FormData();
		form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
		form.append('file', file);

		var xhr = new XMLHttpRequest();
		var current_file_id = null;
		var current_file_name = null;
		if (document.getElementById('current_file_id')) {
			current_file_id = document.getElementById('current_file_id').value;
		}
		if (document.getElementById('current_file_name')) {
			current_file_name = document.getElementById('current_file_name').value;
		}
		if (current_file_id && current_file_name && (filename == current_file_name)) {
			xhr.open('PATCH', 'https://www.googleapis.com/upload/drive/v3/files/' + current_file_id + '?uploadType=multipart');
		}else{
			xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
		}		
		xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
		xhr.responseType = 'json';
		xhr.onload = () => {
		    //console.log(xhr.response); // Retrieve uploaded file ID.
		    listFiles();

		    if (xhr.status === 200) {
			    var input;
	     		if (!document.getElementById('current_file_id')) {
					input = document.createElement("input");
	     		}else{
	     			input = document.getElementById('current_file_id');
	     		}
				input.setAttribute("type", "hidden");
				input.setAttribute("name", "current_file_id");
				input.setAttribute("id", "current_file_id");
				input.setAttribute("value", xhr.response.id);
				document.body.insertBefore(input,document.getElementById('iAmHere'));
	     		if (!document.getElementById('current_file_name')) {
		     		input = document.createElement("input");
	     		}else{
					input = document.getElementById('current_file_name');
	     		}
				input.setAttribute("type", "hidden");
				input.setAttribute("name", "current_file_name");
				input.setAttribute("id", "current_file_name");
				input.setAttribute("value", filename);
				document.body.insertBefore(input,document.getElementById('iAmHere'));
		    	
			    if (afterUploadThenShareFunction) {
			    	afterUploadThenShareFunction(xhr.response.id, filename);
				}
			}else{
				console.log(xhr.result);
			}
		};
		xhr.send(form);
	}
  }
  function gotoURLbyId (id, name) {
  	window.location.href = 'https://'+window.location.hostname+'/?fileid=' + id;
  }

  
      // Client ID and API key from the Developer Console
      var CLIENT_ID = '169837891026-oag2vd4m6ibivp7cqajreu1um7svvdhh.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyCmieef4onzl_adyu8gwpCh8Lhsk7oX5Cw';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = 'https://www.googleapis.com/auth/drive.file';

      var authorizeButton = document.getElementById('authorize_button');
      var signoutButton = document.getElementById('signout_button');
      var shareFileButton = document.getElementById('sharefile_button');
      //var loadcloudfileButton = document.getElementById('loadcloudfile_button');
      var savecloudfileButton = document.getElementById('savecloudfile_button');

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
          appendFilesList(JSON.stringify(error, null, 2));
        });
        //appendFilesList('hello');
        //appendFilesList2('name','datetime','ooxx1122');
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = '';
          //loadcloudfileButton.style.display = '';
          savecloudfileButton.style.display = '';
          shareFileButton.style.display = '';
          listFiles();
  // var profile = gapi.auth2.currentUser.get().getBasicProfile();
  // console.log('ID: ' + profile.getId());
  // console.log('Full Name: ' + profile.getName());
  // console.log('Given Name: ' + profile.getGivenName());
  // console.log('Family Name: ' + profile.getFamilyName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail());
        } else {
          authorizeButton.style.display = '';
          signoutButton.style.display = 'none';
          //loadcloudfileButton.style.display = 'none';
          savecloudfileButton.style.display = 'none';
          shareFileButton.style.display = 'none';
          clearFilesList();
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
      // function appendPre(message) {
      //   var pre = document.getElementById('content');
      //   var textContent = document.createTextNode(message + '\n');
      //   pre.appendChild(textContent);
      // }
      // function appendPre2(name,ctime,id) {
      //   var pre = document.getElementById('content');
      //   var textContent = document.createTextNode('<button id="listfile_button" class="example_b" onclick="downloadFromCloud("' + id + '",' + name + ');">' + name + " " + ctime + '</button>');
      //   pre.appendChild(textContent);
      // }
      function appendFilesList(message) {
        var div = document.getElementById('fileslist');
        var textContent = document.createTextNode(message + '\n');
        div.appendChild(textContent);
      }
      function appendFilesList2(name,ctime,id) {
        var div = document.getElementById('fileslist');
        //var textContent = document.createTextNode('<button id="listfile_button" class="" onclick="downloadFromCloud("'+ id +'");">' + name + " " + ctime + '</button>');
         var btn = document.createElement("BUTTON"); 
         btn.innerHTML = name + " " + ctime; 
         btn.id = id;
         btn.setAttribute ('onclick', 'gotoURLbyId("'+id+'","'+name+'")');
         btn.classList.add("fileslistbutton");

      	div.appendChild(btn);
      }
      function clearPre() {
      	var pre = document.getElementById('content');
      	pre.innerHTML = "";
      }
      function clearFilesList() {
      	var div = document.getElementById('fileslist');
      	div.innerHTML = "";
      }
      /**
       * Print files.
       */
      function listFiles() {
      	clearFilesList();
        gapi.client.drive.files.list({
          'pageSize': 999,
          'q': "fileExtension='html'",
          'fields': "nextPageToken, files(id, name, fileExtension, mimeType, createdTime, trashed)"
        }).then(function(response) {
          //appendPre('Files:');
          var files = response.result.files;
          if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              //appendPre(file.name + ' ' + file.createdTime + ' ' );
              	var date = new Date(file.createdTime).toJSON();
				var newDate=new Date(+new Date(date)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');

              	if (!file.trashed) {
              		appendFilesList2(file.name, newDate, file.id);
      			}
            }
          } else {
            appendFilesList('No files found.');
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

  var strUrl = location.search;
  var getPara, ParaVal;
  var aryPara = [];

  if (strUrl.indexOf("?") != -1) {
    var getSearch = strUrl.split("?");
    getPara = getSearch[1].split("&");
    for (var i = 0; i < getPara.length; i++) {
      ParaVal = getPara[i].split("=");
      aryPara.push(ParaVal[0]);
      aryPara[ParaVal[0]] = ParaVal[1];
    }
    //console.log(aryPara['fileid']);
    // for share file download from url qurey string
    var fileid = aryPara['fileid'];
    if (fileid) {
	    setTimeout('downloadFromCloud("'+fileid+'","");',5000);
	    document.getElementById("iAmHere").innerHTML="<p><br></p>";
	}
	var qdata = aryPara['qdata'];
	if (qdata) {
		var jsonString = decodeURIComponent(qdata);
		var json = JSON.parse(jsonString);
		if (json.fileid){
	    	setTimeout('downloadFromCloud("'+json.fileid+'","");',5000);
	    }
	    rebuildPageMeta(json);
	    document.getElementById("iAmHere").innerHTML="<p><br></p>";		
	}
  }

function fbshareCurrentPage(url, name)
    {  
    	// window.open(
    	// 	"https://www.facebook.com/sharer/sharer.php?u="+escape(url)+"&t="+name, '', 
    	// 	'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'
    	// 	);
    	console.log(url);
    	var fbShareRest = "https://www.facebook.com/dialog/share?&app_id=2373370826211241&display=popup&href=" + encodeURIComponent(url) + "&redirect_uri=" + encodeURIComponent(url);
    	console.log(fbShareRest);
    	window.open(fbShareRest);
    	return false; 
    }



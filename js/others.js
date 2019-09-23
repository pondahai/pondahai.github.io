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
	var text = "";
	if (paragraphNode) {
		text = (paragraphNode.innerText)?paragraphNode.innerText.substring(0,100):null;
	}
	return text;
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
	if (firstLine[0]) {
		if (firstLine[0].innerText) {
			firstLineText = firstLine[0].innerText;
		}
		if (firstLineText.split('\n')[0]){
			firstfirstLine = firstLineText.split('\n')[0];
		}
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
	if (firstLine[0]) {
		if (firstLine[0].innerText) {
			firstLineText = firstLine[0].innerText;
		}
		if (firstLineText.split('\n')[0]){
			firstfirstLine = firstLineText.split('\n')[0];
		}
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
		meta = document.createElement('meta');
		meta.setAttribute('property', 'og:url');
		meta.content = 'https://'+window.location.hostname+'/?qdata=' + btoa(unescape(encodeURIComponent(createQueryData())));
		if (document.querySelector("[property='og:url']")) {
			if (document.querySelector("[property='og:url']").content !== meta.content) {
				document.querySelector("[property='og:url']").content = meta.content;
			}
		}else{
			document.getElementsByTagName('head')[0].appendChild(meta);
		}
  }
  function buildPageMeta (id) {
		var meta;
		// if (document.querySelector("[property='og:url']")) {
		// 	document.querySelector("[property='og:url']").remove();
		// }


		meta = document.createElement('meta');
		meta.setAttribute('property', 'og:type');
		meta.content = "article";		
		if (document.querySelector("[property='og:type']")) {
			if (document.querySelector("[property='og:type']").content !== meta.content) {
				document.querySelector("[property='og:type']").content = meta.content;
			}
		}else{
			document.getElementsByTagName('head')[0].appendChild(meta);
		}

		meta = document.createElement('meta');
		meta.setAttribute('property', 'og:title');
		meta.content = getFirstLine();
		if (document.querySelector("[property='og:title']")) {
			if (document.querySelector("[property='og:title']").content !== meta.content) {
				document.querySelector("[property='og:title']").content = meta.content;
			}
		}else{
			document.getElementsByTagName('head')[0].appendChild(meta);
		}

		meta = document.createElement('meta');
		meta.setAttribute('property', 'og:description');
		meta.content = getFirstParagraph();
		if (document.querySelector("[property='og:description']")) {
			if (document.querySelector("[property='og:description']").content !== meta.content) {
				document.querySelector("[property='og:description']").content = meta.content;
			}
		}else{
			document.getElementsByTagName('head')[0].appendChild(meta);
		}

		meta = document.createElement('meta');
		meta.setAttribute('property', 'fileid');
		meta.content = id;
		if (document.querySelector("[property='fileid']")) {
			if (document.querySelector("[property='fileid']").content !== meta.content) {
				document.querySelector("[property='fileid']").content = meta.content;
			}
		}else{
			document.getElementsByTagName('head')[0].appendChild(meta);
		}

		// meta = document.createElement('meta');
		// meta.setAttribute('property', 'og:image');
		// var imageElm = document.getElementsByTagNameNS("http://www.w3.org/2000/svg",'image');
		// if (imageElm && imageElm[0]) {
		// 	meta.content = imageElm[0].href.baseVal;
		// }else{
		// 	meta.content = "";
		// }
		// if (document.querySelector("[property='og:image']")) {
		// 	if (document.querySelector("[property='og:image']").content !== meta.content) {
		// 		document.querySelector("[property='og:image']").content = meta.content;
		// 	}
		// }else{
		// 	document.getElementsByTagName('head')[0].appendChild(meta);
		// }
		
		buildMetaUrl();

		document.title = getFirstLine();
  }
  function rebuildPageMetaFromQdata (json) {
		var meta;
		// if (document.querySelector("[property='og:url']")) {
		// 	document.querySelector("[property='og:url']").remove();
		// }
		meta = document.createElement('meta');
		meta.setAttribute('property', 'og:type');
		meta.content = json.type;
		if (document.querySelector("[property='og:type']")) {
			if (document.querySelector("[property='og:type']").content !== meta.content) {
				document.querySelector("[property='og:type']").content = meta.content;
			}
		}else{
			document.getElementsByTagName('head')[0].appendChild(meta);
		}

		meta = document.createElement('meta');
		meta.setAttribute('property', 'og:title');
		meta.content = json.title;
		if (document.querySelector("[property='og:title']")) {
			if (document.querySelector("[property='og:title']").content !== meta.content) {
				document.querySelector("[property='og:title']").content = meta.content;
			}
		}else{
			document.getElementsByTagName('head')[0].appendChild(meta);
		}

		meta = document.createElement('meta');
		meta.setAttribute('property', 'og:description');
		meta.content = json.description;
		if (document.querySelector("[property='og:description']")) {
			if (document.querySelector("[property='og:description']").content !== meta.content) {
				document.querySelector("[property='og:description']").content = meta.content;
			}
		}else{
			document.getElementsByTagName('head')[0].appendChild(meta);
		}

		meta = document.createElement('meta');
		meta.setAttribute('property', 'fileid');
		meta.content = json.fileid;
		if (document.querySelector("[property='fileid']")) {
			if (document.querySelector("[property='fileid']").content !== meta.content) {
				document.querySelector("[property='fileid']").content = meta.content;
  			}
		}else{
			document.getElementsByTagName('head')[0].appendChild(meta);
		}
		

		buildMetaUrl();

		//document.title = getFirstLine();
  }

// function updateProgress (e) {
// 	  if (e.lengthComputable)
// 	  {
// 	    var percentage = Math.round((e.loaded/e.total)*100);
// 	    console.log("percent " + percentage + '%' );
// 	  }
// 	  else 
// 	  {
// 	  	console.log("Unable to compute progress information since the total size is unknown");
// 	  }
// }

function downloadFromCloud (id,name) {
	downloadFromCloudNext(id,name,1);
}
function downloadFromCloudNext (id,name,part) {
  	// hide fb share button
	var fbShareButton = document.getElementById('idFBshareButton');
	if (fbShareButton) {
			fbShareButton.parentNode.removeChild(fbShareButton);
	}
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://wripix.xyz/full.php?part=' + part + '&fileid=' + id);
	xhr.responseType = 'blob';
	xhr.onload = function(e) {
		if(this) {
			if (this.status === 200) {
				var blob = this.response;
				var reader = new FileReader();
				reader.onload = function() {
					document.getElementById("iAmHere").innerHTML += reader.result;
					if (reader.result.length > 0) {
						downloadFromCloudNext(id,name,part+1);
					}
				};
				reader.readAsText(blob);
			}
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
						authorizeButton.click();
					}							
				};
				reader.readAsText(blob);
			}
		}
	};
	xhr.send();
}

function downloadFromCloud_old (id,name) {
  	// hide fb share button
	var fbShareButton = document.getElementById('idFBshareButton');
	if (fbShareButton) {
			fbShareButton.parentNode.removeChild(fbShareButton);
	}
  	//console.log(id);
  // 	if (gapi) {
  // 		// dahai: accss_token is necessary for file download, but i dont believe, There must be a solution in the world.
  // 		var accessToken;
  // 		if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
		// 	accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
		// }
		var xhr = new XMLHttpRequest();
		// xhr.open('GET', 'https://www.googleapis.com/drive/v3/files/' + id + '?alt=media');
		// if (accessToken) {
		// 	xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
		// }
		// xhr.onprogress = updateProgress;
		xhr.open('GET', 'https://wripix.xyz/full.php?fileid=' + id);
		xhr.responseType = 'blob';
		xhr.onload = function(e) {
			if(this) {
				if (this.status === 200) {
					var blob = this.response;
					//console.log(blob); // Retrieve uploaded file ID.
					var reader = new FileReader();
					reader.onload = function() {
						//alert(reader.result);
				     	document.getElementById("iAmHere").innerHTML = checkAndFindMyContent(stripScripts(reader.result));
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
								//handleAuthClick();
								authorizeButton.click();
							}							
						};
						reader.readAsText(blob);
					}
				}
			}
		};
		xhr.send();
	// }
  }
  function rebuildShareButton (id, name) {
		// remove button if it is exist
		var fbShareButton = document.getElementById('fbsharebuttonposition');
		if (fbShareButton) {
				// fbShareButton.parentNode.removeChild(fbShareButton);
				fbShareButton.innerHTML = "";
		}
		fbShareButton.style.display = 'inline-block';
		fbShareButton.style.width = '30';
		fbShareButton.style.height = '30';
		// fbShareButton.setAttribute('width', '30');
		// fbShareButton.setAttribute('height', '30');
		// build and show fb share button
		var url_encoded = encodeURIComponent("https://"+window.location.hostname+"/?qdata=" + btoa(unescape(encodeURIComponent(createQueryData()))));
		var name_encoded = encodeURIComponent(name);
		// var buttonimg = document.createElement('img');
		var svg_element = '\
		<path fill="#0000bf" \
		stroke="#000" \
		stroke-width="0" \
		d="m14.531263,27.33987c0,0 0.0625,3.062498 0.031236,3.035138c0.031264,0.02736 -8.343729,0.02736 -8.374993,0c0.031264,0.02736 -1.906235,-1.222639 -1.937498,-1.249999c0.031264,0.02736 -0.906236,-1.972639 -0.937499,-1.999998c0.031264,0.027359 0.093763,-22.847622 0.0625,-22.87498c0.031264,0.027358 0.906263,-1.66014 0.968763,-1.66014c0.0625,0 1.499999,-0.5625 1.687499,-0.5625c0.1875,0 21.312483,0 21.281218,-0.027358c0.031265,0.027358 1.343764,0.839857 1.343764,0.839857c0,0 0.25,1.687499 0.25,1.687499c0,0 0.1875,23.812481 0.156235,23.785121c0.031265,0.02736 -1.031234,1.339858 -1.031234,1.339858c0,0 -1.749999,0.874999 -1.749999,0.874999c0,0 -11.312491,-0.125 -11.343755,-0.15236c0.031264,0.02736 -0.406235,-3.035138 -0.406235,-3.035138l-0.000002,0.000001z"\
		id="svg_1"/>\
		<path id="svg_5" \
		d="m14.468792,27.527118l-0.156585,-11.964937l-4.812402,0.062499l0.124998,-3.374931l4.749903,-0.062499l-0.062499,-5.249892c0.031587,0.027681 4.843989,-1.347291 4.843989,-1.347291c0,0 2.499949,0.812484 2.468361,0.784802c0.031588,0.027682 -1.343384,3.590109 -1.374972,3.562427c0.031588,0.027682 -2.718356,-1.534786 -2.718356,-1.534786c0,0 -0.437491,0.562488 -0.469078,0.534807c0.031587,0.027681 0.094086,3.340113 0.062498,3.312432c0.031588,0.027681 4.78149,0.09018 4.749903,0.062499c0.031587,0.027681 0.031587,3.340113 0,3.312432c0.031587,0.027681 -4.780814,0.027681 -4.812401,0c0.031587,0.027681 0.031587,11.83994 0,11.812258c0.031587,0.027682 -1.124986,-0.249994 -2.593359,0.09018z" \
		stroke-width="0" \
		stroke="#000" \
		fill="#ffffff"/>';
		

		var svg_path1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
		// svg_path1.style.width = "100%";
		// svg_path1.style.height = "100%";
		// svg_path1.setAttributeNS("http://www.w3.org/2000/svg", 'transform','translate(30, 30)');
		// svg_path1.setAttributeNS("http://www.w3.org/2000/svg", 'height','30');
		// svg_path1.setAttributeNS("http://www.w3.org/2000/svg", 'width','30');
		svg_path1.setAttributeNS("http://www.w3.org/2000/svg", 'fill','#0000bf');
		svg_path1.setAttributeNS("http://www.w3.org/2000/svg", 'stroke','#000');
		svg_path1.setAttributeNS("http://www.w3.org/2000/svg", 'stroke-width','0');
		svg_path1.setAttributeNS("http://www.w3.org/2000/svg", 'd','m14.531263,27.33987c0,0 0.0625,3.062498 0.031236,3.035138c0.031264,0.02736 -8.343729,0.02736 -8.374993,0c0.031264,0.02736 -1.906235,-1.222639 -1.937498,-1.249999c0.031264,0.02736 -0.906236,-1.972639 -0.937499,-1.999998c0.031264,0.027359 0.093763,-22.847622 0.0625,-22.87498c0.031264,0.027358 0.906263,-1.66014 0.968763,-1.66014c0.0625,0 1.499999,-0.5625 1.687499,-0.5625c0.1875,0 21.312483,0 21.281218,-0.027358c0.031265,0.027358 1.343764,0.839857 1.343764,0.839857c0,0 0.25,1.687499 0.25,1.687499c0,0 0.1875,23.812481 0.156235,23.785121c0.031265,0.02736 -1.031234,1.339858 -1.031234,1.339858c0,0 -1.749999,0.874999 -1.749999,0.874999c0,0 -11.312491,-0.125 -11.343755,-0.15236c0.031264,0.02736 -0.406235,-3.035138 -0.406235,-3.035138l-0.000002,0.000001z');
		svg_path1.setAttributeNS("http://www.w3.org/2000/svg", 'id','svg_1');
		svg_path1.setAttributeNS("http://www.w3.org/2000/svg", 'onclick', 'fbshareCurrentPage("'+url_encoded+'","'+name_encoded+'")');
		var svg_path2 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
		svg_path2.style.width = "100%";
		svg_path2.style.height = "100%";
		svg_path2.setAttributeNS("http://www.w3.org/2000/svg", 'fill','#ffffff');
		svg_path2.setAttributeNS("http://www.w3.org/2000/svg", 'stroke-width','0');
		svg_path2.setAttributeNS("http://www.w3.org/2000/svg", 'stroke','#000');
		svg_path2.setAttributeNS("http://www.w3.org/2000/svg", 'd','m14.468792,27.527118l-0.156585,-11.964937l-4.812402,0.062499l0.124998,-3.374931l4.749903,-0.062499l-0.062499,-5.249892c0.031587,0.027681 4.843989,-1.347291 4.843989,-1.347291c0,0 2.499949,0.812484 2.468361,0.784802c0.031588,0.027682 -1.343384,3.590109 -1.374972,3.562427c0.031588,0.027682 -2.718356,-1.534786 -2.718356,-1.534786c0,0 -0.437491,0.562488 -0.469078,0.534807c0.031587,0.027681 0.094086,3.340113 0.062498,3.312432c0.031588,0.027681 4.78149,0.09018 4.749903,0.062499c0.031587,0.027681 0.031587,3.340113 0,3.312432c0.031587,0.027681 -4.780814,0.027681 -4.812401,0c0.031587,0.027681 0.031587,11.83994 0,11.812258c0.031587,0.027682 -1.124986,-0.249994 -2.593359,0.09018z');
		svg_path2.setAttributeNS("http://www.w3.org/2000/svg", 'onclick', 'fbshareCurrentPage("'+url_encoded+'","'+name_encoded+'")');


		// svg_g1.style.width = "100%";
		// svg_g1.setAttributeNS("http://www.w3.org/2000/svg", 'height','100%');
		// svg_g1.setAttributeNS("http://www.w3.org/2000/svg", 'width','100%');
		// buttonimg.src = "https://assets.cobaltnitra.com/teams/repository/export/685/994e08a161005809f00505692530e/685994e08a161005809f00505692530e.png";
		// buttonimg.setAttribute("style","width: 30px;");

		// viewBox="0 0 362 232" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
		//fbShareButton.setAttribute('id','idFBshareButton');
		// fbShareButton.innerHTML = svg_element;
		// <rect x="0" y="0" width="146" height="94" fill-opacity="0" stroke-opacity="0"></rect>


		var svgRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
		svgRect.setAttributeNS("http://www.w3.org/2000/svg", 'x','0');
		svgRect.setAttributeNS("http://www.w3.org/2000/svg", 'y','0');
		svgRect.style.width = "100%";
		svgRect.setAttributeNS("http://www.w3.org/2000/svg", 'width','100%');
		svgRect.setAttributeNS("http://www.w3.org/2000/svg", 'height','100%');
		svgRect.setAttributeNS("http://www.w3.org/2000/svg", 'fill','white');
		// svgRect.setAttributeNS("http://www.w3.org/2000/svg", 'fill-opacity','0');
		svgRect.setAttributeNS("http://www.w3.org/2000/svg", 'stroke-opacity','0');
		svgRect.setAttributeNS("http://www.w3.org/2000/svg", 'onclick', 'fbshareCurrentPage("'+url_encoded+'","'+name_encoded+'")');


		var svg_g1 = document.createElementNS("http://www.w3.org/2000/svg", 'g');
		svg_g1.appendChild(svg_path1);


		var fbShareButtonHref = document.createElementNS("http://www.w3.org/2000/svg", 'a');
		fbShareButtonHref.style.width = "100%";
		// fbShareButtonHref.setAttributeNS("http://www.w3.org/2000/svg", 'xlink:href', 'javascript:fbshareCurrentPage("'+url_encoded+'","'+name_encoded+'")');
		// fbShareButtonHref.setAttributeNS("http://www.w3.org/2000/svg", 'onclick', 'fbshareCurrentPage("'+url_encoded+'","'+name_encoded+'")');
		fbShareButtonHref.appendChild(svgRect);


		// svg_g1.appendChild(svg_path2);


		var fbShareButtonSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		document.getElementById('fbsharebuttonposition').appendChild(fbShareButtonSvg);


		//fbShareButtonSvg.appendChild(fbShareButton);
		// fbShareButtonSvg.setAttribute('viewBox', '0 0 100 100');
		// fbShareButtonSvg.setAttributeNS("http://www.w3.org/2000/svg", 'viewBox', '0 0 30 30');
		fbShareButtonSvg.setAttributeNS("http://www.w3.org/2000/svg", 'id', 'idFBshareButton');
		// fbShareButtonSvg.setAttribute('x','0');
		// fbShareButtonSvg.setAttribute('y','0');
		fbShareButtonSvg.setAttributeNS("http://www.w3.org/2000/svg", 'width', '30');
		fbShareButtonSvg.setAttributeNS("http://www.w3.org/2000/svg", 'height', '30');
		fbShareButtonSvg.setAttributeNS("http://www.w3.org/2000/svg", 'version', '1.1');
		fbShareButtonSvg.style.height = '100%';
		fbShareButtonSvg.style.width = '100%';
		// fbShareButtonSvg.innerHTML = svg_element;
		//fbShareButtonSvg.appendChild(svgRect);
		// fbShareButtonSvg.appendChild(fbShareButtonHref);


		 fbShareButtonSvg.innerHTML = svg_path1.outerHTML + svg_path2.outerHTML;
		// fbShareButtonSvg.append(svg_path1);



		// fbShareButtonSvg.setAttributeNS("http://www.w3.org/2000/svg", 'xmlns', 'http://www.w3.org/2000/svg');
		// fbShareButtonSvg.setAttributeNS("http://www.w3.org/2000/svg", 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
		// var fbShareButton = document.createElement('a');
		// fbShareButton.setAttribute('id','idFBshareButton');
		// fbShareButton.setAttribute('href', 'javascript:fbshareCurrentPage("'+url_encoded+'","'+name_encoded+'")');
		// fbShareButton.setAttribute('target', '_blank');
		// fbShareButton.appendChild(buttonimg);
		//document.getElementById('fbsharebuttonposition').parentNode.insertBefore(fbShareButtonSvg,document.getElementById('fbsharebuttonposition'));

//<a href="javascript:fbshareCurrentPage()" target="_blank" alt="Share on Facebook"><img src="https://assets.cobaltnitra.com/teams/repository/export/685/994e08a161005809f00505692530e/685994e08a161005809f00505692530e.png" style="width: 30px; alt=" alt="" /></a>		  	
  }
  function uploadToCloudAndShare () {
  	var afterUploadThenShare = function (id, name) {
//		var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
		
		var accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token; // Here gapi is used for retrieving the access token.


// 	gapi.client.request({
// 		'path': 'https://www.googleapis.com/drive/v3/files/'+id+'/permissions',
// 		'method': 'GET',
// 		'params': '{"fileId": '+id+'}',
// 	}).then(function(response) {
//   // Handle response
//   console.log(response);
// }, function(reason) {
//   // Handle error
//   console.log(reason);
// });


	gapi.client.request({
		'path': 'https://www.googleapis.com/drive/v3/files/'+id+'/permissions',
		'method': 'POST',
		'params': '{"fileId": '+id+'}',
		'body': '{"role":"reader","type":"anyone"}'
	}).then(function(response) {
  // Handle response
  console.log(response);
}, function(reason) {
  // Handle error
  console.log(reason);
});



		// var form = new FormData();
		// form.append('role', 'reader');
		// form.append('type', 'anyone');

		// var xhr = new XMLHttpRequest();
		// xhr.open('POST', 'https://www.googleapis.com/drive/v3/files/'+id+'/permissions');
		// //xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
		// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		// xhr.responseType = 'blob';
		// xhr.onload = function(e) {
		// 	if (this.status === 200) {
		// 	    var init = function() {
		// 	        var s = new gapi.drive.share.ShareClient();
		// 	        s.setOAuthToken(accessToken);
		// 	        s.setItemIds([id]);

		// 	        	s.showSettingsDialog();

		// 	    }
		// 	    gapi.load('drive-share', init);
		// 	}else{
		// 			if (this.response.type === "application/json") {
		// 				var blob = this.response;
		// 				var reader = new FileReader();
		// 				reader.onload = function() {
		// 					var res = reader.result;
		// 					console.log(res);
		// 				};
		// 				reader.readAsText(blob);
		// 			}
		// 	}
		// };
		// xhr.send(form);



// POST https://www.googleapis.com/drive/v3/files/{fileId}/permissions?key={YOUR_API_KEY}
// {
// "role":"reader",
// "type":"user",
// "emailAddress":"xxxxxxxx@xxx.com"
// }


	    //var url = 'https://'+window.location.hostname+'/?fileid=' + id;
	    //console.log(url);

	    buildPageMeta(id);

	    rebuildShareButton(id, name);
	 }; // afterUploadThenShare

  	uploadToCloud (afterUploadThenShare);
  }

	function addWripixShare ( id) {
		gapi.client.request({
			'path': 'https://www.googleapis.com/drive/v3/files/'+ id +'/permissions',
			'method': 'POST',
			'params': '{"fileId": '+ id +'}',
			'body': '{"role":"reader","type":"user","emailAddress":"wripix@gmail.com"}'
		}).then(function(response) {
		  // Handle response
		  console.log(response);
		  listFiles();
		}, function(reason) {
		  // Handle error
		  console.log(reason);
		});
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
		    	
				var id = xhr.response.id;
				setTimeout('addWripixShare("' + id + '");',1500);

			    if (afterUploadThenShareFunction) {
			    	afterUploadThenShareFunction(xhr.response.id, filename);
				}
			}else{
				if (xhr.result) {
					console.log(xhr.result);
				}else if (xhr.response) {
					console.log(xhr.response);
				}else{
					console.log(xhr);
				}
			}
		};
		xhr.send(form);
	}
  }
  function gotoURLbyId (id, name) {
  	window.location.href = 'https://'+window.location.hostname+'/?fileid=' + id;
  }

  
      // Client ID and API key from the Developer Console
      var CLIENT_ID = '797948848378-0po451kj7nqm08atu85jha2vckrn9pgh.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyBGRwie6OSq5sOM3N-DK3GopS1O0EjWrBY';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file';

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
          appendFilesList("Need to connecnt to your Google Account.");
          console.log(JSON.stringify(error, null, 2));
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
          tryToReloadFile();
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
          //'q': "fileExtension='html'",
          'q': "'wripix@gmail.com' in readers",
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



function tryToReloadFile() {
	if (document.querySelector("[property='fileid']")) {
		var fileid = document.querySelector("[property='fileid']").content;
		downloadFromCloud(fileid,"");
	}
}
function fbshareCurrentPage(url_encoded, name)
    {  
    	// window.open(
    	// 	"https://www.facebook.com/sharer/sharer.php?u="+escape(url)+"&t="+name, '', 
    	// 	'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'
    	// 	);
    	console.log(url_encoded);
    	var fbShareRest = "https://www.facebook.com/dialog/share?&app_id=2373370826211241&display=popup&href=" + url_encoded + "&redirect_uri=" + url_encoded;
    	console.log(fbShareRest);
    	window.open(fbShareRest);
    	return false; 
    }

function changePaperStyle(num) {
	var editAreaElement = document.getElementById('iAmHere');
	if (num === 1) {
		editAreaElement.classList.remove('notebook-paper','printer-paper');
		editAreaElement.classList.add('white-paper');
	}
	if (num === 2) {
		editAreaElement.classList.remove('white-paper','printer-paper');
		editAreaElement.classList.add('notebook-paper');
	}
	if (num === 3) {
		editAreaElement.classList.remove('white-paper','notebook-paper');
		editAreaElement.classList.add('printer-paper');
	}
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
    //setTimeout('downloadFromCloud("'+fileid+'","");',5000);
    //document.getElementById("iAmHere").innerHTML="<p><br></p>";
    setTimeout('downloadFromCloud("'+fileid+'","");',5000);
}
var qdata = aryPara['qdata'];
if (qdata) {
		// because when i build the fb share button, the data has been encode again, so here i must decode first
		// https://stackoverflow.com/a/44344774
		// server side will exchange 'plus' replace by 'space'
		var decoded = decodeURIComponent(qdata);
		var replaced = decoded.split(' ').join('+');
		var jsonString = decodeURIComponent(escape(atob(replaced)));
		var json = JSON.parse(jsonString);
		if (json.fileid){
	    	setTimeout('downloadFromCloud("'+json.fileid+'","");',5000);
	    }
	    rebuildPageMetaFromQdata(json);
	    //document.getElementById("iAmHere").innerHTML="<p><br></p>";		
	}
}

var radios = document.getElementsByName('paperstyleselector');

for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
        // do whatever you want with the checked radio
        radios[i].click();

        // only one radio can be logically checked, don't check the rest
        break;
    }
}

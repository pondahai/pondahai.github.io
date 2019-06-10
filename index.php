<html >
<head>
    <?php include("head.php"); ?>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-57926490-2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
if (window.location.hostname.match('jolted-troop.000webhostapp.com')) {
  gtag('config', 'UA-57926490-3');
}
if (window.location.hostname.match('pondahai.github.io')) {
  gtag('config', 'UA-57926490-2');
}
</script>

<meta content='text/html; charset=UTF-8' http-equiv='Content-Type'/>
    <meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id" content="797948848378-0po451kj7nqm08atu85jha2vckrn9pgh.apps.googleusercontent.com">
<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/medium-editor.js"></script>
<script src="js/svg.js"></script>
<script src="js/svg.draw.js"></script>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
<link rel="stylesheet" href="css/medium-editor.css"> <!-- Core -->
<link rel="stylesheet" href="css/themes/dahai.css"> <!-- or any other theme -->
<link rel="stylesheet" href="css/others.css"> <!-- or any other theme -->

</head>
<body >
	   <div id="iAmHere" class="editable" ></div>

<div style="background-color:#220000;padding:10px;height:100%;background-repeat:repeat-x">
   
   <!-- function buttons -->
    <span style="float:left;margin:20px;">
        <!--Add buttons to initiate auth sequence and sign out-->
        <button id="authorize_button" class="example_b" style="display: none;">Google Account Authorize</button>
        <button id="signout_button" class="example_b" style="display: none;">Sign Out</button>

        

        <button id="savefile_button" class="example_b" onclick="downloadFileFromCurrentDocument();"><font size="5">&#x21D2; &#128190;</font></button>
        <button id="loadfile_button" class="example_b" onclick="uploadFileToCurrentDocument();"><font size="5">&#128190; &#x21D2;</font></button>

        <!--
        <button id="loadcloudfile_button" class="example_b" onclick="downloadFromCloud();"><font size="5">&#9729; &#x21D2;</font></button>
    -->
        <button id="savecloudfile_button" class="example_b" onclick="uploadToCloud();"><font size="5">&#x21D2; &#9729;</font></button>

        <button id="sharefile_button" class="example_b" onclick="uploadToCloudAndShare();"><font size="5">分</font></button>
        
        <!-- 
            fb share button
        -->
        	<span id="fbsharebuttonposition"></span>

    </span>


    <!-- radio button for paper style change -->

    <span style="float:middle;">
        <!-- <form > -->
        <div  class="radio-group">
            <input type="radio" id="option-one" name="paperstyleselector" onclick="changePaperStyle(1);"><label for="option-one">口</label><input type="radio" id="option-two" name="paperstyleselector" checked="checked" onclick="changePaperStyle(2);"><label for="option-two">三</label><input type="radio" id="option-three" name="paperstyleselector" onclick="changePaperStyle(3);"><label for="option-three">回</label>
        </div>
        <!-- </form> -->
    </span>

    <!-- pondahai -->
    <!--
    <span style="float:right;" ><font color="white" size="1"><a href="https://www.facebook.com/pondahai">pondahai 2019</a></font></span>
    -->
    <span style="float:right;">
      <svg width="100%" height="100" >
        <text text-anchor="middle" x="50%" y="50%" class="text text-1 ">
        <a href="https://www.facebook.com/pondahai">pondahai 2019</a>
        </text>
        <text text-anchor="middle" x="50%" y="50%" class="text text-2 ">
        <a href="https://www.facebook.com/pondahai">pondahai 2019</a>
        </text>
        <text text-anchor="middle" x="50%" y="50%" class="text text-3 ">
        <a href="https://www.facebook.com/pondahai">pondahai 2019</a>
        </text>
        <text text-anchor="middle" x="50%" y="50%" class="text text-4 ">
        <a href="https://www.facebook.com/pondahai">pondahai 2019</a>
        </text>
      </svg> 
    </span>

    <div >
        <!-- <span style="float:left;color:white;"> -->
            <span align="left" id="fileslist" style="float:left;color:white;white-space: pre-wrap;width:95%;"></span>
        <!-- </span> -->
    </div>
</div>



<!--
<div class="button_cont" align="center"><a class="example_b" href="add-website-here" target="_blank" rel="nofollow noopener" onclick="downloadCurrentDocument();">&#x21D2; &#128190;</a></div>
<div class="button_cont" align="center"><a class="example_b" href="add-website-here" target="_blank" rel="nofollow noopener" onclick="uploadToCurrentDocument();">&#128190; &#x21D2;</a></div>
-->


<script>
	var editor = new MediumEditor('.editable',{
  	autoLink: true,
    allowMultiParagraphSelection: false,
  	toolbar: {
  		buttons: [
      'bold', 
      'italic', 
      'underline', 
      'anchor', 
      'quote', 
       {
              name: 'justifyLeft',
              action: 'justifyLeft',
              aria: 'left justify',
              tagNames: [],
              style: {
                  prop: 'text-align',
                  value: 'left'
              },
              contentDefault: '<font size="5" style="position: absolute;top: 13%;left:42%">⇤</font>',
              contentFA: '<i class="fa fa-align-left"></i>'
          },
       {
              name: 'justifyCenter',
              action: 'justifyCenter',
              aria: 'center justify',
              tagNames: [],
              style: {
                  prop: 'text-align',
                  value: 'center'
              },
              contentDefault: '<font size="5" style="position: absolute;top: 10%;left:49%">|</font>',
              contentFA: '<i class="fa fa-align-center"></i>'
          },
       {
              name: 'justifyRight',
              action: 'justifyRight',
              aria: 'right justify',
              tagNames: [],
              style: {
                  prop: 'text-align',
                  value: 'right'
              },
              contentDefault: '<font size="5" style="position: absolute;top: 13%;left:53%">⇥</font>',
              contentFA: '<i class="fa fa-align-right"></i>'
          },
          {
              name: 'h1',
              action: 'append-h1',
              aria: 'header type one',
              tagNames: ['h1'],
              contentDefault: '<font size="6" style="position: absolute;top: 0%;left:65%">字</font>',
              contentFA: '<i class="fa fa-header"><sup>1</sup>'
          },
          {
              name: 'h2',
              action: 'append-h2',
              aria: 'header type two',
              tagNames: ['h2'],
              contentDefault: '<font size="5">字</font>',
              contentFA: '<i class="fa fa-header"><sup>2</sup>'
          },
          {
              name: 'h6',
              action: 'append-h6',
              aria: 'header type six',
              tagNames: ['h6'],
              contentDefault: '<font size="1" style="position: absolute;top: 33%;left:83%">字</font>',
              contentFA: '<i class="fa fa-header"><sup>6</sup>'
          },
      'pre'
      ]
  	},
    anchor: {
        /* These are the default options for anchor form,
           if nothing is passed this is what it used */
        customClassOption: null,
        customClassOptionText: 'Button',
        linkValidation: false,
        placeholderText: 'Paste or type a link',
        targetCheckbox: true,
        targetCheckboxText: 'Open in new window'
    }
});
</script>
<script src="js/others.js"></script>
<script async defer src="https://apis.google.com/js/api.js"
  onload="this.onload=function(){};handleClientLoad()"
  onreadystatechange="if (this.readyState === 'complete') this.onload()">
</script>
</body>
</html>
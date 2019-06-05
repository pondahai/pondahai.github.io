<?php
	if (isset($_GET['fileid'])) {
    	$fileid = $_GET['fileid'];
	}
	if (isset($_GET['qdata'])) {
		$qdata =  $_GET['qdata'];	
	    $json = base64_decode(strtr($qdata, ' ', '+'));
	    $var = json_decode($json, true);
	    //var_dump ($var);
	    $type = $var["type"];
	    $title = $var["title"];
	    $description = $var["description"];
	    $fileid = $var["fileid"];
	}
    
    $host_name = $_SERVER['HTTP_HOST'];

	if (isset($title)) {
		echo '<meta property="og:title" content="'.$title.'" />';
		echo '<title>'.$title.'</title>';
	}
	if (isset($type)) {
		echo '<meta property="og:type" content="'.$type.'" />';
	}
	if (isset($description)) {
		echo '<meta property="og:description" content="'.$description.'" />';
	}	
	if (isset($qdata)) {
		echo '<meta property="og:url" content="https://'.$host_name.'/?qdata='.$qdata.'" />';
	}	
	if (isset($fileid)) {
		echo '<meta property="fileid" content="'.$fileid.'" />';
	}
?>
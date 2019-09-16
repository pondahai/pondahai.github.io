<?php

$url = $_GET['url'];
//website url
$siteURL = $url;



// //call Google PageSpeed Insights API
// $googlePagespeedData = file_get_contents("https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=$siteURL&screenshot=true");

// //decode json data
// $googlePagespeedData = json_decode($googlePagespeedData, true);

// //screenshot data
// $screenshot = $googlePagespeedData['screenshot']['data'];
// $screenshot = str_replace(array('_','-'),array('/','+'),$screenshot); 



$dom = new DOMDocument();
@$dom->loadHTML(file_get_contents($siteURL), FALSE, NULL, -1, 1000000);
$searchNode = $dom->getElementsByTagName( "image" );
if ($searchNode->length == 0) { 
	$source = imagecreatefrompng('icon01.png'); 
}else{
	foreach( $searchNode as $searchNode ) 
	{
	    $screenshot = $searchNode->getAttribute( "xlink:href" ); 
	    break;
	}
	$screenshot = str_replace('data:image/png;base64,','',$screenshot);
	$screenshot = str_replace(array('_','-'),array('/','+'),$screenshot); 

	//display screenshot image
	//echo "<img src=\"data:image/jpeg;base64,".$screenshot."\" />";
	$data = base64_decode($screenshot);
	$source = imagecreatefromstring($data);
}
$x = imagesx($source);
$y = imagesy($source);
// horizontal rectangle
if ($x > $y) {
    $square = $y;              // $square: square side length
    $offsetX = ($x - $y) / 2;  // x offset based on the rectangle
    $offsetY = 0;              // y offset based on the rectangle
}
// vertical rectangle
elseif ($y > $x) {
    $square = $x;
    $offsetX = 0;
    $offsetY = ($y - $x) / 2;
}
// it's already a square
else {
    $square = $x;
    $offsetX = $offsetY = 0;
}

$endSize = 400;

header("Content-type: image/png");
$thumb = imagecreatetruecolor($endSize , $endSize);
imagecopyresized($thumb, $source, 0, 0, $offsetX, $offsetY, $endSize, $endSize, $square, $square);

imagepng($thumb);

imagedestroy($source);
imagedestroy($thumb);

?>

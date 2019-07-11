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
@$dom->loadHTML(file_get_contents($siteURL));
$searchNode = $dom->getElementsByTagName( "image" ); 
foreach( $searchNode as $searchNode ) 
{
    $screenshot = $searchNode->getAttribute( "xlink:href" ); 
    break;
}
$screenshot = str_replace('data:image/png;base64,','',$screenshot);
$screenshot = str_replace(array('_','-'),array('/','+'),$screenshot); 

//display screenshot image
//echo "<img src=\"data:image/jpeg;base64,".$screenshot."\" />";
header("Content-type: image/png");
$data = base64_decode($screenshot);
$source = imagecreatefromstring($data);
$thumb = imagecreatetruecolor(400, 400);
imagecopyresized($thumb, $source, 0, 0, 0, 0, 400, 400, imagesx($source), imagesy($source));

imagepng($thumb);

imagedestroy($source);
imagedestroy($thumb);

?>

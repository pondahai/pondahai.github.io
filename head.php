<?php
	include_once('simple_html_dom.php');
   require __DIR__ . '/vendor/autoload.php';
   function getClient()
    {
        $client = new Google_Client();
        $client->setApplicationName('Google Drive API PHP Quickstart');
        $client->setScopes(Google_Service_Drive::DRIVE);
        $client->setAuthConfig('credentials.json');
        $client->setAccessType('offline');
        $client->setPrompt('select_account consent');

        // Load previously authorized token from a file, if it exists.
        // The file token.json stores the user's access and refresh tokens, and is
        // created automatically when the authorization flow completes for the first
        // time.
        $tokenPath = 'gs://wripix.appspot.com/token.json';
        if (file_exists($tokenPath)) {
            $accessToken = json_decode(file_get_contents($tokenPath), true);
            $client->setAccessToken($accessToken);
        }

        // If there is no previous token or it's expired.
        if ($client->isAccessTokenExpired()) {
            // Refresh the token if possible, else fetch a new one.
            if ($client->getRefreshToken()) {
                $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            } else {
                // Request authorization from the user.
                //$authUrl = $client->createAuthUrl();
                //printf("Open the following link in your browser:\n%s\n", $authUrl);
                //print 'Enter verification code: ';
                //$authCode = trim(fgets(STDIN));
                //$authCode = "4/aAGLmcESvnLuHEsRKWoKr6n_TEeToEFME1it7AFtMUJLBCGdoWQXyhE";
                //$authCode = "4/aAEb-0GT_X0imPagb16loIuU20CfNupj6w6PTfu-FKctzYhOw3LszNA";
                //$authCode = "4/aAE1Mzfen3Fu4BbkBGUV6zMsHV3QaAXcQWoAF1Lf20m00-VstwIDHFI";
                $authCode = "4/agFPm8VRPewAySX2rGrbUtm2YouoPxAW0mainQugwCg4raI3D4uBxCA";
                // Exchange authorization code for an access token.
                $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
                $client->setAccessToken($accessToken);

                // Check to see if there was an error.
                if (array_key_exists('error', $accessToken)) {
                    throw new Exception(join(', ', $accessToken));
                }
            }
            // Save the token to a file.
            if (!file_exists(dirname($tokenPath))) {
                mkdir(dirname($tokenPath), 0700, true);
            }
            file_put_contents($tokenPath, json_encode($client->getAccessToken()));
        }
        return $client;
    }

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

	// for content prefetch
    $client = getClient();
    $http = $client->authorize();
    $driveService = new Google_Service_Drive($client);
   	if(isset($fileid) and isset($driveService)) {
        // $response = $driveService->files->get($fileid, array('alt' => 'media'));
         $response = $http->request(
	        'GET',
	        sprintf('/drive/v3/files/%s', $fileId),
	        [
	            'query' => ['alt' => 'media'],
	            'headers' => [
	                'Range' => 'bytes=0-1000000'
	            ]
	        ]
	    );
        $content = $response->getBody()->getContents();
        $html = str_get_html($content);
        if(isset($html) and is_object($html)) {
        	$find_first_element = $html->find('*',0);
        	if(is_object($find_first_element)){
        		$title = substr(strtok($find_first_element->innertext, "\n"),0,100);
        	}
        	$find_secend_element = $html->find('*',1);
        	if(is_object($find_secend_element)){
        		$description = substr(strtok($find_secend_element->innertext, "\n"),0,100);
        	}
    	}
	}
	    
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
		echo '<meta property="og:image" content="https://'.$host_name.'/create_image.php?url=https://wripix.xyz?fileid='.$fileid.'&amp;ext=.png" />';
		echo '<meta property="og:image:width" content="400">';
		echo '<meta property="og:image:height" content="400">';
	}
?>
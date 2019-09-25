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
	if (isset($_GET['part'])) {
        $parameter_part = true;
		$part = $_GET['part'];
	}else{
        $parameter_part = false;
		$part = 0;
	}
    if (isset($_GET['reqsize'])) {
        $parameter_reqsize = true;
        $reqsize = $_GET['reqsize'];
    }else{
        $parameter_reqsize = false;
        $reqsize = 0;
    }

    $host_name = $_SERVER['HTTP_HOST'];

	$chunkSizeBytes = 1 * 1024 * 1024;
	$chunkStart =  ($part * 1024 * 1024) + (1 * $part);
// for content prefetch
    $client = getClient();
    $http = $client->authorize();
    //$driveService = new Google_Service_Drive($client);
    $content = '';
    $filesize = 0;

  	if($parameter_part and isset($fileid) and isset($http)) {
        $chunkEnd = $chunkStart + $chunkSizeBytes;
        // $response = $driveService->files->get($fileid, array('alt' => 'media'));
         $response = $http->request(
            'GET',
            sprintf('/drive/v3/files/%s', $fileid),
            [
                'query' => ['alt' => 'media'],
                'headers' => [
                    'Range' => sprintf('bytes=%s-%s', $chunkStart, $chunkEnd)
                ]
            ]
        );
        $chunkStart = $chunkEnd + 1;
        $content = $response->getBody()->getContents();
        //$html = str_get_html($content);
        if ($response->getStatusCode() != 200) {
            http_response_code($response->getStatusCode());
        }else{ 
            if (isset($content)) {
                echo $content;
        }}
	}

   	// if(isset($fileid) and isset($driveService)) {
   	if($parameter_reqsize and isset($fileid) and isset($http)) {
         $response = $http->request(
	        'GET',
	        sprintf('/drive/v3/files/%s?fields=size', $fileid)		        
	    );
        $data = json_decode(str_get_html($response->getBody()->getContents()));
        if (isset($data)) {
        	$filesize = $data->size;
            echo $filesize;
    	}
	}
	// header('Content-Length: '.$filesize);
 //   	if(isset($fileid) and isset($http)) {
 //        while ($chunkStart < $filesize) {
 //            $chunkEnd = $chunkStart + $chunkSizeBytes;
 //            // $response = $driveService->files->get($fileid, array('alt' => 'media'));
 //             $response = $http->request(
 //                'GET',
 //                sprintf('/drive/v3/files/%s', $fileid),
 //                [
 //                    'query' => ['alt' => 'media'],
 //                    'headers' => [
 //                        'Range' => sprintf('bytes=%s-%s', $chunkStart, $chunkEnd)
 //                    ]
 //                ]
 //            );
 //            $chunkStart = $chunkEnd + 1;
 //            $content = $response->getBody()->getContents();
 //            //$html = str_get_html($content);
 //            if (isset($content)) {
 //                echo $content;
 //            }
            
 //        }
	// }


?>

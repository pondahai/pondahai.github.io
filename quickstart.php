<?php 
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
                    $authCode = "4/agE0ct84rP_6dXR_GE0-mezEmHWEUOcqbd_VYNJFKDcJdfXjOdtS8KE";
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
        $client = getClient();
        $driveService = new Google_Service_Drive($client);

        //$fileId = '0BwwA4oUTeiV1UVNwOHItT0xfa2M';
       if(isset($fileid)) {
            $response = $driveService->files->get($fileid, array('alt' => 'media'));
            $content = $response->getBody()->getContents();
            print $content;
        }
?>
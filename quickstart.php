<?php 

        //$fileId = '0BwwA4oUTeiV1UVNwOHItT0xfa2M';
        if(isset($fileid) and isset($http) and isset($content) and isset($html) and is_object($html)) {
        // print $content;
            $dom = new DOMDocument;
            foreach($html->find('*') as $element)
                $dom->loadHTML($element);
                if ($dom->validate()) {
                    echo $element;
                }
                

            // $find_first_element = $html->find('*', 0);
            // if(is_object($find_first_element)){
            //     print $find_first_element;
            // }
            // $find_secend_element = $html->find('*', 1);
            // if(is_object($find_secend_element)){
            //     print $find_secend_element;
            // }
            // $find_third_element = $html->find('*', 2);
            // if(is_object($find_third_element)){
            //     print $find_third_element;
            // }


            // // print the prefetch
            // echo $content;
            // // print the remain
            // while ($chunkStart < $filesize) {
            //     $chunkEnd = $chunkStart + $chunkSizeBytes;
            //     // $response = $driveService->files->get($fileid, array('alt' => 'media'));
            //      $response = $http->request(
            //         'GET',
            //         sprintf('/drive/v3/files/%s', $fileid),
            //         [
            //             'query' => ['alt' => 'media'],
            //             'headers' => [
            //                 'Range' => sprintf('bytes=%s-%s', $chunkStart, $chunkEnd)
            //             ]
            //         ]
            //     );
            //     $chunkStart = $chunkEnd + 1;
            //     $content = $response->getBody()->getContents();
            //     $html = str_get_html($content);
            //     if (isset($content)) {
            //         echo $content;
            //     }                
            // }          
        }
?>

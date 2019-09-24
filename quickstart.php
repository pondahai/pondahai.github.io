<?php 

function truncateHTML($html, $length)
{
    $truncatedText = substr($html, $length);
    $pos = strpos($truncatedText, ">");
    if($pos !== false)
    {
        $html = substr($html, 0,$length + $pos + 1);
    }
    else
    {
        $html = substr($html, 0,$length);
    }

    preg_match_all('#<(?!meta|img|br|hr|input\b)\b([a-z]+)(?: .*)?(?<![/|/ ])>#iU', $html, $result);
    $openedtags = $result[1];

    preg_match_all('#</([a-z]+)>#iU', $html, $result);
    $closedtags = $result[1];

    $len_opened = count($openedtags);

    if (count($closedtags) == $len_opened)
    {
        return $html;
    }

    $openedtags = array_reverse($openedtags);
    for ($i=0; $i < $len_opened; $i++)
    {
        if (!in_array($openedtags[$i], $closedtags))
        {
            $html .= '</'.$openedtags[$i].'>';
        }
        else
        {
            unset($closedtags[array_search($openedtags[$i], $closedtags)]);
        }
    }


    return $html;
}
        //$fileId = '0BwwA4oUTeiV1UVNwOHItT0xfa2M';
        if(isset($fileid) and isset($http) and isset($content) and isset($html) and is_object($html)) {
        // print $content;
            foreach($html->find('*') as $element)
                echo truncateHTML($element, strlen($element));
                

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

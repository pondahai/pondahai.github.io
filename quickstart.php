<?php 

        //$fileId = '0BwwA4oUTeiV1UVNwOHItT0xfa2M';
        if(isset($content)) {
            // print $content;
                $find_first_element = $html->find('*', 0);
                if(is_object($find_first_element)){
                    print $find_first_element;
                }
                $find_secend_element = $html->find('*', 1);
                if(is_object($find_secend_element)){
                    print $find_secend_element;
                }
                $find_third_element = $html->find('*', 2);
                if(is_object($find_third_element)){
                    print $find_third_element;
                }
        }
?>
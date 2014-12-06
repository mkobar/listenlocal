<?php

    ini_set("include_path", '/home/ericrich/php:' . ini_get("include_path")  );
    require_once 'HTTP/Request2.php';

    $location = "";
    if (isset($_GET['location']))
    {
	   $location = $_GET['location'];
    }
    else
    {
	   http_response_code(400);
	   exit(0);
    }

    $request = new HTTP_Request2("http://developer.echonest.com/api/v4/artist/search?"
	."api_key=6L1DANBQHJAEEF7NN&format=json&artist_location="
	.urlencode($location)
	."&bucket=id:rdio-US", HTTP_Request2::METHOD_GET);

    try {
        $response = $request->send();
        if (200 == $response->getStatus())
        {
            echo $response->getBody();
        }
        else
        {
            echo 'Unexpected HTTP status: ' . $response->getStatus() . ' ' .
            $response->getReasonPhrase();
        }
    }
    catch (HTTP_Request2_Exception $e)
    {
        echo 'Error: ' . $e->getMessage();
    }

?>
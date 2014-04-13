<?php

ini_set('display_errors', '0');

require_once "/home/destipix/php/HTTP/Request.php";

$inputLocation = "";
if (isset($_GET['location'])) {
	$inputLocation = $_GET['location'];
} else {
	http_response_code(400);
	exit(0);
}



$request = new HTTP_Request("http://developer.echonest.com/api/v4/artist/search?"
	."api_key=6L1DANBQHJAEEF7NN&format=json&artist_location="
	.urlencode($inputLocation)
	."&bucket=id:rdio-US");

$request->sendRequest();

if ($request->getResponseCode() == 200) {
	echo $request->getResponseBody();
} else echo $request->getResponseCode();

?>
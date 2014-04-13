<?php

$name = "";
if (isset($_GET['name'])) {
	$name = $_GET['name'];
} else {
	http_response_code(400);
	exit(0);
}



$client = new http\Client;
$request = new http\Client\Request("GET", "http://developer.echonest.com/api/v4/artist/search?"
	."api_key=6L1DANBQHJAEEF7NN&format=json&name="
	.urlencode($name)."&bucket=artist_location");

$client->enqueue($request);

$client->send();

if ($client->getResponse($request)->getResponseCode() == 200) {
	echo $client->getResponse($request)->getBody();
} else echo $client->getResponse($request)->getResponseCode();

?>
<?php

class Observer implements SplObserver {
    function update(SplSubject $client, http\Client\Request $request = NULL, $progress = NULL) {
        if ($progress->info == "finished") {

        }
    }

}
$location = "";
if (isset($_GET['location'])) {
	$location = $_GET['location'];
} else {
	http_response_code(400);
	exit(0);
}



$client = new http\Client;
$client->attach(new Observer);
$request = new http\Client\Request("GET", "http://developer.echonest.com/api/v4/artist/search?"
	."api_key=6L1DANBQHJAEEF7NN&format=json&artist_location="
	.urlencode($location)
	."&bucket=id:rdio-US");

$client->enqueue($request);

$client->send();

if ($client->getResponse($request)->getResponseCode() == 200) {
	echo $client->getResponse($request)->getBody();
} else echo $client->getResponse($request)->getResponseCode();

?>
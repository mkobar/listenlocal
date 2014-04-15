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


/* uncomment this for production */
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

/* test version, doesn't call echonest, just sends back ann arbor data */
// echo '{"response": {"status": {"version": "4.2", "code": 0, "message": "Success"}, "artists": [{"name": "Iggy & the Stooges", "foreign_ids": [{"catalog": "rdio-US", "foreign_id": "rdio-US:artist:r106562"}], "id": "ARVCHGY123E26703A6"}, {"name": "Taproot", "foreign_ids": [{"catalog": "rdio-US", "foreign_id": "rdio-US:artist:r86163"}], "id": "ARB9VHL1187B9AEC3F"}, {"name": "Wolf Eyes", "foreign_ids": [{"catalog": "rdio-US", "foreign_id": "rdio-US:artist:r89682"}], "id": "ARYVAJN1187FB4ED81"}, {"name": "Shigeto", "foreign_ids": [{"catalog": "rdio-US", "foreign_id": "rdio-US:artist:r400589"}], "id": "ARRRXVE11F50C47EDE"}, {"name": "Robert Ashley", "foreign_ids": [{"catalog": "rdio-US", "foreign_id": "rdio-US:artist:r89616"}], "id": "ARDBC241187B9A9F6C"}, {"name": "Laurel Halo", "foreign_ids": [{"catalog": "rdio-US", "foreign_id": "rdio-US:artist:r729506"}], "id": "ARETMPN12C7E971A82"}, {"name": "Saturday Looks Good to Me", "foreign_ids": [{"catalog": "rdio-US", "foreign_id": "rdio-US:artist:r2203"}], "id": "ARH27D81187FB3BDE3"}, {"name": "Big Chief", "foreign_ids": [{"catalog": "rdio-US", "foreign_id": "rdio-US:artist:r24884"}], "id": "AR99H7W1187B9964ED"}, {"name": "Colin Stetson", "foreign_ids": [{"catalog": "rdio-US", "foreign_id": "rdio-US:artist:r48079"}], "id": "ARUJCK61187FB4551B"}, {"name": "Commander Cody & His Lost Planet Airmen", "foreign_ids": [{"catalog": "rdio-US", "foreign_id": "rdio-US:artist:r13830"}], "id": "ARYV1OT1187B9B4C8E"}, {"name": "Sonic\'s Rendezvous Band", "foreign_ids": [{"catalog": "rdio-US", "foreign_id": "rdio-US:artist:r430205"}], "id": "ARAG8JO1187B9B767E"}, {"name": "14KT", "foreign_ids": [{"catalog": "rdio-US", "foreign_id": "rdio-US:artist:r380728"}], "id": "ARZCSPO12496DAB65A"}, {"name": "Rachael Lampa", "foreign_ids": [{"catalog": "rdio-US", "foreign_id": "rdio-US:artist:r86292"}], "id": "AR658OS1187FB5C451"}, {"name": "Nomo", "foreign_ids": [{"catalog": "rdio-US", "foreign_id": "rdio-US:artist:r613088"}], "id": "AR8AQ8F1187B9B4AD8"}, {"name": "Anya Marina", "foreign_ids": [{"catalog": "rdio-US", "foreign_id": "rdio-US:artist:r85112"}], "id": "ARNF5RK1187B9A98C3"}]}}'

?>
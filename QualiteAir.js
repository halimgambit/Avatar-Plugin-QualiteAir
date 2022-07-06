exports.action = function(data, callback){

	let client = setClient(data);
	info("QualiteAir from:", data.client, "To:", client);
	command1 (data, client);
	callback();
}

    // Aller sur ce site pour connaitre votre adresse ip : https://whatismyipaddress.com/

function command1 (data, client) {

var ipAdresse = "";
var cle_api = "";

fetch('http://api.airvisual.com/v2/nearest_city?ip=' + ipAdresse + '&key=' + cle_api)
	.then(response => response.json())
	.then(response2 => {
	console.log(response2.data.current.pollution.aqicn)

	var indice = response2.data.current.pollution.aqicn;

	if(indice >= 0 && indice <= 50) {
	Avatar.speak("la qualité d'air est Bon:" + "l'indice est d'e:" + response2.data.current.pollution.aqicn, data.client, function(){
	Avatar.Speech.end(data.client);
	});	
	}
	else if(indice >= 51 && indice <= 100) {
	Avatar.speak("la qualité d'air est Moyenne:" + ".l'indice est d'e:" + response2.data.current.pollution.aqicn, data.client, function(){
	Avatar.Speech.end(data.client);
	});
    }
	else if(indice >= 101 && indice <= 150) {
	Avatar.speak("la qualité d'air est Malsain pour les groupes sensibles:" + ".l'indice est d'e:" + response2.data.current.pollution.aqicn, data.client, function(){
	Avatar.Speech.end(data.client);
	});	
    }
	else if(indice >= 151 && indice <= 200) {
	Avatar.speak("la qualité d'air est Mauvaise pour la santé:" + ".l'indice est d'e:" + response2.data.current.pollution.aqicn, data.client, function(){
	Avatar.Speech.end(data.client);
	});	
    }
	})
}


function setClient (data) {
	var client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
    if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}

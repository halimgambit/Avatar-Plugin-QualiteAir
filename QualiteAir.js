exports.action = function(data, callback){

	let client = setClient(data);
	info("QualiteAir from:", data.client, "To:", client);
	QualiteAir (data, client);
	callback();
}

async function QualiteAir(data, client) {

  const key = Config.modules.QualiteAir.key;

  if(!key) {
    Avatar.speak(`faudrait une clé  à obtenir sur le site`, data.client, () => {
      Avatar.Speech.end(data.client);
    });
    return;
  }

  async function fetchData() {
    try {
      const response = await fetch(`http://api.airvisual.com/v2/nearest_city?key=${key}`);
  
      if (!response.ok) {
        throw new Error(`Échec de la requête : code ${response.status}`);
      }
  
      const result = await response.json();

      const air = result.data.current.pollution.aqicn;
      const city = result.data.city;

      if(air >= 0 && air <= 50) {
      Avatar.speak(`La qualité de l'air extérieur à ${city} est Bien`, data.client, () => {
        Avatar.Speech.end(data.client);
      });
      return;
    }
    else if(air >= 50 && air <= 100 ) {
      Avatar.speak(`La qualité de l'air extérieur à ${city} est Modéré`, data.client, () => {
        Avatar.Speech.end(data.client);
      });
      return;
    }
    else if(air >= 100 && air <= 150 ) {
      Avatar.speak(`La qualité de l'air extérieur à ${city} est Malsain pour les groupes sensibles`, data.client, () => {
        Avatar.Speech.end(data.client);
      });
      return;
    }
    else if(air >= 150 && air <= 200 ) {
      Avatar.speak(`La qualité de l'air extérieur à ${city} est Mauvais pour la santé`, data.client, () => {
        Avatar.Speech.end(data.client);
      });
      return;
    }
    
    } catch (error) {
      Avatar.speak(`Erreur :, ${error.message})`, data.client, () => {
        Avatar.Speech.end(data.client);
      });
    }
  }
  fetchData();
  
  }

function setClient (data) {
	var client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
    if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}

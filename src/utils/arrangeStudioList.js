import { studio } from './studioClass';

// Fisher-Yates shuffle algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
    
export function arrange_studio_list(data){
    var studios = [];
    var premiumStudios = [];
    for (var i = 0; i < data.length; i++) {
        var reviews = []
        if(data[i]["comments"].length > 0){
            reviews = data[i]["comments"]["0"]
        }
        var new_studio = new studio(
        data[i]["name"],
        data[i]["url"],
        data[i]["addressString"],
        data[i].latCoordinate,
        data[i].lngCoordinate,
        data[i]["email"],
        data[i]["filters"],
        reviews,
        data[i].image
        );
        if (data[i].premium === 1) {
            premiumStudios.push(new_studio);
        } else {
            studios.push(new_studio);
        }
    }
    var shuffledPremiumStudios = shuffle(premiumStudios);
    var combinedStudios = shuffledPremiumStudios.concat(studios);
    return combinedStudios;
}
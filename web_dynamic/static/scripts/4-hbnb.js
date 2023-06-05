$(document).ready(function () {
	let amenityList = {};
	$("li input[type=checkbox]").change(
		function(){
		if (this.checked){
			amenityList[this.dataset.name] = this.dataset.id;
		} else { 
			delete amenityList[this.dataset.name];
		}
		$(".amenities h4").text(Object.keys(amenityList).sort().join(", "));
		});
	$.getJSON("http://127.0.0.1:5001/api/v1/status/", (data) => {
		if (data.status === "OK") {
			$("div#api_status").addClass("available");
		} else {
			$("div#api_status").removeClass("available");
		}
	});
	$.ajax({url: "http://127.0.0.1:5001/api/v1/places_search/",
		type: 'POST',
		data: JSON.stringify({}),
		dataType: 'json',
		contentType: 'application/json',
		success: function(data) {
			for (let i = 0; i < data.length; i++) {
			        let place = data[i];
			        $("section.places").append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
			}
		},
		error: function(error) {
			alert('An error occured while loading places')
		}
	});
	$(".filters button").click(function () {
		$(".places article").remove();
		$.ajax({url:  "http://127.0.0.1:5001/api/v1/places_search/",
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify({'amenities': Object.keys(amenityList)}),
			contentType: 'application/json',
			success: function(data) {
				for (let i = 0; i < data.length; i++) {
					let place = data[i];
                                $("section.places").append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
				}
			}
		});
	});
});

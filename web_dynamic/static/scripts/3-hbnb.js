$(document).ready(function () {
	const amenityList = {};
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
		contentType: 'application/json',
		success: function(response) {
			res = response['0'];
			$(".price_by_night").html(res.price_by_night);
			$(".max_guest").html(res.max_guest);
			$(".number_rooms").html(res.number_rooms);
			$(".number_bathrooms").html(res.number_bathrooms);
			$("div.description").html(res.description);
		},
		error: function(error) {
			console.log("ERROR");
		}
	});
});

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
	$.getJSON("http://0.0.0.0:5001/api/v1/status/", (data) => {
		if (data.status === "OK") {
			$("div#api_status").addClass("available");
		} else {
			$("div#api_status").removeClass("available");
		}
	});
});

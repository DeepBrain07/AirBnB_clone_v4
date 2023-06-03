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
});

document.addEventListener("DOMContentLoaded", () => {
	/*if ($("input#data-id").prop("checked")){
		prompt("YEA");
	}*/
	$("input[type=checkbox]").change(
		function(){
		if (data_id.checked){
			alert("checked")
			}
		});

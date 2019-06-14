//Flip Setup
$(function(){
	$(".card").flip({
	trigger: "click"
});

//Compare Cards
var arr = new Array(2); 
var crd = new Array(2);
var check = 0;
var counter = 0;
var matches = 6;

$(".card").on('flip:done',function(){
	var color = $('#'+this.id+' .back').css( "background-color" );
	
	//Check Card 1
	if (counter == 0 ) {
		arr[0] = color;
		crd[0] = this.id;
		counter++;
		check++;
		//Check Card 2
		} else {
			arr[1] = color;
			crd[1] = this.id;
			counter++;
			//Validate Match
			if (counter == 2 ) {
				if ((arr[0] == arr[1]) && (crd[0] != crd[1])) {
					console.log("It's a match");
					$("#"+crd[0]).off(".flip");
					$("#"+crd[1]).off(".flip");
					counter = 0;
					check++;
					matches--;
					//Upon finish, calculate moves
					if (matches == 0) {
						alert("Congrats! Puzzle finished in "+check/2+ " moves.");
						location.reload();
					} 
				} else {
					console.log("No match");
					$("#"+crd[0]).flip(false);
					$("#"+crd[1]).flip(false);
					counter = 0;
				}
			}
		}
	});
	
	//Randomize Colors
	function random_color() {
		var color;
		color = "#" + Math.random().toString(16).slice(2, 8).toUpperCase();
		return color;
	}
	
	for (i = 1; i < 7; i++) {
		$('#card-'+i+' .back').css({"background-color":random_color});
		$('#card-'+(i+6)+' .back').css({"background-color":$('#card-'+i+' .back').css( "background-color" )});
	}
	
	//Shuffle Cards
	var cards = $(".card");
	for(var i = 0; i < cards.length; i++){
		var target = Math.floor(Math.random() * cards.length -1) + 1;
		var target2 = Math.floor(Math.random() * cards.length -1) +1;
		cards.eq(target).before(cards.eq(target2));
	}

});
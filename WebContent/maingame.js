
//function to highlight which game range you'd like to play
function highlightRange(){
	

	gamerange.addEventListener("mouseout", function(element){
		
		//if element not yellow, then change to white on mouse leave
		if(element.target.style.backgroundColor!="yellow"){
			element.target.style.backgroundColor = "white";
		}
	});
	
	//turn on the hover listener
	gamerange.addEventListener("mouseover", function(element){
		
		//if element's not yellow, then change to grey on a mouse over
		if(element.target.style.backgroundColor !="yellow"){
			element.target.style.backgroundColor = "#f2f2ff";
		}

	})
	

	//add the click listeners and highlight yellow
	gamerange.addEventListener("click", function(element){
		
		//if nothing selected
		if(isModeSelected() == false){

			//turn the targeted element yellow
			element.target.style.backgroundColor = "yellow";
		}
		
		//if mode is selected, have choie to choose another mode
		if(isModeSelected() ==true){
			
			//get nodes
			var nodes = getGameNodes(); 
			
			//turn off old game mode
			var oldGameMode = getSelectedNode(nodes);
			oldGameMode.style.backgroundColor = "white";
			
			//turn new game mode on
			element.target.style.backgroundColor = "yellow";
				
		}
		
	});
}

//gets and returns game nodes
function getGameNodes(){
	
	var domnodes = gamerange.children;
	
	return domnodes; 
}

//returns true or false if a game node highlighted yellow, inputs a collection of nodes
function isModeSelected(){
	
	var nodeCollection = gamerange.children;
	var isSelected = false; 
	
	
	//check if highlighted
	for(var x = 0; x < nodeCollection.length; x++){
		if(nodeCollection[x].style.backgroundColor == "yellow"){
			isSelected = true; 
		}
	}
	
	return isSelected; 
}

//function that returns the selected game node, or returns null, signifying no game selected
function getSelectedNode(nodeCollection){
	
	var selectedNode = ""; 
	
	//only if game selected
	if(isModeSelected()){
		for(var x = 0; x < nodeCollection.length; x++){
			if(nodeCollection[x].style.backgroundColor == "yellow"){
				selectedNode = nodeCollection[x];
			}
		}
	}
	
	return selectedNode;
}

//function that gets the range string
function getRangeString(){
	
	var currentGameNode = getSelectedNode(getGameNodes());
	
	var rangeString = currentGameNode.innerHTML;
	
		
	return rangeString;
	
}

/* need to fix error when pressing button, getRangeString is null */ 

function displayValidationError(){
	
	var rangeString = getRangeString(); 
	
	var message = "*Errors: you must enter a number between " + rangeString;
	
	warningdiv.innerHTML = message; 
	
}

function resetWarningDiv(){
	warningdiv.innerHTML = "";
}

var scoreBoard ={
		wins:0,
		losses:0,
		addWin:function(){
			this.wins+=1;
		},
		addLoss:function(){
			this.losses+=1;
		},
		resetScore:function(){
			this.wins = 0;
			this.losses = 0; 
		},
		getWins: function(){
			return wins; 
		},
		getLosses: function(){
			return losses; 
		},
		addHandicap: function(){
			this.wins+=10; 
		}
};

function displayScore(){

	windiv.innerHTML = scoreBoard.wins; 
	lossdiv.innerHTML= scoreBoard.losses;
}


//function that will capture the input number and validate form and execute game mechanics
function validateForm(){

	var inputNumber = inputnum.value;
	var rangeString = getRangeString();
	var winningNumber;
	
	//clear the warning displays
	resetWarningDiv();
	
	//change button color on click for 300 ms
	changeButtonColor();
	
	console.log(rangeString);
	
	//select game mode, if number not in range show error message, and error icon
	switch(rangeString){
	
	case "1-10":
		
		winningNumber = generateRandomNumber();
		
		if(inputNumber<1 || inputNumber>10){
			displayValidationError();
			showErrorIcon();
		}
		
		else if(inputNumber == winningNumber){
			showWinIcon();
			
			//add score
			scoreBoard.addWin();
			
			displayScore();
		}
		else{
			showLossIcon();
			
			//subtract score
			scoreBoard.addLoss();
			
			displayScore();
		}
	
		break;
		
	case "1-100":
		
		//get a number to compare against for a win
		winningNumber = generateRandomNumber();
		
		//if input number out of range, show error and error icon
		if(inputNumber<1 || inputNumber>100){
			displayValidationError();
			showErrorIcon();
		}
		
		else if(inputNumber == winningNumber){
			showWinIcon();
			
			//add score
			scoreBoard.addWin();
			
			displayScore();
			
		}
		else{
			showLossIcon();
			
			//subtract score
			scoreBoard.addLoss();
			
			displayScore();
		}

		break;
		
	case "1-1000":
		
		//get a number to compare against for a win
		winningNumber = generateRandomNumber();
		
		//if input number out of range, show error and error icon
		if(inputNumber<1 || inputNumber>1000){
			displayValidationError();
			showErrorIcon();
		}
		
		else if(inputNumber == winningNumber){
			showWinIcon();
			
			//add score
			scoreBoard.addWin();
			
			displayScore();
		}
		else{
			showLossIcon();
			
			//subtract score
			scoreBoard.addLoss();
			
			displayScore();
		}
		
		break;
		
		
	default:
		break;
	}
		
}

//function that when you hit the guess button, the action occurs
function executeGuess(){
	
	//add the listener to the guess button
	guessbutton.addEventListener("click", validateForm);
	
}

//function that will change the button color on guess button
function changeButtonColor(){
	
	//change it for a split second then back
	guessbutton.style.backgroundColor = "#00096e";//dark blue;
	
	//a way to change back the color
	function changeBack(){
		guessbutton.style.backgroundColor = "#0073ff";
	}
	
	window.setTimeout(changeBack, 90);
}


function getCurrentWindowDimensions(){
	//gets the inner heights/widths, exclusing toolbars
	console.log("Current Window Width: " + window.innerWidth);
	console.log("Current Window Height: " + window.innerHeight);
}


//execute game mechanics only if a mode is on, otherwise do nothing
//game mechanics
//functions random number based on the selected game mode
function generateRandomNumber(){
	
	//get game node string
	var currentGameString = getRangeString(); 
	var randomNumber = NaN;
	
	//use switch statement to generate the random number
	if(currentGameString=="1-10"){
		randomNumber = Math.round(Math.random() * (10 - 1) + 1);
	}
	else if(currentGameString=="1-100"){
		randomNumber =Math.round(Math.random() * (100 - 1) + 1);
	}
	else{
		randomNumber = Math.round(Math.random() * (1000 - 1) + 1);
	}

	console.log("for range: " + currentGameString + ". The number to guess is: " + randomNumber);
	
	return randomNumber;
	
}

//sets all icons invisible
function clearIcons(){
	
	var iconNodes = displayanswer.children;
	
	//loop through nodes setting their display to none
	for(var x = 0; x < iconNodes.length; x++){
		iconNodes[x].style.display = "none";
	}
	
}

function showErrorIcon(){
	
	//hide all others
	clearIcons();
	
	erroricon.style.display="block";
}

function showWinIcon(){
	
		//hide all others
		clearIcons();
		
		//display win icon
		winicon.style.display = "block";
}

function showLossIcon(){
	
	//hide all others
	clearIcons();
	
	//display loss icon
	lossicon.style.display ="block";
	
}

//add styling to all gry buttons
function addGreyStyling(){
	
	
	var allGreyButtons = document.getElementsByClassName("grybtn");
	
	//convert collections to array
	var allGreyButtonsArr = Array.prototype.slice.call(allGreyButtons);
	
	
	allGreyButtonsArr.forEach(function(element){
		element.addEventListener("click", function(){
			
			//if the button has reset in text node, then reset the score
			if (element.innerHTML == "Reset Score"){
				scoreBoard.resetScore();
				displayScore();
				
			}
			
			//if button text is cheat, then add ten to score
			if(element.innerHTML =="Add Handicap"){
				scoreBoard.addHandicap();
				displayScore();
			}
			
			
			//click effect to dark grey
			element.style.backgroundColor = "grey";
	
			function removeDarkGrey(){
					element.style.backgroundColor = "#dbdbdb";
			}	
			
			window.setTimeout(removeDarkGrey,90);
			
		})
	});
}


//main execution program
function run(){
	
	//activate game selection
	highlightRange();
	
	//activate guess execution
	executeGuess(); 
	
	//check what screen size is being played on
	getCurrentWindowDimensions(); 
	
	//show the score bored
	displayScore();
	
	//add styling to the grey buttons
	addGreyStyling();
	
}



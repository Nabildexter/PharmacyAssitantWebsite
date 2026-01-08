console.log("JS Succesfully Connected!");
console.log("-------");
console.log("");

renderTime();

function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}


function renderTime(){

	var d = new Date();
	hh = d.getHours();
	mm = d.getMinutes();
	
	//BC
	document.getElementById("BCTime").innerHTML = document.getElementById("BCTime").innerHTML + addZero(hh) + ":" + addZero(mm);

	//AB
	document.getElementById("ABTime").innerHTML = document.getElementById("ABTime").innerHTML + addZero((hh+1)) + ":" + addZero(mm);

	//SK
	document.getElementById("SKTime").innerHTML = document.getElementById("SKTime").innerHTML + addZero((hh+2)) + ":" + addZero(mm);

	//MB
	document.getElementById("MBTime").innerHTML = document.getElementById("MBTime").innerHTML + addZero((hh+2)) + ":" + addZero(mm);
	
	//ON
	document.getElementById("ONTime").innerHTML = document.getElementById("ONTime").innerHTML +  addZero((hh+3))+ ":" + addZero(mm);
	
	//NL
	document.getElementById("NLTime").innerHTML = document.getElementById("NLTime").innerHTML +  addZero((hh+5)) + ":" + addZero(mm);
}


//Start Workday
function contactNabil(){
	//Open LinkedIn
	window.open("https://www.linkedin.com/in/nabil-nazri-8689b5124/")
}
function launchPharmaclick(){
	window.open("https://pharmaclik-login.mckesson.ca/");
}
function launchMail(){
	window.open("https://www.outlook.com");
}



//Reauth Copy Function
function reAuthCopy(num){

	var text = "";

	if(num===1){
		text = "Good Morning Dr. Patient is requesting refills. Would you like to to authorize more refills for this perscription for another 6-months? Cheers. Thank You.";
		copyAlert(1);
	}
	if(num===2){
		text = "Good Morning NP. Patient is requesting refills. Would you like to to authorize more refills for this perscription for another 6-months? Cheers. Thank You.";
		copyAlert(1);
	}
	if(num===3){
		text = "Good Morning. Patient is requesting refills. Would you like to to authorize more refills for this perscription for another 6-months? Cheers. Thank You.";
		copyAlert(1);
	}
	if(num===4){
		text = "***** !!! Urgent !!! ***** ***** !!! Urgent !!! ***** ***** !!! Urgent !!! *****\n";
		text += "Good Morning Dr.\n";
		text += "Patient is going on vacation in X days.\n";
		text += "They will be dispensing Y days early.\n";
		text += "Would you like to authorize this early dispense? Cheers.\n";
		text += "Cheers, Thank You.\n"
		text += "***** !!! Urgent !!! ***** ***** !!! Urgent !!! ***** ***** !!! Urgent !!! *****\n"
		copyAlert(1);

	}
	if(num===5){
		text = "***** !!! Urgent !!! ***** ***** !!! Urgent !!! ***** ***** !!! Urgent !!! *****\n";
		text += "Good Morning Dr.\n";
		text += "Patient has lost/damaged their medication dispense.\n";
		text += "They will be dispensing X days early.\n";
		text += "WWould you like to authorize this early dispense and replacement supply?\n";
		text += "Cheers, Thank You.\n"
		text += "***** !!! Urgent !!! ***** ***** !!! Urgent !!! ***** ***** !!! Urgent !!! *****\n"
		copyAlert(1);

	}

  // Copy the text inside the text field
  navigator.clipboard.writeText(text)
}

function copyAlert(num){

	//String
	var res = "copyStatus" + num;

	// Select
	component = document.getElementById(res);

	// Output for 3 seconds
	component.innerHTML = `<div class="alert alert-success" role="alert"> Copied Success </div>`	

	// Wait 3 sconds, then remove it
    // Wait 3 seconds, then remove it
    setTimeout(() => {
        component.innerHTML = "";
    }, 3100);
}


//Update Output Table
function updateSigTable(QA, QTY, SIG, DaysSuppy, Refills){

	document.getElementById("QAout").innerHTML = "QA: " + QA + " "	;
	document.getElementById("QTYout").innerHTML = "QTY: " + QTY + " ";
	document.getElementById("SIGout").innerHTML = SIG;
	document.getElementById("DaySupplyOut").innerHTML = "Days Supply " + DaysSuppy + " ";
	document.getElementById("Refillsout").innerHTML = "Refills: " + Refills + " ";

}



// Sig Generators
function generateSig(num){
	sigCase(num);
}

function sigCase(num){

	if(num==1){


		//Initialize QA and QTY and other fields
		var QA = 0;
		var QTY = 0;
		var baseStartingDose = document.getElementById("baseStartStrength").value;
		var base = document.getElementById("baseStrength").value;
		var IncreaseBy = document.getElementById("baseIncrement").value;
		var scaleIncrease = IncreaseBy/base;
		var Duration = document.getElementById("IntervalDuration").value;
		var Intervals = document.getElementById("IntervalCount").value;
		var Refills = document.getElementById("RefillCount").value || 0;
		var result = "";
		var capOrTab1 = document.getElementById("CapOrTab1").value;
		var maxIntake = 0;
		var daySupply = Duration*Intervals;


		//Testing
		console.log("Duration: " + Duration + " days.");
		console.log("Intervals: " + Intervals);
		console.log("Refills: " + Refills);
		console.log("Form: " + capOrTab1);
		console.log("Decrease Each Intake by " + (scaleIncrease*base/base) + " " + capOrTab1);

		StartDose = baseStartingDose/base;
		LastDosage = StartDose + ((Intervals-1)*scaleIncrease);


		console.log(">>> Start Dose: " + StartDose + " " + capOrTab1);
		console.log(">>> Last Dose: " +  LastDosage + " " + capOrTab1);


		//QTY To dispense
		for(var i = 0; i < Intervals; i++){
			QTY = QTY + (StartDose+(i*scaleIncrease))*Duration;
			console.log((StartDose+(i*scaleIncrease))*Duration);
		}

		console.log("QTY: " + QTY + " " + capOrTab1);	


		//QA total
		console.log("LastDose is : " + LastDosage + " " + CapOrTab1)
		QA = QTY + LastDosage*daySupply*Refills;

	 	//Day Supply
	 	daySupply = Intervals*Duration;
		console.log("Days Supply: " + daySupply + " Days.");


		var amount = StartDose;


		//String Builder
		for(var i = 0; i < Intervals; i++){

			amount = StartDose + (i*scaleIncrease);

			if(i<1){
				result = result + "Take " + amount+ " " + capOrTab1.substring(0, capOrTab1.length-1) + "(=" + amount*base + "mg)" +" By Mouth Once Daily For "  + Duration + " days. Then,\n";  
			}
			else if(i<Intervals-1){	
				result = result + "Take " + amount+ " " + capOrTab1 + "(=" + amount*base + "mg)" +" By Mouth Once Daily For "  + Duration + " days. Then,\n";  
			}
			else{
				result = result + "Take " + amount + " " + capOrTab1 + "(=" + amount*base + "mg)" +" By Mouth Once Daily Onwards.";  				
			}  
		}
		console.log("");
		console.log(result);


		//Update Output Table
		updateSigTable(QA, QTY, result, daySupply, Refills);

	}
	if(num===2) {

		//Initialize QA and QTY and other fields
		var QA = 0;
		var QTY = 0;
		var baseStartingDose = document.getElementById("baseStartStrength2").value;
		var base = document.getElementById("baseStrength2").value;
		var DecreaseBy = document.getElementById("baseDecrement2").value;
		var scaleIncrease = DecreaseBy/base;
		var Duration = document.getElementById("IntervalDuration2").value;
		var Intervals = document.getElementById("IntervalCount2").value;
		var Refills = document.getElementById("RefillCount2").value || 0;
		var result = "";
		var capOrTab2 = document.getElementById("CapOrTab2").value;
		var maxIntake = 0;
		var daySupply = Duration*Intervals;


		//Testing
		console.log("Duration: " + Duration + " days.");
		console.log("Intervals: " + Intervals);
		console.log("Refills: " + Refills);
		console.log("Form: " + capOrTab2);
		console.log("Decrease Each Intake by " + (scaleIncrease*base/base) + " " + capOrTab2);

		StartDose = baseStartingDose/base;
		LastDosage = StartDose + ((Intervals-1)*scaleIncrease);


		console.log(">>> Start Dose: " + StartDose + " " + capOrTab2);
		console.log(">>> Last Dose: " +  LastDosage + " " + capOrTab2);


		//QTY To dispense
		for(var i = 0; i < Intervals; i++){
			QTY = QTY + (StartDose+(i*scaleIncrease))*Duration;
			console.log((StartDose+(i*scaleIncrease))*Duration);
		}

		console.log("QTY: " + QTY + " " + capOrTab2);	


		//QA total
		console.log("LastDose is : " + LastDosage + " " + CapOrTab2)
		QA = QTY + LastDosage*daySupply*Refills;

	 	//Day Supply
	 	daySupply = Intervals*Duration;
		console.log("Days Supply: " + daySupply + " Days.");


		var amount = StartDose;


		//String Builder
		for(var i = 0; i < Intervals; i++){

			amount = StartDose + (i*scaleIncrease);

			if(i<1){
				result = result + "Take " + amount+ " " + capOrTab2.substring(0, capOrTab2.length-1) + "(=" + amount*base + "mg)" +" By Mouth Once Daily For "  + Duration + " days. Then,\n";  
			}
			else if(i<Intervals-1){	
				result = result + "Take " + amount+ " " + capOrTab2 + "(=" + amount*base + "mg)" +" By Mouth Once Daily For "  + Duration + " days. Then,\n";  
			}
			else{
				result = result + "Take " + amount + " " + capOrTab2 + "(=" + amount*base + "mg)" +" By Mouth Once Daily Onwards.";  				
			}  
		}
		console.log("");
		console.log(result);


		//Update Output Table
		updateSigTable(QA, QTY, result, daySupply, Refills);

	}
	else {
		alert("Feature Still Under Development")
	}
}


//Rough Math Work Out
//If Rx is sertraline 25mg 1d, then inc by 25mg q 7 ds, f 4 weeks, 3 refills then

//SIG Result is:
//T1C (=25mg) 1D F 7DS, THEN
//T2C (=50mg) 1D f 7 DS, THEN
//T3C (=75MG) 1D f 7 DS, Then
//T4C (=100MG) 1D Onwards


//First Dispsense QTY: 7 + 14 + 21 +28 = 70
//Refills is 3 so 4 * 28 + 70;
//QTY = 70;
//QA = QTY + maxIntake * daysSupply * Refills
//QA = 70+4*28*3 = 406




//Rough Math Work Out
//If Rx is sertraline 25mg 1d, then inc by 50mg q 7 ds, f 4 weeks, 3 refills then

//SIG Result is:
//T1C (=25mg) 1D F 7DS, THEN
//T3C (=75mg)1D f 7 DS, THEN
//T5C (=125mg)1d f 7 DS, Then
//T7C (=175mg) 1D Onwards


//First Dispsense QTY: 7 + 14 + 21 +28 = 70
//Refills is 3 so 4 * 28 + 70;
//QTY = 70;
//QA = QTY + maxIntake * daysSupply * Refills
//QA = 70+4*28*3 = 406



function add(num){

	form = document.getElementById("CapOrTab3").value;

	textarea = document.getElementById("SigCanvas");

	if(num===1){
		textarea.value = textarea.value + "Take X " + form + " ";
	}
	else if (num===2){
		textarea.value = textarea.value + "Y Times Daily ";
	}
	else if (num===3){
		textarea.value = textarea.value + "For Z Days ";
	}
	else if (num===4){
		textarea.value = textarea.value + "Then, ";
	}
	else if (num===5){
		textarea.value = textarea.value + "onwards ";
	}
	else if (num===6){
		textarea.value = textarea.value + "stop ";
	}
	else if (num===7){
		textarea.value = textarea.value + "with ";
	}
	else if (num===8){
		textarea.value = textarea.value + form + " ";
	}
	else if (num===9){
		textarea.value = textarea.value + "discontinue ";
	}
	else if (num===10){
		textarea.value = textarea.value + "Number ";
	}
	else if (num===11){
		textarea.value = textarea.value + "(=Num) ";
	}
	else if (num===12){
		textarea.value = textarea.value + ". ";
	}
	else{

	}
}
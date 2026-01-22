console.log("JS Succesfully Connected!");
console.log("-------");
console.log("");

//Disable Copy and Pasting Mouse Click
document.addEventListener('contextmenu', event => event.preventDefault());
//Disable Copy and Pasting Keystrokes
document.addEventListener('copy', event => event.preventDefault());
document.addEventListener('cut', event => event.preventDefault());
//https://www.google.com/search?q=stop+people+from+copyping+pasting+html+cs+js&oq=stop+people+from+copyping+pasting+html+cs+js&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRiPAjIHCAIQIRiPAtIBCTEzMDk0ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8


//Keep Global Variable for Caching
var originalSigText = "N/A";

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
	document.getElementById("BCTime").innerHTML = document.getElementById("BCTime").innerHTML + addZero(hh%24) + ":" + addZero(mm);
	renderIfOpenOrClose("BCTime", (hh));

	//AB
	document.getElementById("ABTime").innerHTML = document.getElementById("ABTime").innerHTML + addZero((hh+1)%24) + ":" + addZero(mm);
	renderIfOpenOrClose("ABTime", (hh+1));

	//SK
	document.getElementById("SKTime").innerHTML = document.getElementById("SKTime").innerHTML + addZero((hh+2)%24) + ":" + addZero(mm);
	renderIfOpenOrClose("SKTime", (hh+2));

	//MB
	document.getElementById("MBTime").innerHTML = document.getElementById("MBTime").innerHTML + addZero((hh+2)%24) + ":" + addZero(mm);
	renderIfOpenOrClose("MBTime", (hh+2));

	//ON
	document.getElementById("ONTime").innerHTML = document.getElementById("ONTime").innerHTML +  addZero((hh+3)%24)+ ":" + addZero(mm);
	renderIfOpenOrClose("ONTime", (hh+3));

	//NL
	document.getElementById("NLTime").innerHTML = document.getElementById("NLTime").innerHTML +  addZero((hh+5)%24) + ":" + addZero(mm);
	renderIfOpenOrClose("NLTime", (hh+5));

}


function renderIfOpenOrClose(idName, hour){

	//Select
	target = document.getElementById(idName);

	//Change Color if
	//hour is greater than 21 ie 9PM
	//OR
	//hour is less than 9 ie 9AM
	if(hour%24 >= 21 || hour%24 < 9){
		target.style.color = "red";
	}

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


//DIN/PIN List Indexing Column Properly
printIndexForDins()
function printIndexForDins(){

	//Select
	var AllDinsIndexColums = document.getElementsByClassName("DINIndexes");

	//Loop
	for (var i = 0; i < AllDinsIndexColums.length; i++) {
		AllDinsIndexColums[i].innerHTML = i+1;
	}
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
		text += "Cheers, Thank You.\n";
		text += "***** !!! Urgent !!! ***** ***** !!! Urgent !!! ***** ***** !!! Urgent !!! *****\n";
		copyAlert(2);

	}
	if(num===5){
		text = "***** !!! Urgent !!! ***** ***** !!! Urgent !!! ***** ***** !!! Urgent !!! *****\n";
		text += "Good Morning Dr.\n";
		text += "Patient has lost/damaged their medication dispense.\n";
		text += "They will be dispensing X days early.\n";
		text += "Would you like to authorize this early dispense and replacement supply?\n";
		text += "Cheers, Thank You.\n";
		text += "***** !!! Urgent !!! ***** ***** !!! Urgent !!! ***** ***** !!! Urgent !!! *****\n";
		copyAlert(2);

	}
	if(num===6){
		text = "***** !!! Urgent !!! ***** ***** !!! Urgent !!! ***** ***** !!! Urgent !!! *****\n";
		text += "Good Morning Dr.\n";
		text += "Patient is requesting an early dispense of their medications.\n";
		text += "They are requesting a dispensing X days early.\n";
		text += "Would you like to authorize this early dispense?\n";
		text += "Cheers, Thank You.\n";
		text += "***** !!! Urgent !!! ***** ***** !!! Urgent !!! ***** ***** !!! Urgent !!! *****\n";
		copyAlert(2);

	}
	if(num===7){
		text = "***** MEDICATION BACKORDERED *****\n";
		text += "Good Morning Dr.\n";
		text += "This Medication is Backordered.\n";
		text += "Would you like to prescribe an alternative for the time being?\n";
		text += "Would you like to authorize this early dispense?\n";
		text += "Cheers, Thank You.\n"
		text += "***** MEDICATION BACKORDERED *****\n";
		copyAlert(2);		
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
	component.innerHTML = `<div class="alert alert-success" role="alert"> Copied Successfully </div>`	

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
	document.getElementById("DaySupplyOut").innerHTML = "Days Supply: " + DaysSuppy + " ";
	document.getElementById("Refillsout").innerHTML = "Refills: " + Refills + " ";

	originalSigText = SIG;
}



// Sig Generators
function generateSig(num){

	document.getElementById("SIGout").innerHTML = "N/A";
	sigCase(num);
}

function sigCase(num){

	dailyFrequencyStrings = ["Once Daily", "Twice Daily", "Three Times Daily", "Four Times Daily"];

	// console.log(dailyFrequencyString[0]);
	// console.log(dailyFrequencyString[1]);
	// console.log(dailyFrequencyString[2]);
	// console.log(dailyFrequencyString[3]);

	if(num===1){


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
		var dailyFrequency = document.getElementById("dailyFrequency1").value;
		var dailyFrequencyString = dailyFrequencyStrings[dailyFrequency-1]; 

		console.log(dailyFrequency + " times daily");


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
			QTY = QTY + (StartDose+(i*scaleIncrease))*Duration*dailyFrequency;
			console.log((StartDose+(i*scaleIncrease))*Duration);
		}

		console.log("QTY: " + QTY + " " + capOrTab1);	


		//QA total
		console.log("LastDose is : " + LastDosage + " " + CapOrTab1.value + " " + dailyFrequencyString)
		QA = QTY + LastDosage*dailyFrequency*daySupply*Refills;
		console.log("QA is : " + QTY + " + " + LastDosage +"*"+dailyFrequency+"*"+daySupply+"*"+Refills + " = " + QA);

	 	//Day Supply
	 	daySupply = Intervals*Duration;
		console.log("Days Supply: " + daySupply + " Days.");


		var amount = StartDose;


		//String Builder
		for(var i = 0; i < Intervals; i++){

			amount = StartDose + (i*scaleIncrease);

			if(i<1){

				if(StartDose<=1){
					result = result + "Take " + amount + " " + capOrTab1.substring(0, capOrTab1.length-1) + " (=" + amount*base + "mg)" +" By Mouth " + dailyFrequencyString + " For "  + Duration + " days. Then,\n";  

				} else {
					result = result + "Take " + amount + " " + capOrTab1 + " (=" + amount*base + "mg)" +" By Mouth " + dailyFrequencyString + " For "  + Duration + " days. Then,\n";  
				}
			}
			else if(i<Intervals-1){	
				result = result + "Take " + amount + " " + capOrTab1 + " (=" + amount*base + "mg)" +" By Mouth " + dailyFrequencyString + " For "  + Duration + " days. Then,\n";  
			}
			else{
				result = result + "Take " + amount + " " + capOrTab1 + " (=" + amount*base + "mg)" +" By Mouth " + dailyFrequencyString + " Onwards.";  				
			}  
		}
		console.log("");
		console.log(result);


		//Update Output Table
		updateSigTable(QA, QTY, result, daySupply, Refills);

	}
	else if(num===2) {

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
		var dailyFrequency = document.getElementById("dailyFrequency2").value;
		var dailyFrequencyString = dailyFrequencyStrings[dailyFrequency-1]; 


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
			QTY = QTY + (StartDose+(i*scaleIncrease))*Duration*dailyFrequency;
			console.log((StartDose+(i*scaleIncrease))*Duration);
		}

		console.log("QTY: " + QTY + " " + capOrTab2);	


		//QA total
		console.log("LastDose is : " + LastDosage + " " + CapOrTab2.value + " " + dailyFrequencyString)
		QA = QTY + LastDosage*dailyFrequency*daySupply*Refills;
		console.log("QA is : " + QTY + " + " + LastDosage +"*"+dailyFrequency+"*"+daySupply+"*"+Refills + " = " + QA);

	 	//Day Supply
	 	daySupply = Intervals*Duration;
		console.log("Days Supply: " + daySupply + " Days.");


		var amount = StartDose;


		//String Builder
		for(var i = 0; i < Intervals; i++){

			amount = StartDose + (i*scaleIncrease);

			if(i<1){

				if(StartDose<=1){
					result = result + "Take " + amount + " " + capOrTab2.substring(0, capOrTab2.length-1) + " (=" + amount*base + "mg)" +" By Mouth " + dailyFrequencyString + " For "  + Duration + " days. Then,\n";  

				} else {
					result = result + "Take " + amount + " " + capOrTab2 + " (=" + amount*base + "mg)" +" By Mouth " + dailyFrequencyString + " For "  + Duration + " days. Then,\n";  
				}

			}
			else if(i<Intervals-1){	
				result = result + "Take " + amount+ " " + capOrTab2 + " (=" + amount*base + "mg)" +" By Mouth " + dailyFrequencyString + " For "   + Duration + " days. Then,\n";  
			}
			else{
				result = result + "Take " + amount + " " + capOrTab2 + " (=" + amount*base + "mg)" +" By Mouth " + dailyFrequencyString + " Onwards.";  				
			}  
		}
		console.log("");
		console.log(result);


		//Update Output Table
		updateSigTable(QA, QTY, result, daySupply, Refills);

	}
	else if(num===3){
		MultiTaper();
	}
	else if(num===4){
		SolutionHelper();
	}
	else {
		alert("Feature Still Under Development")
	}
}


function MultiTaper(){

	//Extract
	//Initialize QA and QTY and other fields
	var QA = 0;
	var QTY = 0;
	var baseStartingDose = Number(document.getElementById("baseStartStrength3").value);
	var base1 = document.getElementById("basePillStrength31").value;
	var base2 = document.getElementById("basePillStrength32").value;
	var scale = Number(document.getElementById("MultiTaperScale").value);
	var Duration = document.getElementById("IntervalDuration3").value;
	var Intervals = document.getElementById("IntervalCount3").value;
	var Refills = document.getElementById("RefillCount3").value || 0;
	var result = "";
	var capOrTab3 = document.getElementById("CapOrTab3").value;
	var maxIntake = 0;
	var daySupply = Duration*Intervals;
	var dailyFrequency = document.getElementById("dailyFrequency3").value;
	var dailyFrequencyString = dailyFrequencyStrings[dailyFrequency-1]; 
	var AllComboList = []
	var Target = baseStartingDose;

	console.log("Adding: " + scale + "mg");
	console.log("Form: " + capOrTab3);

	//Math
	for (var i = 0; i < Intervals; i++) {
		console.log("---> ---> " + capOrTab3);
		AllComboList[i] = findMinTabletCombo(base1, base2, Target, capOrTab3);
		console.log("Target Dose: " + ((Target)+scale*i));
		Target = Target + scale;
	}

	//Populate Table
	console.log(AllComboList);
	populateMultiTaperTable(Intervals, Duration, AllComboList, Refills, dailyFrequency, base1, base2, capOrTab3);
}


function populateMultiTaperTable(Intervals, Duration, AllComboList, Refills, dailyFrequency, base1, base2, capOrTab3){

	dailyFrequencyStrings = ["Once Daily", "Twice Daily", "Three Times Daily", "Four Times Daily"];

	//Target
	TableBody = document.getElementById("MultiTaperBody");

	//Erase dots
	TableBody.innerHTML = "";


	//Print Out Each Row
	for (var i = Intervals; i > 0; i--) {

		var dip1 = Number(AllComboList[i-1][0])*Number(base1);
		var dip2 = Number(AllComboList[i-1][1])*Number(base2);

		TableBody.innerHTML = `<tr> <td id=''>${i}</td> <td id=''>${AllComboList[i-1][0]} (=${dip1}mg)</td> <td id=''>${AllComboList[i-1][1]} (=${dip2}mg)</td> <td id=''>(Total=${AllComboList[i-1][2]}mg)</td> </tr>` + TableBody.innerHTML;
	}


	//Fill Footer
	//Duration
	document.getElementById("MultiTaperDuration").innerHTML = Duration + " Days";
	//Total Days
	document.getElementById("MultiTaperTotalDays").innerHTML = Intervals*Duration;

	//Pill-1 and Pill-2
	sum1 = 0;
	for(var i = 0; i < Intervals; i ++){
		sum1 = sum1 + AllComboList[i][0]*dailyFrequency*Duration;
	}
	document.getElementById("MultiTaperQty1Total").innerHTML = sum1;
	sum2 = 0;
	for(var i = 0; i < Intervals; i ++){
		sum2 = sum2 + AllComboList[i][1]*dailyFrequency*Duration;
	}
	document.getElementById("MultiTaperQty2Total").innerHTML = sum2;

	//At Daily Frequency:
	document.getElementById("MultiTaperDailyFequency").innerHTML = dailyFrequencyStrings[dailyFrequency-1];
	//Refills
	document.getElementById("MultiTaperRefills").innerHTML = Refills;
	// QA totals
	document.getElementById("MultiTaperQA1Total").innerHTML = sum1 + Refills*Intervals*Duration*AllComboList[Intervals-1][0];
	document.getElementById("MultiTaperQA2Total").innerHTML = sum2 + Refills*Intervals*Duration*AllComboList[Intervals-1][1];

}


//Find tablet combinations and the minimum required to get a dose
function findMinTabletCombo(tab1, tab2, targetDose, capOrTab3) {

	console.log("Form --> " + capOrTab3);

	//Tablet Default
	var step = 0.5 // half tablets
	if(capOrTab3 === "Capsules"){
		step = 1.0; // whole capsules
	}


	let bestCombo = null;
	let minTablets = Infinity;

	// Max tablets to search (adjust if needed)
	const maxTabs = 50;

	for (let t1 = 0; t1 <= maxTabs; t1 += step) {
	for (let t2 = 0; t2 <= maxTabs; t2 += step) {
	  const totalDose = (t1 * tab1) + (t2 * tab2);
	  const totalTabs = t1 + t2;

	  // Avoid floating point issues
	  if (Math.abs(totalDose - targetDose) < 0.001 && totalTabs > 0) {
	    if (totalTabs < minTablets) {
	      minTablets = totalTabs;
	      bestCombo = [ t1, t2, targetDose];
	    }
	  }
	}
	}

	if (bestCombo) {
	console.log(
	  `${bestCombo[0]} x ${tab1}mg AND ${bestCombo[1]} x ${tab2}mg = ${targetDose}mg ` +
	  `(Total tablets used: ${minTablets})`
	);
	// console.log(bestCombo)
	return bestCombo;
	} else {
	console.log("No valid combination found.");
	// alert("No Valid Combination Found");
	return ["Error","Error", "Combination Impossible "];
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

	form = document.getElementById("CapOrTab4").value;

	textarea = document.getElementById("SigCanvas");

	const case1 = ["1", "1.1", "1.2", "1.3", "1.4"];
	const case2 = ["2", "2.1", "2.2", "2.3", "2.4"];
	const case3 = ["3", "3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.14", "3.21", "3.28"];
	const case14 = ["14", "14.1", "14.2", "14.3", "14.4"];

	console.log("Num: " + num);
	console.log("Type: " + (typeof num));


	if (case1.includes(num.toString())) {
	    renderIntakeDose(num, form)
	}

	else if (case2.includes(num.toString())){
		renderDailyFrequency(num, form);
	}
	else if (case3.includes(num.toString())){
		renderDayDuration(num, form);
	}
	else if (num===4){
		textarea.value = textarea.value + "Then ";
	}
	else if (num===5){
		textarea.value = textarea.value + "Onwards ";
	}
	else if (num===6){
		textarea.value = textarea.value + "Stop ";
	}
	else if (num===7){
		textarea.value = textarea.value + "With ";
	}
	else if (num===8){
		textarea.value = textarea.value + form + " ";
	}
	else if (num===9){
		textarea.value = textarea.value + "Discontinue ";
	}
	else if (num===10){
		textarea.value = textarea.value + "Number ";
	}
	else if (num===11){
		textarea.value = textarea.value + " (=Num mg) ";
	}
	else if (num===12){
		textarea.value = textarea.value + ". ";
	}
	else if (num===13){
		textarea.value = textarea.value + ", ";
	}
	else if (case14.includes(num.toString())){
		renderWeekDuration(num, form);
	}
	else{
		alert("Feature Still Being Worked On!\n");
	}
}

function renderIntakeDose(num, form){

	//Select output canvas
	textarea = document.getElementById("SigCanvas");

	if(num === 1){
		textarea.value = textarea.value + "Take X " + form + " ";
	} 
	else if (num === 1.1){
		textarea.value = textarea.value + "Take 1 " + form.substring(0, form.length-1) + " ";
	}
	else if (num === 1.2){
		textarea.value = textarea.value + "Take 2 " + form + " ";
	}
	else if (num === 1.3){
		textarea.value = textarea.value + "Take 3 " + form + " ";
	}
	else if (num === 1.4){
		textarea.value = textarea.value + "Take 4 " + form + " ";
	}
}


function renderDailyFrequency(num, form){

	//Select output canvas
	textarea = document.getElementById("SigCanvas");

	if(num === 2){
		textarea.value = textarea.value + "Y Times Daily ";
	} 
	else if (num === 2.1){
		textarea.value = textarea.value + "Once Daily ";
	}
	else if (num ===2.2){
		textarea.value = textarea.value + "Twice Daily ";
	}
	else if (num === 2.3){
		textarea.value = textarea.value + "Three Times Daily ";
	}
	else if (num === 2.4){
		textarea.value = textarea.value + "Four Times Daily ";
	}
}

function renderDayDuration(num, form){

	//Select output canvas
	textarea = document.getElementById("SigCanvas");

	//Default Days
	if(num === 3){
		textarea.value = textarea.value + "For Z Days ";
	}
	else if (num === 3.1 ){
		textarea.value = textarea.value + "For 1 Day ";
	}
	//For Remaining Days
	else {
		textarea.value = textarea.value + "For " + num.toString().substring(2) + " Days ";
		}
}

function renderWeekDuration(num, form){

	//Select output canvas
	textarea = document.getElementById("SigCanvas");

	//Default Days
	if(num === 14){
		textarea.value = textarea.value + "For i Weeks ";
	}
	else if (num === 14.1 ){
		textarea.value = textarea.value + "For 1 Week ";
	}
	//For Remaining Days
	else {
		textarea.value = textarea.value + "For " + num.toString().substring(3) + " Weeks ";
		}

}

function renderGeneral(input){

	//Select output canvas
	textarea = document.getElementById("SigCanvas");

	//Output
	textarea.value = textarea.value + input + " ";
}


// Some Math e.g
// Amoxicillin 250mg/5ml
// Suspension Concentration per ML is: 50mg/ml
// If one intake dose is 200mg then you need
// 200/50 = 4mls (=200mg) for an intake dose

//If qty of doses is 40 then you need 40*4 = 160mls total
//If pack size is 100 you need a minimum of 2 packs or 200mls
//If repeats is 1 you need 200 * 2, so 400mls total allocated or 4 packs allocated


function SolutionHelper(){

	//Extract
	var strength = document.getElementById("solutionStrength").value;
	var PerMl = document.getElementById("perHowManyMl").value;
	var doseStrength = document.getElementById("solutionDoseStrength").value;
	var qtyDoses = document.getElementById("solutionQtyDoses").value;
	var packSize = document.getElementById("solutionPackSize").value;
	var refills = document.getElementById("solutionRefills").value;

	//Math
	var concentration = strength/PerMl;
	var doseInMls = doseStrength/concentration;
	var qtyNeeded = ((doseInMls*qtyDoses));
	var qtyNeededRounded = Math.ceil((doseInMls*qtyDoses)/100) * packSize;
	var qaNeeded = qtyNeeded + qtyNeeded*refills;
	var qaNeededRounded = qtyNeededRounded + qtyNeededRounded*refills;


	//Populate Table
	document.getElementById("packSizeOutput").innerHTML = packSize + " ml(s)";
	document.getElementById("solutionConcentrationOutput").innerHTML = concentration + " mg/ml";
	document.getElementById("solutionAmountOfDosesOutput").innerHTML = qtyDoses;

	document.getElementById("intakeSolutionDose").innerHTML = "Intake Dose of " + doseStrength + "mg (ml):";

	document.getElementById("solutionIntakeDoseOutput").innerHTML = doseInMls + " ml(s)"; 
	document.getElementById("qtySolutionOutput").innerHTML = qtyNeeded + " ml(s)"; 
	document.getElementById("qtySolutionRoundedOutput").innerHTML = qtyNeededRounded + " ml(s)"; 
	document.getElementById("qaSolutionOutput").innerHTML = qaNeeded + " ml(s)"; 
	document.getElementById("qaSolutionRoundedOutput").innerHTML = qaNeededRounded + " ml(s)"; 
	document.getElementById("refillsSolutionOutput").innerHTML = refills; 

}




//Change Vanilla English Sig Output to Shorthand
function ConvertToShorthand(){

	//Extract Text:
	var textBody = document.getElementById("SIGout");
	var textContent = document.getElementById("SIGout").innerHTML;

	// Testing
	console.log(textContent);

	//Replace Text with Shorthand
	textContent = textContent.replaceAll('Once Daily', 'OD');
	textContent = textContent.replaceAll('Twice Daily', 'BID');
	textContent = textContent.replaceAll('Three Times Daily', 'TID');
	textContent = textContent.replaceAll('Four Times Daily', 'QID');

	textContent = textContent.replaceAll('By Mouth', 'PO');

	textContent = textContent.replaceAll('Take 1 Tablets', 'T1T ');
	textContent = textContent.replaceAll('Take 1 Tablet', 'T1T ');
	textContent = textContent.replaceAll('Take 1 Capsules', 'T2T ');
	textContent = textContent.replaceAll('Take 1 Capsule', 'T2T ');

	textContent = textContent.replaceAll('Take 2 Tablets', 'T2T ');
	textContent = textContent.replaceAll('Take 2 Capsules', 'T2C ');

	textContent = textContent.replaceAll('Take 3 Tablets', 'T3T ');
	textContent = textContent.replaceAll('Take 3 Capsules', 'T3C ');

	textContent = textContent.replaceAll('Take 4 Tablets', 'T4T ');
	textContent = textContent.replaceAll('Take 4 Capsules', 'T4C ');

	textContent = textContent.replaceAll('For', 'F');
	textContent = textContent.replaceAll('Take', 'T');

	textContent = textContent.replaceAll('Tablets', 'TABS');
	textContent = textContent.replaceAll('Tablet', 'TAB');
	textContent = textContent.replaceAll('Capsules', 'CAPS');
	textContent = textContent.replaceAll('Capsule', 'CAP');

	textContent = textContent.replaceAll('0.5', '1/2 (HALF) A ');
	textContent = textContent.replaceAll('0.25', '1/4 (QAURTER) A ');


	// Test
	console.log(textContent);

	//Replace Sig Outout
	textBody.innerHTML = textContent;
}

//Change Sig output shorthand to Vanilla English
function RevertToEnglish(){

	//Extract Text:
	var textBody = document.getElementById("SIGout");

	//Revert Back
	textBody.innerHTML = originalSigText;
}


function RemovePO(){

	//Extract Text:
	var textBody = document.getElementById("SIGout");
	var textContent = document.getElementById("SIGout").innerHTML;

	//Cut/Delete Text
	textContent = textContent.replaceAll('PO', '');
	textContent = textContent.replaceAll('By Mouth', '');

	//Replace Sig Output
	textBody.innerHTML = textContent;

}
console.log("AI JS Succesfully Connected!");
console.log("-------");
console.log("");

//OCR Variables Needed
const rawTextEl = document.getElementById("rawText");
const sigOutputEl = document.getElementById("sigOutput");
const pic = document.getElementById("pic");


// Source - https://stackoverflow.com/a
// Posted by Jake, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-07, License - CC BY-SA 4.0

// To copy and paste from clipboard and replace the div background to copied item

//Select Form and Input
const form = document.getElementById("new_document_attachment");
const fileInput = document.getElementById("document_attachment_doc");


fileInput.addEventListener('change', () => {
  form.submit();
});

//When User pastes, we upload into the form, and also change a div's background
window.addEventListener('paste', e => {
	
	fileInput.files = e.clipboardData.files;

	//Change Background of Div
	const file = e.clipboardData.files[0];
	if (!file) return;

	const pic = document.getElementById("pic");
	const imageURL = URL.createObjectURL(file);

	pic.style.backgroundImage = `url(${imageURL})`;
	pic.style.backgroundSize = "cover";
	pic.style.backgroundPosition = "center";

  // Run OCR
  handleImage(file);

});


// OCR + SIG processing
async function handleImage(file) {
  rawTextEl.innerHTML = "Running OCR...";
  sigOutputEl.innerHTML = "";

  const { data } = await Tesseract.recognize(
    file,
    "eng",
    {
      logger: m => console.log(m)
    }
  );

  const text = data.text; 
  rawTextEl.innerHTML = text;

  const sig = decodeSIG(text);
  sigOutputEl.innerHTML = sig;
}


// Basic SIG decoder
// Add more words to pick/recorgnize out and added it to this map
function decodeSIG(text) {
  const sigMap = {
    po: "by mouth",
    p0: "by mouth",
    "po.": "by mouth",
    "p.o-.": "by mouth",
    "p.o.": "by mouth",
    "p.o": "by mouth",
    od: "once daily",
    "o.d": "once daily",
    "0.d": "once daily",
    "1d": "once daily",
    bid: "twice daily",
    "b.i.d": "twice daily",
    tid: "three times daily",
    "t.i.d": "three times daily",
    qid: "four times daily",
    "q.i.d": "four times daily",
    am: "in the morning",
    pm: "in the evening",
    qhs: "at bedtime",
    hs: "at bedtime",
    qam: "every morning",
    prn: "when required",
    t: "tablet(s)",
    tab: "tablet",
    ap: "tablet",
    cap: "capsule",
    "1-2": "1 to 2",
    t1c: "take 1 capsule",
    tic: "take 1 capsule",
    t1t: "take 1 tablet",
    tit: "take 1 tablet",
    t2c: "take 2 capsules",
    t2t: "take 2 tablets",
    i: "take 1",
    tt: "take 2 ",
    f: "for",
    x: "for",
    tdayy: "7 days",
    q: "every",
    every: "every",
    "1h": "1 hour",
    h: "hour(s)",
    hr: "hour(s)",
    ac: "before meals",
    dispense: "\nDispense:",
    "#": "Qty:",
    "no.": "Qty:",
    refils: "\nRefills: ",
    refi: "\nRefills: ",
    "&": "0",
    amoxicillivv: "amoxicillin"
  };
  

  //make input text basic to read
  let normalized = text.toLowerCase().replace(/[^+\w\s.&#-|]/g, " ");


  //Change Other Fluff that was detected that gets confusing
  //Change | to 1
  normalized = normalized.replace("|", "1");
  //Change + to "t"
  normalized = normalized.replace("+", "t");
  //Change q.. to "every .."
  normalized = normalized.replace("qhs", "every hs");
  normalized = normalized.replace("qam", "every am");
  normalized = normalized.replace("qpm", "every evening");
  //Change ..PO to " PO"
  normalized = normalized.replace("bpo", "b po");
  //Change hr to " hr" keep thr in azithromycin
  normalized = normalized.replace("thr", "txyqr");
  normalized = normalized.replace("hr", " hr");
  normalized = normalized.replace("txyqr", "thr");
  //Change ..h to " h"
  for (var i = 0; i < 24; i++) {
    in1 = (i+1)+"h";
    in2 = " " + (i+1) + " h";
    normalized = normalized.replace(in1, in2);
  }
  //Change # to " Qty:"
  normalized = normalized.replace("#", " Qty:");
  //Delete "Sig:"
  normalized = normalized.replace("sig:", "");
  //Delete "Sig"
  normalized = normalized.replace("sig", "");
  //Delete weird periods .
  normalized = normalized.replace("d.", "d .");


  //Raw Output
  console.log("--> " + normalized);


  //Split the words
  let words = normalized.split(/\s+/);

  //Match the detected words to actual words
  let expanded = words.map(w => sigMap[w] || w);

  //Strip more BS
  // . periods
  // expanded = expanded.replace(".", " ");


  return expanded.join(" ");
}


//External Sources
// https://pmhealthnp.com/how-to-write-a-prescription/

// Single Test Links

// https://www.d.umn.edu/medweb/Modules/Prescription/JohnSmith-Example.jpg
// https://www.d.umn.edu/medweb/Modules/Prescription/SampleScript.html

// https://i0.wp.com/basicmedicalkey.com/wp-content/uploads/2017/01/image01976.jpeg?fit=578%2C440&ssl=1

// https://doc-assets-us-west-1.studocu.com/1211974856e65fbaab64fe0bb8bcdd06/html/bg1.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6XC9cL2RvYy1hc3NldHMtdXMtd2VzdC0xLnN0dWRvY3UuY29tXC8xMjExOTc0ODU2ZTY1ZmJhYWI2NGZlMGJiOGJjZGQwNlwvaHRtbFwvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc2ODk0ODUzMH19fV19&Signature=YKHOs33UJotkVlsA8SmV17A2qOtMCbaqRs-hQww3Ntp8Z4~xHNHxCiY0DO2PQ309wBLy0i6M8aqScHUSXqLuEU9e2Z4bS3ICaUa36v3mO3OguFPqc8quRpo5-~EoB~1DbPEwSJZf77Rye7jI1WHs0mMrny6TwQnY5JJisOVCFjvK1Ub-6rr5TU6M4DX5mvSdjFnrk-B-OestAOO2NbzTZNknUPqH7hNY85uYgaRPeHAVKSGSyO71XqSMb2bVvOsbUQ8GvU2ic13utwdQlHqHxUvWhZvIFoazokP5eLRUDr-2sfMCMLgOSM7Nm01-XQO9ia3YloTDwjvdgSsiYVZ7JA__&Key-Pair-Id=APKAJ535ZH3ZAIIOADHQ
// https://www.studocu.com/en-us/document/keiser-university/basic-adult-health-care/antibiotic-prescription/102059538

// https://basicmedicalkey.com/wp-content/uploads/2016/06/B9781437723663000060_if006-017-9781437723663.jpg
// https://basicmedicalkey.com/interpretation-of-medication-labels-and-orders/

//https://www.bartleby.com/questions-and-answers/how-many-doses-are-provided-in-the-prescription-below-dr.-barbara-clemmons-121-west-loop-tacoma-wa-0/d10cfdd1-2812-4295-bf2a-85b05406adb6

// https://www.pharmacyskillslab.org/ios/html5/html5-rxgenerator/rx-redflag/index.php
// https://www.pharmacyskillslab.org/ios/html5/html5-rxgenerator/rx-redflag/redflag-01-Y.jpg

//https://basicmedicalkey.com/interpretation-of-medication-labels-and-orders/
//https://basicmedicalkey.com/wp-content/uploads/2016/06/B9781437723663000060_if006-011-9781437723663.jpg

// https://www.d.umn.edu/medweb/Modules/Prescription/EmilyJones-Example.jpeg
// https://www.d.umn.edu/medweb/Modules/Prescription/Answer4.html




//Multi Test Links

//https://www.google.com/search?sca_esv=fb6ec2c420ab31bb&sxsrf=ANbL-n7_6G02OL6crg8hO3Q0zJs56f4icw:1768921001433&udm=2&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKp9lEhFAN_4ain3HSNQWw-mMGVXS0bCMe2eDZOQ2MOTwmdSduEdP1lcK-3UDyorIbYrYypmw2ykxY_-AvoMYwpWQvfCGsfTeASDCilOcxNlhVdNrgHYLrrYQLUUAjkJv5Vb0HkGm96bB_yYjaX2NpJg4cm_cbywWvPM8yGZ-iv_Z7K9YUFdnbyIUhrLM0Qaa96hlsQZA&q=sample+tablet+prescriptions&sa=X&ved=2ahUKEwjkkLSfsJqSAxUvHjQIHcXlB2QQtKgLegQIFRAB&biw=1536&bih=730&dpr=1.25&aic=0#sv=CAMSVhoyKhBlLXlzN2V2TGpuV1YzMHlNMg55czdldkxqbldWMzB5TToObERQazJTeEFkLWNxVE0gBCocCgZtb3NhaWMSEGUteXM3ZXZMam5XVjMweU0YADABGAcgm9a5gwswAkoKCAIQAhgCIAIoAg
// https://www.instagram.com/p/DRbE9AfE-Mc/
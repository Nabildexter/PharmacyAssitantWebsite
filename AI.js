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
  rawTextEl.textContent = "Running OCR...";
  sigOutputEl.textContent = "";

  const { data } = await Tesseract.recognize(
    file,
    "eng",
    {
      logger: m => console.log(m)
    }
  );

  const text = data.text;
  rawTextEl.textContent = text;

  const sig = decodeSIG(text);
  sigOutputEl.textContent = sig;
}


// Basic SIG decoder
// Add more words to pick out and added it to this map
function decodeSIG(text) {
  const sigMap = {
    po: "by mouth",
    bid: "twice daily",
    tid: "three times daily",
    qid: "four times daily",
    qhs: "at bedtime",
    qam: "every morning",
    prn: "as needed",
    tab: "tablet",
    cap: "capsule"
  };

  let normalized = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ");

  let words = normalized.split(/\s+/);

  let expanded = words.map(w => sigMap[w] || w);

  return "DRAFT SIG:\n" + expanded.join(" ");
}
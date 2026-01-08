console.log("AI JS Succesfully Connected!");
console.log("-------");
console.log("");



// Source - https://stackoverflow.com/a
// Posted by Jake, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-07, License - CC BY-SA 4.0

const form = document.getElementById("new_document_attachment");
const fileInput = document.getElementById("document_attachment_doc");

fileInput.addEventListener('change', () => {
  form.submit();
});

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

});


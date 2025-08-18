const formEl = document.getElementById("formEl");
const inputEl = document.getElementById("formQRText");
const QRImgEl = document.getElementById("QRImg");
const qrContainerEl = document.querySelector(".qr-container");
const generateTextEl = document.getElementById("generateText");

const renderQRCode = (url) => {
  QRImgEl.setAttribute("src", url);
  generateTextEl.innerText = "Generating QR....";
  const setQRContainer = () => {
    setTimeout(() => {
      qrContainerEl.classList.add("show");
      generateTextEl.innerText = "Generate QR Code";
    }, 500);
  };

  QRImgEl.addEventListener("load", setQRContainer);
};

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  let formValues = new FormData(formEl);
  let inputVal = formValues.get("qrInputName");
  if (inputVal.length > 0) {
    let url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputVal}`;
    renderQRCode(url);
  } else {
    generateTextEl.innerText = "Wrong Input, enter again..";
  }
});

inputEl.addEventListener("keyup", () => {
  if (!inputEl.value.trim()) {
    qrContainerEl.classList.remove("show");
  }
});

const allImages = Array.from(document.querySelectorAll("img"));
allImages.forEach((img) => {
  img.addEventListener("click", checkOnClick);
});
let topImage = allImages[allImages.length - 1];
topImage.className = "top-layer";

let toggle = false;
let dblToggle = false;
let rotateDblToggle = false;
let canChooseTopImage = false;

const fourImgPositions = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];
const fourImgPositionsAndRotate = [
  "top-left",
  "top-left-rotate",
  "top-right",
  "top-right-rotate",
  "bottom-left",
  "bottom-left-rotate",
  "bottom-right",
  "bottom-right-rotate",
];
function singleClick(e) {
  const filteredArray = filterArrayFnc();
  e.stopImmediatePropagation();
  if (toggle === false && dblToggle === false) {
    filteredArray.forEach((img, i) => {
      img.classList.add("hover-transition");
      img.classList.add(`rotate-${i + 1}`);
    });
    toggle = true;
  } else if (!rotateDblToggle && dblToggle) {
    filteredArray.forEach((img, i) => {
      img.classList.add(fourImgPositionsAndRotate[2 * i + 1]);
    });
    topImage.classList.add("top-layer-dblclick")
    rotateDblToggle = true;
  } else if (rotateDblToggle && dblToggle) {
    filteredArray.forEach((img, i) => {
      img.classList.remove(fourImgPositionsAndRotate[2 * i + 1]);
    });
    topImage.classList.remove("top-layer-dblclick")
    rotateDblToggle = false;
  } else {
    toggle = false;
    filteredArray.forEach((img, i) =>
      img.classList.remove(`rotate-${i + 1}`, "hover-transition")
    );
  }
}
topImage.addEventListener("click", singleClick);
function checkOnClick(e) {

  if (canChooseTopImage && e.target.classList.contains("top-layer") === false) {
    e.stopImmediatePropagation();
    topImage.classList.remove("top-layer");
    topImage.className = e.target.getAttribute("class");
    topImage.removeEventListener("dblclick", applyDblClick);
    topImage.removeEventListener("click", singleClick);
    topImage = e.target;
    topImage.addEventListener("dblclick", applyDblClick);
    topImage.addEventListener("click", singleClick);
    topImage.className = "top-layer";
    dblToggle = true;
    const filteredArray = filterArrayFnc();
    filteredArray.forEach((img) => {
      img.classList.remove(
        "top-left",
        "top-left-rotate",
        "top-right",
        "top-right-rotate",
        "bottom-left",
        "bottom-left-rotate",
        "bottom-right",
        "bottom-right-rotate"
      );
    });
    canChooseTopImage = false;
    forFalseDblClick(filteredArray);
    // applyDblClick(e);
    toggle = false;
  }
}
function filterArrayFnc() {
  return allImages.filter((img) => img !== topImage);
}

function forTrueDblClick(filteredArray) {
  canChooseTopImage = true;
  filteredArray.forEach((img, i) => {
    img.classList.remove("hover-transition", `rotate-${i + 1}`, `img-${i + 1}`);
    img.classList.add(fourImgPositions[i], "four-transition");
  });
  dblToggle = true;
}
function forFalseDblClick(filteredArray) {
  canChooseTopImage = false;
  filteredArray.forEach((img, i) => {
    img.classList.remove(
      fourImgPositionsAndRotate[2 * i],
      fourImgPositionsAndRotate[2 * i + 1],
      "four-transition"
    );
    img.classList.add(`img-${i + 1}`);
  });
  dblToggle = false;
}
function applyDblClick(e) {
  const filteredArray = filterArrayFnc();
  e.stopImmediatePropagation();
  if (dblToggle === false) {
    forTrueDblClick(filteredArray);
  } else {
    forFalseDblClick(filteredArray);
  }
}
topImage.addEventListener("dblclick", applyDblClick);

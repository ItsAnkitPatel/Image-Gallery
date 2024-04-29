const allImages = Array.from(document.querySelectorAll("img"));

let topImage = allImages[allImages.length - 1];
topImage.className = "top-layer";

let singleClickToggle = false;
let doubleClickToggle = false;
let rotateDoubleClickToggle = false;
let canChooseTopImage = false;

const IMG_POSITIONS = ["top-left", "top-right", "bottom-left", "bottom-right"];
const IMG_POSITIONS_AND_ROTATE = [
  "top-left",
  "top-left-rotate",
  "top-right",
  "top-right-rotate",
  "bottom-left",
  "bottom-left-rotate",
  "bottom-right",
  "bottom-right-rotate",
];

function filterArrayFnc() {
  return allImages.filter((img) => img !== topImage);
}

function handleSingleClick(e) {
  const filteredArray = filterArrayFnc();
  e.stopImmediatePropagation();
  // when single click active & double click event is inactive
  // add 10 degree in decrement order to make them look like cards
  if (singleClickToggle === false && doubleClickToggle === false) {
    filteredArray.forEach((img, i) => {
      img.classList.add("hover-transition", `rotate-${i + 1}`);
    });
    singleClickToggle = true;
    // When double clicked event happened and user clicked once on the center image
    // rotate the image with other images
  } else if (!rotateDoubleClickToggle && doubleClickToggle) {
    filteredArray.forEach((img, i) => {
      img.classList.add(IMG_POSITIONS_AND_ROTATE[2 * i + 1]);
    });
    topImage.classList.add("top-layer-dblclick");
    rotateDoubleClickToggle = true;

    // When double click event active and images are rotated
    // then remove the classes and make the all images rotate 0 deg
  } else if (rotateDoubleClickToggle && doubleClickToggle) {
    filteredArray.forEach((img, i) => {
      img.classList.remove(IMG_POSITIONS_AND_ROTATE[2 * i + 1]);
    });
    topImage.classList.remove("top-layer-dblclick");
    rotateDoubleClickToggle = false;
  } 
  // reset the rotate
  else {
    singleClickToggle = false;
    filteredArray.forEach((img, i) =>
      img.classList.remove("hover-transition", `rotate-${i + 1}`)
    );
  }
}

// This will handle image swap to choose the top image
function handleImageClick(e) {
  if (canChooseTopImage && e.target.classList.contains("top-layer") === false) {
    e.stopImmediatePropagation();

    topImage.classList.remove("top-layer");
    topImage.className = e.target.getAttribute("class");

    topImage.removeEventListener("dblclick", handleDoubleClick);
    topImage.removeEventListener("click", handleSingleClick);

    topImage = e.target;
    topImage.addEventListener("dblclick", handleDoubleClick);
    topImage.addEventListener("click", handleSingleClick);
    topImage.className = "top-layer";
    doubleClickToggle = true;

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
    singleClickToggle = false;
    forFalseDblClick(filteredArray);
  }
}
// When double click event is active run this
function forTrueDblClick(filteredArray) {
  canChooseTopImage = true;
  filteredArray.forEach((img, i) => {
    img.classList.remove("hover-transition", `rotate-${i + 1}`, `img-${i + 1}`);
    img.classList.add(IMG_POSITIONS[i], "four-transition");
  });
  doubleClickToggle = true;
}

// When double click event going to inactive run this
function forFalseDblClick(filteredArray) {
  canChooseTopImage = false;
  filteredArray.forEach((img, i) => {
    img.classList.remove(
      IMG_POSITIONS_AND_ROTATE[2 * i],
      IMG_POSITIONS_AND_ROTATE[2 * i + 1],
      "four-transition"
    );
    img.classList.add(`img-${i + 1}`);
  });
  topImage.classList.remove("top-layer-dblclick");
  doubleClickToggle = false;
}

// Handle main double click event order
function handleDoubleClick(e) {
  const filteredArray = filterArrayFnc();
  e.stopImmediatePropagation();
  if (doubleClickToggle === false) {
    forTrueDblClick(filteredArray);
  } else {
    forFalseDblClick(filteredArray);
  }
}

// All event listeners
allImages.forEach((img) => {
  img.addEventListener("click", handleImageClick);
});
topImage.addEventListener("dblclick", handleDoubleClick);
topImage.addEventListener("click", handleSingleClick);

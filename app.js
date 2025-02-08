// 程式碼寫這裡

const carousel = document.querySelector(".carousel");
const track = carousel.querySelector(".slide-track");
const slides = carousel.querySelectorAll(".slide");
const prevBtn = carousel.querySelector(".prev-btn");
const nextBtn = carousel.querySelector(".next-btn");
const navigator = carousel.querySelector(".navigator");
const indicators = navigator.querySelectorAll(".indicator");

let currentIndex = 0;

function setupSlides() {
  const w = track.clientWidth; // 抓取投影片框的寬度

  slides.forEach((slide, i) => {
    // 對每張投影片往左移一張投影片的距離
    slide.style.left = `${i * w}px`;
  });
  setNavigatorBoundary(currentIndex); // 在一開始(初始化時)就啟動隱藏箭頭的功能
  updateIndicator(currentIndex);
}

function moveSlide(index) {
  const w = track.clientWidth; // 抓取投影片框的寬度
  track.style.transform = `translateX(-${index * w}px)`;
  setNavigatorBoundary(index);
  updateIndicator(index);
}

function setNavigatorBoundary(index) {
  // 設定一個函數，可以隱藏箭頭
  if (index === 0) {
    prevBtn.classList.add("hide");
    nextBtn.classList.remove("hide");
  } else if (index === slides.length - 1) {
    prevBtn.classList.remove("hide");
    nextBtn.classList.add("hide");
  } else {
    prevBtn.classList.remove("hide");
    nextBtn.classList.remove("hide");
  }
}

// =====================================
function updateIndicator(index) {
  indicators.forEach((indicator) => {
    if (Number(indicator.dataset.index) === index) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  moveSlide(currentIndex); // 移動投影片到"第幾張"
});

prevBtn.addEventListener("click", () => {
  currentIndex--;
  moveSlide(currentIndex);
});

navigator.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const dot = e.target;
    const dotIndex = Number(dot.dataset.index);
    moveSlide(dotIndex);
  }
});

setupSlides();

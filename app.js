// 程式碼寫這裡
const slides = document.querySelectorAll(".slide");
const track = document.querySelector(".slide-track");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let currentIndex = 0;

function setupSlides() {
  const w = track.clientWidth; // 抓取投影片框的寬度

  slides.forEach((slide, i) => {
    // 對每張投影片往左移一張投影片的距離
    slide.style.left = `${i * w}px`;
  });
}

function moveSlide(index) {
  const w = track.clientWidth; // 抓取投影片框的寬度
  track.style.transform = `translateX(-${index * w}px)`;
  setNavigatorBoundary(index);
}

function setNavigatorBoundary(index) {
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
nextBtn.addEventListener("click", () => {
  currentIndex++;
  moveSlide(currentIndex); // 移動投影片到"第幾張"
});

prevBtn.addEventListener("click", () => {
  currentIndex--;
  moveSlide(currentIndex);
});

setupSlides();

// 選取 HTML 中的輪播 (carousel) 相關元素
const carousel = document.querySelector(".carousel");
const track = carousel.querySelector(".slide-track"); // 投影片軌道
const slides = carousel.querySelectorAll(".slide"); // 所有的投影片
const prevBtn = carousel.querySelector(".prev-btn"); // 上一張按鈕
const nextBtn = carousel.querySelector(".next-btn"); // 下一張按鈕
const navigator = carousel.querySelector(".navigator"); // 導覽點區塊
const indicators = navigator.querySelectorAll(".indicator"); // 所有導覽點

// 設定初始索引值 (目前顯示的投影片索引)
let currentIndex = 0;

// ============函式=========================
/**
 * 設定投影片的位置
 * 每張投影片的 left 值會根據索引乘以投影片寬度，形成水平排列
 */
function setupSlides() {
  const w = track.clientWidth; // 取得投影片區塊的寬度

  slides.forEach((slide, i) => {
    slide.style.left = `${i * w}px`; // 依序排列投影片，對每張投影片往左移一張投影片的距離

    // 個別調整圖片的顯示範圍
    if (i === 0) {
      const img = slide.querySelector("img");
      //img.style.clipPath = "inset(10% 5% 10% 5%)";
      //img.style.objectFit = "contain";
      //img.style.objectPosition = "center 40%";
      //img.style.objectFit = "cover";
      //img.style.objectPosition = "center"; // 微調顯示區域
    }
    if (i === 1) {
      const img = slide.querySelector("img");
      img.style.objectPosition = "center 10%"; // 略微向上調整，確保構圖合適
    }
    if (i === 3) {
      const img = slide.querySelector("img");
      //img.style.objectPosition = "center 65%"; // 圖片往下移 15%
      img.style.objectFit = "contain"; // 讓圖片完整顯示，避免過度裁切
      img.style.objectPosition = "center 60%"; // 略微向下調整，確保構圖合適
    }
    if (i === 4) {
      const img = slide.querySelector("img");
      img.style.objectFit = "contain";
    }
  });

  setNavigatorBoundary(currentIndex); // 初始化時判斷箭頭按鈕是否需要隱藏
  updateIndicator(currentIndex); // 初始化時設定導覽點狀態
}

/**
 * 移動投影片至指定索引位置
 * @param {number} index - 目標投影片的索引值
 */
function moveSlide(index) {
  const w = track.clientWidth; // 取得投影片區塊的寬度
  track.style.transform = `translateX(-${index * w}px)`; // 平移投影片
  setNavigatorBoundary(index); // 更新箭頭按鈕顯示狀態
  updateIndicator(index); // 更新導覽點顯示狀態
}

/**
 * 設定箭頭按鈕的可見性
 * @param {number} index - 當前投影片索引
 */
function setNavigatorBoundary(index) {
  // 設定一個函數，可以隱藏箭頭
  if (index === 0) {
    prevBtn.classList.add("hide"); // 第一張時隱藏「上一張」按鈕
    nextBtn.classList.remove("hide"); // 顯示「下一張」按鈕
  } else if (index === slides.length - 1) {
    prevBtn.classList.remove("hide"); // 顯示「上一張」按鈕
    nextBtn.classList.add("hide"); // 最後一張時隱藏「下一張」按鈕
  } else {
    prevBtn.classList.remove("hide"); // 顯示「上一張」按鈕
    nextBtn.classList.remove("hide"); // 顯示「下一張」按鈕
  }
}

/**
 * 更新導覽點的狀態，使當前顯示的投影片對應的導覽點變為 active
 * @param {number} index - 當前投影片索引
 */
function updateIndicator(index) {
  indicators.forEach((indicator) => {
    if (Number(indicator.dataset.index) === index) {
      indicator.classList.add("active"); // 標記當前投影片對應的導覽點
    } else {
      indicator.classList.remove("active");
    }
  });
}

// ============監聽事件=========================
/**
 * 監聽「下一張」按鈕點擊事件
 * 點擊後，索引值增加，並移動到下一張投影片
 */
nextBtn.addEventListener("click", () => {
  if (currentIndex < slides.length - 1) {
    // 確保索引不超出範圍
    currentIndex++;
    moveSlide(currentIndex); // 移動投影片到"第幾張"
  }
});

/**
 * 監聽「上一張」按鈕點擊事件
 * 點擊後，索引值減少，並移動到前一張投影片
 */
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    // 確保索引不超出範圍
    currentIndex--;
    moveSlide(currentIndex);
  }
});

/**
 * 監聽導覽點點擊事件
 * 依據點擊的導覽點移動到對應的投影片
 */
navigator.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const dot = e.target;
    const dotIndex = Number(dot.dataset.index);
    currentIndex = dotIndex;
    moveSlide(dotIndex);
  }
});

// 初始化投影片
setupSlides();

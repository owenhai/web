// Danh sách các chương với đường dẫn tuyệt đối từ gốc domain
const chapters = [
  {
    title: "Chương 1: Mở đầu",
    path: "/READ/thế giới hoàn mỹ/chapter1/chapter1.html",
  },
  {
    title: "Chương 2: Tiêu đề chương 2",
    path: "/READ/thế giới hoàn mỹ/chapter2/chapter2.html",
  },
  {
    title: "Chương 3: Tiêu đề chương 3",
    path: "/READ/thế giới hoàn mỹ/chapter3/chapter3.html",
  },
  // Thêm các chương khác ở đây
];

let currentChapterIndex = 0;

// Hàm xác định chương hiện tại dựa theo URL
function detectCurrentChapterIndex() {
  const currentPath = decodeURIComponent(window.location.pathname);
  console.log("⛳ Current page pathname:", currentPath);

  const foundIndex = chapters.findIndex((ch) => {
    const absolutePath = decodeURIComponent(
      new URL(ch.path, window.location.origin).pathname
    );
    return currentPath === absolutePath;
  });

  if (foundIndex !== -1) {
    currentChapterIndex = foundIndex;
    console.log("✅ Detected currentChapterIndex:", currentChapterIndex);
  } else {
    console.warn("⚠️ Không xác định được chương hiện tại:", currentPath);
  }
}

// Hàm chuyển sang chương theo chỉ số
function displayChapter(index) {
  if (index >= 0 && index < chapters.length) {
    console.log(`🔄 Chuyển sang chương ${index + 1}: ${chapters[index].title}`);
    window.location.href = chapters[index].path;
  }
}

// Nút chuyển chương trước
function goToPreviousChapter() {
  if (currentChapterIndex > 0) {
    displayChapter(currentChapterIndex - 1);
  } else {
    alert("Đây là chương đầu tiên!");
  }
}

// Nút chuyển chương sau
function goToNextChapter() {
  if (currentChapterIndex < chapters.length - 1) {
    displayChapter(currentChapterIndex + 1);
  } else {
    alert("Đây là chương cuối cùng!");
  }
}

// Hiển thị danh sách chương (có thể mở popup hoặc modal)
function showChapterList() {
  let list = "Danh sách các chương:\n";
  chapters.forEach((ch, i) => {
    list += `${i + 1}. ${ch.title}\n`;
  });
  alert(list);
}

// Gán sự kiện cho các nút khi trang đã tải xong
window.onload = function () {
  detectCurrentChapterIndex();

  document
    .querySelectorAll(".prev-chapter")
    .forEach((btn) => btn.addEventListener("click", goToPreviousChapter));
  document
    .querySelectorAll(".next-chapter")
    .forEach((btn) => btn.addEventListener("click", goToNextChapter));
  document
    .querySelectorAll(".show-chapter-list")
    .forEach((btn) => btn.addEventListener("click", showChapterList));
};

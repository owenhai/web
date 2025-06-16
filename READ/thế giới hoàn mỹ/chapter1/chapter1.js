document.addEventListener("DOMContentLoaded", () => {
  const chapters = [
    {
      title: "Chương 1: Mở đầu",
      path: "/READ/thế giới hoàn mỹ/chapter1/chapter1.html",
    },
    {
      title: "Chương 2: Tiềm năng",
      path: "/READ/thế giới hoàn mỹ/chapter2/chapter2.html",
    },
    {
      title: "Chương 3: Cốt văn",
      path: "/READ/thế giới hoàn mỹ/chapter3/chapter3.html",
    },
    {
      title: "Chương 4: Bước ngoặt",
      path: "/READ/thế giới hoàn mỹ/chapter4/chapter4.html",
    },
  ];

  const toggleButton = document.getElementById("show-chapter-list");
  const chapterListContainer = document.getElementById("chapter-list");

  if (!toggleButton || !chapterListContainer) return;

  toggleButton.addEventListener("click", () => {
    const isVisible = chapterListContainer.style.display === "block";
    if (isVisible) {
      chapterListContainer.style.display = "none";
      toggleButton.textContent = "Hiển thị loạt chương";
    } else {
      renderChapterList();
      chapterListContainer.style.display = "block";
      toggleButton.textContent = "Ẩn danh sách chương";
    }
  });

  function renderChapterList() {
    if (chapterListContainer.innerHTML.trim() !== "") return;

    const ul = document.createElement("ul");
    ul.style.listStyle = "none";
    ul.style.padding = "0";

    chapters.forEach((chap) => {
      const li = document.createElement("li");
      li.style.margin = "8px 0";

      const a = document.createElement("a");
      a.href = chap.path;
      a.textContent = chap.title;
      a.style.color = "#0ea5e9";
      a.style.textDecoration = "none";
      a.style.transition = "color 0.2s";

      a.addEventListener("mouseenter", () => {
        a.style.color = "#38bdf8";
        a.style.textDecoration = "underline";
      });
      a.addEventListener("mouseleave", () => {
        a.style.color = "#0ea5e9";
        a.style.textDecoration = "none";
      });

      li.appendChild(a);
      ul.appendChild(li);
    });

    chapterListContainer.style.backgroundColor = "#1e1e1e";
    chapterListContainer.style.padding = "16px";
    chapterListContainer.style.borderRadius = "8px";
    chapterListContainer.style.borderLeft = "4px solid #0ea5e9";
    chapterListContainer.appendChild(ul);
  }
});

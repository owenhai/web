document.addEventListener("DOMContentLoaded", function () {
  // Dữ liệu mẫu
  const stories = [
    {
      title: "Thế Giới Hoàn Mỹ",
      description: "Đã hoàn thành với 100 chương",
      image: "/HOME/img/truyen1.jpg",
      status: "Hoàn Thành",
      category: "Ngôn Tình",
      link: "../INTRODUCE/thế giới hoàn mỹ/truyen1.html",
    },
    {
      title: "Mục Thần Ký",
      description: "Đang cập nhật",
      image: "/HOME/img/mục thần ký.jpg",
      status: "Chưa Hoàn Thành",
      category: "Tiên Hiệp",
      link: "../INTRODUCE/mục thần ký/index.html",
    },
    {
      title: "Tiên Nghịch",
      description: "Tạm dừng ở chương 20",
      image: "/HOME/img/tiên nghịch.jpg",
      status: "Tạm Dừng",
      category: "Hành Động",
      link: "../INTRODUCE/tiên nghịch/index.html",
    },
    // Thêm các truyện khác...
  ];

  const storiesPerPage = 9;
  let currentPage = 1;
  let currentFilter = "Tất cả";

  const storyGrid = document.getElementById("story-grid");
  const pagination = document.getElementById("pagination");
  const filterButtons = document.querySelectorAll(".filter-button");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      currentFilter = button.textContent.trim();
      currentPage = 1;
      displayStories();
    });
  });

  function displayStories(filteredList) {
    const list = filteredList || stories;
    storyGrid.innerHTML = "";

    let filteredStories = list;
    if (!filteredList && currentFilter !== "Tất cả") {
      filteredStories = stories.filter(
        (story) => story.status === currentFilter
      );
    }

    const start = (currentPage - 1) * storiesPerPage;
    const end = start + storiesPerPage;
    const paginatedStories = filteredStories.slice(start, end);

    paginatedStories.forEach((story) => {
      const card = document.createElement("article");
      card.className = "story-card";

      const link = document.createElement("a");
      link.href = story.link;
      link.className = "story-link"; // có thể dùng để style
      link.innerHTML = `
    <img src="${story.image}" alt="${story.title}" class="story-image">
    <div class="story-content">
      <h3 class="story-title">${story.title}</h3>
      <p class="story-description">${story.description}</p>
      <small>${story.status}</small>
    </div>
  `;

      card.appendChild(link);
      storyGrid.appendChild(card);
    });

    createPagination(filteredStories.length);
  }

  function createPagination(totalStories) {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(totalStories / storiesPerPage);

    if (totalPages <= 1) return;

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "‹";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayStories();
      }
    });
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = i;
      if (i === currentPage) pageBtn.classList.add("active");

      pageBtn.addEventListener("click", () => {
        currentPage = i;
        displayStories();
      });

      pagination.appendChild(pageBtn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "›";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        displayStories();
      }
    });
    pagination.appendChild(nextBtn);
  }

  displayStories();

  // Lắng nghe sự kiện tìm kiếm từ header
  window.addEventListener("search-story", function (e) {
    const keyword = e.detail.trim().toLowerCase();
    const found = stories.find(
      (story) => story.title.toLowerCase() === keyword && story.link
    );
    if (found) {
      window.location.href = found.link;
      return;
    }
    const filtered = stories.filter(
      (story) =>
        story.title.toLowerCase().includes(keyword) ||
        (story.description && story.description.toLowerCase().includes(keyword))
    );
    displayStories(filtered);
  });
});

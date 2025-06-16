document.addEventListener("DOMContentLoaded", function () {
  // Dữ liệu mẫu
  const stories = [
    {
      title: "Trảm Thần",
      description: "Top 1 tuần này với hơn 50k lượt xem",
      image: "/HOME/img/trảm thần.jpg",
      views: 52000,
      category: "Ngôn Tình",
      link: "../INTRODUCE/trảm thần/index.html",
    },
    {
      title: "Trường Sinh Giới",
      description: "Đang gây sốt cộng đồng",
      image: "/HOME/img/trường sinh giới.jpg",
      views: 48000,
      category: "Tiên Hiệp",
      link: "../INTRODUCE/tiên nghịch/index.html",
    },
  ].sort((a, b) => b.views - a.views); // Sắp xếp giảm dần theo view

  const storiesPerPage = 9;
  let currentPage = 1;
  let currentFilter = "Tất Cả";

  const storyGrid = document.getElementById("story-grid");
  const pagination = document.getElementById("pagination");
  const filterButtons = document.querySelectorAll(".filter-button");
  const searchInput = document.querySelector(".search-input");
  const searchIcon = document.querySelector(".search-icon");

  // Lấy genre từ URL nếu có
  const params = new URLSearchParams(window.location.search);
  const genre = params.get("genre");
  if (genre) {
    // Bỏ active cũ
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Tìm nút đúng thể loại và active
    const btn = Array.from(filterButtons).find(
      (b) => b.textContent.trim().toLowerCase() === genre.toLowerCase()
    );
    if (btn) {
      btn.classList.add("active");
      currentFilter = btn.textContent.trim();
    } else {
      currentFilter = "Tất cả";
    }
  }

  // Xử lý filter
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      currentFilter = button.textContent.trim();
      currentPage = 1;
      displayStories();
      // Cập nhật URL khi chọn filter
      if (currentFilter === "Tất cả") {
        history.replaceState(null, "", window.location.pathname);
      } else {
        history.replaceState(
          null,
          "",
          "?genre=" + encodeURIComponent(currentFilter)
        );
      }
    });
  });

  function filterStoriesBySearch(query) {
    const keyword = query.trim().toLowerCase();
    if (!keyword) {
      displayStories(); // Hiện tất cả nếu không nhập gì
      return;
    }
    // Nếu nhập đúng tên truyện, chuyển trang chi tiết
    const found = stories.find(
      (story) => story.title.toLowerCase() === keyword && story.link
    );
    if (found) {
      window.location.href = found.link;
      return;
    }
    // Nếu không, filter như bình thường
    const filtered = stories.filter(
      (story) =>
        story.title.toLowerCase().includes(keyword) ||
        (story.description && story.description.toLowerCase().includes(keyword))
    );
    displayStories(filtered);
  }

  // Sửa hàm displayStories để nhận tham số tuỳ chọn:
  function displayStories(filteredList) {
    const list = filteredList || stories;
    storyGrid.innerHTML = "";

    let filteredStories = list;
    if (currentFilter !== "Tất Cả") {
      filteredStories = list.filter(
        (story) => story.category === currentFilter
      );
    }

    // Phân trang
    const start = (currentPage - 1) * storiesPerPage;
    const end = start + storiesPerPage;
    const paginatedStories = filteredStories.slice(start, end);

    // Hiển thị
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

    // Nút Previous
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

    // Các nút trang
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

    // Nút Next
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

  // Khởi tạo
  displayStories();

  // Sự kiện tìm kiếm:
  if (searchInput) {
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        filterStoriesBySearch(searchInput.value);
      }
    });
  }
  if (searchIcon) {
    searchIcon.addEventListener("click", function () {
      filterStoriesBySearch(searchInput.value);
    });
  }

  window.addEventListener("search-story", function (e) {
    const keyword = e.detail.trim().toLowerCase();
    const found = stories.find(
      (story) => story.title.toLowerCase() === keyword && story.link
    );
    if (found) {
      window.location.href = found.link;
      return;
    }
    // Nếu không khớp tuyệt đối, filter như bình thường
    const filtered = stories.filter(
      (story) =>
        story.title.toLowerCase().includes(keyword) ||
        (story.description && story.description.toLowerCase().includes(keyword))
    );
    displayStories(filtered);
  });
});

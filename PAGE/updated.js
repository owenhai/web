document.addEventListener("DOMContentLoaded", function () {
  // Sample data
  const stories = [
    {
      title: "Thế Giới Hoàn Mỹ",
      description: "Vừa cập nhật chương 10",
      image: "/HOME/img/truyen1.jpg",
      updatedAt: new Date("2023-05-15"),
      category: "Tu tiên",
      status: "Mới Cập Nhật",
      link: "../INTRODUCE/thế giới hoàn mỹ/truyen1.html",
    },
    {
      title: "Đấu Phá Thương Khung",
      description: "Mới ra mắt tuần này",
      image: "/HOME/img/đấu phá thương khung.jpg",
      updatedAt: new Date("2023-05-14"),
      category: "Tiên Hiệp",
      status: "Hoàn Thành",
      link: "../INTRODUCE/đấu phá thương khung/index.html",
    },

    {
      title: "Tiên nghịch",
      description: "Mới ra mắt tuần này",
      image: "/HOME/img/tiên nghịch.jpg",
      updatedAt: new Date("2023-05-14"),
      category: "Tu tiên",
      status: "Hoàn Thành",
      link: "../INTRODUCE/tiên nghịch/index.html",
    },
    // Add 18 more stories, each with a link property
  ].sort((a, b) => b.updatedAt - a.updatedAt); // Sort by latest first

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
    let filteredStories = filteredList || [...stories];

    // Handle filtering
    if (!filteredList) {
      if (currentFilter === "Mới Nhất") {
        filteredStories.sort((a, b) => b.updatedAt - a.updatedAt); // Newest first
      } else if (currentFilter === "Cũ Nhất") {
        filteredStories.sort((a, b) => a.updatedAt - b.updatedAt); // Oldest first
      } else {
        // "Tất Cả" or other filters: default sort newest first
        filteredStories.sort((a, b) => b.updatedAt - a.updatedAt);
      }
    }

    storyGrid.innerHTML = "";
    const start = (currentPage - 1) * storiesPerPage;
    const end = start + storiesPerPage;
    const paginatedStories = filteredStories.slice(start, end);

    paginatedStories.forEach((story) => {
      const card = document.createElement("article");
      card.className = "story-card";

      const link = document.createElement("a");
      link.href = story.link;
      link.className = "story-link";
      link.innerHTML = `
    <img src="${story.image}" alt="${story.title}" class="story-image">
    <div class="story-content">
      <h3 class="story-title">${story.title}</h3>
      <p class="story-description">${story.description}</p>
      <small>Cập nhật: ${story.updatedAt.toLocaleDateString()}</small>
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

  // Listen for search event from header
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

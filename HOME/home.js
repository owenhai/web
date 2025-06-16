document.addEventListener("DOMContentLoaded", function () {
  const stories = [
    {
      title: "Thế Giới Hoàn Mỹ",
      description: "",
      image: "img/truyen1.jpg",
      category: "Tu tiên, Huyền huyễn",
      author: "Thần Đông",
      status: "Hoàn thành",
      link: "../INTRODUCE/thế giới hoàn mỹ/truyen1.html",
    },
    {
      title: "Tiên Nghịch",
      description: "",
      image: "img/tiên nghịch.jpg",
      category: "Tu tiên, Huyền huyễn",
      author: "Nhĩ Căn",
      status: "Hoàn thành",
      link: "../INTRODUCE/tiên nghịch/index.html",
    },
    {
      title: "Đấu Phá Thương Khung",
      description:
        "Đấu Phá Thương Khung kể về một thế giới thuộc về Đấu Khí...",
      image: "/INTRODUCE/đấu phá thương khung/đấu phá thương khung.jpg",
      category: "Cổ trang, Huyền huyễn",
      author: "Thiên Tàm Thổ Đậu",
      status: "Hoàn thành",
      link: "../INTRODUCE/đấu phá thương khung/index.html",
    },
    {
      title: "Mục Thần Ký",
      description: "",
      image: "img/mục thần ký.jpg",
      category: "Cổ trang, Huyền huyễn",
      author: "Trạch Trư",
      status: "Hoàn thành",
      link: "../INTRODUCE/mục thần ký/index.html",
    },
    {
      title: "Tru Tiên",
      description: "",
      image: "img/tru tiên.jpg",
      category: "Cổ trang, Huyền huyễn",
      author: "Tiêu Đỉnh",
      status: "Hoàn thành",
      link: "../INTRODUCE/tru tiên/index.html",
    },
    {
      title: "Thương Nguyên Đồ",
      description: "",
      image: "img/thương nguyên đồ.jpg",
      category: "Cổ trang, Huyền huyễn",
      author: "",
      status: "Hoàn thành",
      link: "../INTRODUCE/thương nguyên đồ/index.html",
    },
    {
      title: "Trảm Thần",
      description: "",
      image: "img/trảm thần.jpg",
      category: "Hiện đại, Huyền huyễn",
      author: "",
      status: "Hoàn thành",
      link: "../INTRODUCE/trảm thần/index.html",
    },
    {
      title: "Kiếm Lai",
      description: "",
      image: "img/kiếm lai.jpg",
      category: "",
      author: "",
      status: "",
      link: "../INTRODUCE/kiếm lai/index.html",
    },
    {
      title: "Hoạ Giang Hồ Chi Bất Lương Nhân",
      description: "",
      image: "img/hoạ giang hồ.jpg",
      category: "",
      author: "",
      status: "",
      link: "../INTRODUCE/hoạ giang hồ/index.html",
    },
    {
      title: "Già Thiên",
      description: "",
      image: "img/già thiên.jpg",
      category: "",
      author: "",
      status: "",
      link: "../INTRODUCE/già thiên/index.html",
    },
    {
      title: "Thôn Phệ Tinh Không",
      description: "",
      image: "img/thôn phệ tinh không.jpg",
      category: "",
      author: "",
      status: "",
      link: "../INTRODUCE/thôn phệ tinh không/index.html",
    },
    {
      title: "Hoả Phụng Liêu Nguyên",
      description: "",
      image: "img/hoả phụng liêu nguyên.jpg",
      category: "",
      author: "",
      status: "",
      link: "../INTRODUCE/hoả phụng liêu nguyên/index.html",
    },
    {
      title: "Trường Sinh Giới",
      description: "",
      image: "img/trường sinh giới.jpg",
      category: "",
      author: "",
      status: "",
      link: "../INTRODUCE/trường sinh giới/index.html",
    },
    {
      title: "Nguyên Tôn",
      description: "",
      image: "img/nguyên tôn.jpg",
      category: "",
      author: "",
      status: "",
      link: "../INTRODUCE/nguyên tôn/index.html",
    },
    {
      title: "Quyến Tư Lượng",
      description: "",
      image: "img/quyến tư lượng.jpg",
      category: "",
      author: "",
      status: "",
      link: "../INTRODUCE/quyến tư lượng/index.html",
    },
    {
      title: "Vương Giả Vinh Diệu",
      description: "",
      image: "img/vương giả vinh diệu.jpeg",
      category: "",
      author: "",
      status: "",
      link: "../INTRODUCE/vương giả vinh diệu/index.html",
    },
    {
      title: "Thần Lan Kỳ Vực Vô Song Châu",
      description: "",
      image: "img/thần lan kỳ vực vô song châu.jpg",
      category: "",
      author: "",
      status: "",
      link: "../INTRODUCE/thần lan kỳ vực vô song châu/index.html",
    },
    {
      title: "Phàm Nhân Tu Tiên",
      description: "",
      image: "img/phàm nhân tu tiên.jpg",
      category: "",
      author: "",
      status: "",
      link: "../INTRODUCE/phàm nhân tu tiên/index.html",
    },
    {
      title: "Tử Xuyên",
      description: "",
      image: "img/tử xuyên.jpg",
      category: "",
      author: "",
      status: "",
      link: "../INTRODUCE/tử xuyên/index.html",
    },
    {
      title: "Natra Ma Đồng Giáng Thế",
      description: "",
      image: "img/natra ma đồng giáng thế.jpg",
      category: "",
      author: "",
      status: "",
      link: "../INTRODUCE/natra ma đồng giáng thế/index.html",
    },
  ];

  const storiesPerPage = 12;
  let currentPage = 1;
  let filteredStories = [...stories];

  const storyGrid = document.getElementById("story-grid");
  const pagination = document.getElementById("pagination");

  function displayStories(page = 1) {
    storyGrid.innerHTML = "";
    const start = (page - 1) * storiesPerPage;
    const end = start + storiesPerPage;
    const storiesToShow = filteredStories.slice(start, end);

    if (storiesToShow.length === 0) {
      storyGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; font-weight:600; color:#555;">Không tìm thấy truyện phù hợp.</p>`;
      return;
    }

    storiesToShow.forEach((story) => {
      const card = document.createElement("article");
      card.className = "story-card";
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Mở chi tiết truyện ${story.title}`);
      card.innerHTML = `
        <img src="${story.image}" alt="Bìa truyện ${story.title}" class="story-image" />
        <div class="story-content">
          <h2 class="story-title">${story.title}</h2>
          <p class="story-description">${story.description}</p>
        </div>
      `;
      card.addEventListener("click", () => {
        window.location.href = story.link; // Chuyển đến trang chi tiết truyện
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.click();
        }
      });
      storyGrid.appendChild(card);
    });
  }

  function createButton(label, page, disabled = false, active = false) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = label;
    if (disabled) btn.disabled = true;
    if (active) btn.classList.add("active");
    btn.addEventListener("click", () => {
      if (page !== currentPage) {
        currentPage = page;
        displayStories(currentPage);
        createPagination(totalPages);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
    return btn;
  }

  function createPagination(totalPages) {
    pagination.innerHTML = "";
    if (totalPages <= 1) return;

    // Previous button
    pagination.appendChild(
      createButton("‹", currentPage - 1, currentPage === 1)
    );

    // Always show first page
    pagination.appendChild(createButton("1", 1, false, currentPage === 1));

    // Ellipsis before current page group
    if (currentPage > 4) {
      const ellipsis1 = document.createElement("span");
      ellipsis1.className = "ellipsis";
      ellipsis1.textContent = "...";
      pagination.appendChild(ellipsis1);
    }

    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pagination.appendChild(
        createButton(i.toString(), i, false, currentPage === i)
      );
    }

    // Ellipsis after current page group
    if (currentPage < totalPages - 3) {
      const ellipsis2 = document.createElement("span");
      ellipsis2.className = "ellipsis";
      ellipsis2.textContent = "...";
      pagination.appendChild(ellipsis2);
    }

    // Always show last page
    if (totalPages > 1)
      pagination.appendChild(
        createButton(
          totalPages.toString(),
          totalPages,
          false,
          currentPage === totalPages
        )
      );

    // Next button
    pagination.appendChild(
      createButton("›", currentPage + 1, currentPage === totalPages)
    );
  }

  // Initialize
  let totalPages = Math.ceil(filteredStories.length / storiesPerPage);
  displayStories(currentPage);
  createPagination(totalPages);

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

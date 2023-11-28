document.addEventListener("DOMContentLoaded", function () {
  const bookmarkContainer = document.getElementById("bookmarks");

  // Retrieve bookmarks from local storage
  chrome.storage.local.get({ bookmarks: [] }, function (result) {
    const bookmarks = result.bookmarks;
    // Render bookmarks
    renderBookmarks(bookmarks);
  });

  // Attach event listener to the parent container to handle delete button clicks
  bookmarkContainer.addEventListener("click", function (event) {
    // Check if the clicked element is a delete button
    if (event.target && event.target.classList.contains("bookmarkDeleteBtn")) {
      // Retrieve the bookmark ID from the data-id attribute
      const bookmarkId = event.target.getAttribute("data-id");

      // Call the function to delete the bookmark
      deleteBookmark(bookmarkId);
    }
  });

  const tags = [
    "saasTag",
    "ecommerceTag",
    "minimalTag",
    "portfolioTag",
    "colorfulTag",
    "ladingpageTag",
    "startupTag",
    "darkTag",
    "webappTag",
  ];
  tags.forEach((tag) => {
    const tagButton = document.getElementById(`${tag}`);

    tagButton.addEventListener("click", function () {
      tagButton.classList.toggle("active");
      sortBookmarksByTags();

      return;
    });
  });
});

// Function to sort bookmarks by tags

function sortBookmarksByTags() {
  console.log("sortbooksmarksbytags ran");

  const selectedTags = [];
  document.querySelectorAll(".active").forEach((tag) => {
    selectedTags.push(tag.textContent);
  });

  // Filter bookmarks based on selected tags

  if (selectedTags.length > 0) {
    chrome.storage.local.get({ bookmarks: [] }, function (result) {
      const bookmarks = result.bookmarks;

      // Filter bookmarks based on selected tags
      const sortedBookmarks = bookmarks.filter((bookmark) => {
        return selectedTags.every((tag) => bookmark.tags.includes(tag));
      });

      renderBookmarks(sortedBookmarks);
    });
  } else {
    chrome.storage.local.get({ bookmarks: [] }, function (result) {
      const bookmarks = result.bookmarks;

      renderBookmarks(bookmarks);
    });
  }
}

// Function to render bookmarks

function renderBookmarks(bookmarks) {
  const bookmarkContainer = document.getElementById("bookmarks");

  // Accumulate HTML strings for each bookmark
  let allBookmarksHTML = "";

  bookmarks.forEach((bookmark) => {
    console.log(bookmark);

    const singleBookmark = `
      <div>
        <img class="bookmarkImage" src="${bookmark.image}" alt="${
      bookmark.title
    }">
        <div class="bookmarkHeaderSection">
          <span class="bookmarkTitle">${bookmark.title}</span>
          <div class="bookmarkActionContainer">
            <a href="${bookmark.URL}" class="bookmarkLinkBtn">
              <image src="/icons/link.png" alt="link icon" />
            </a>
            <button class="bookmarkDeleteBtn" data-id="${bookmark.id}">
              <image src="/icons/delete.png" alt="delete icon" />
            </button>
          </div>
        </div>
        <div class="bookmarkDivider"></div>
        <div class="singleBookmark">
          <ul class="bookmarksTagContainer">
            ${bookmark.tags
              .map((tag) => `<li class="bookmarkTag">${tag}</li>`)
              .join(" ")}
          </ul>
        </div>
      </div>`;

    allBookmarksHTML += singleBookmark + " ";
  });

  // Set the innerHTML once after the loop
  bookmarkContainer.innerHTML = allBookmarksHTML.trim();
}

// Function to delete a bookmark// Function to delete a bookmark
function deleteBookmark(bookmarkId) {
  chrome.storage.local.get({ bookmarks: [] }, function (result) {
    const bookmarks = result.bookmarks;

    // Convert bookmarkId to a number for comparison
    const idToFind = parseInt(bookmarkId);

    // Find the index of the bookmark with the specified ID
    const index = bookmarks.findIndex((bookmark) => bookmark.id === idToFind);

    // Remove the bookmark from the array
    if (index !== -1) {
      bookmarks.splice(index, 1);

      // Update the local storage with the modified bookmarks array
      chrome.storage.local.set({ bookmarks: bookmarks }, function () {
        // Re-render the bookmarks after deletion
        renderBookmarks(bookmarks);
      });
    }
  });
}

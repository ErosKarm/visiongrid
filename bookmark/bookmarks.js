document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get({ bookmarks: [] }, function (result) {
    var bookmarks = result.bookmarks;
    var bookmarkContainer = document.getElementById("bookmarks");

    // Accumulate HTML strings for each bookmark
    var allBookmarksHTML = "";

    bookmarks.forEach((bookmark) => {
      const singleBookmark = `<div><div>${bookmark.title}</div><img class="bookmarkImage" src="${bookmark.image}" alt="${bookmark.title}"></div>`;

      allBookmarksHTML += singleBookmark;
    });

    // Set the innerHTML once after the loop
    bookmarkContainer.innerHTML = allBookmarksHTML;
  });
});

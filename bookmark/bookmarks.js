document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get({ bookmarks: [] }, function (result) {
    const bookmarks = result.bookmarks;
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


        <div class="singleBookmark">
        <ul class="bookmarksTagContainer">
        ${bookmark.tags
          .map((tag) => {
            return `<li class="bookmarkTag">${tag}</li>`;
          })
          /* trunk-ignore(git-diff-check/error) */
          .join(" ")} 
          </ul>
          <span>${bookmark.title}</span>
          </div>
      </div>`;

      allBookmarksHTML += singleBookmark + " "; // Add a space between bookmarks
    });

    // Set the innerHTML once after the loop
    bookmarkContainer.innerHTML = allBookmarksHTML.trim(); // Trim to remove trailing space
  });
});

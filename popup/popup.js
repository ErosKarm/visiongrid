document.addEventListener("DOMContentLoaded", function () {
  const title = document.getElementById("titleInput");
  let url = "";

  // Get website information
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentWebsiteURL = tabs[0].url;
    const currentWebsiteTitle = tabs[0].title;

    chrome.tabs.captureVisibleTab({ format: "png" }, function (screenshotUrl) {
      captureScreenshot(screenshotUrl);
    });

    // Title placeholder
    url = `${currentWebsiteURL}`;
    title.placeholder = `${currentWebsiteTitle}`;
  });

  // Tags select
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
    });
  });

  // Bookmark button

  const handleBookmark = () => {
    if (document.querySelectorAll(".active").length <= 0) {
      console.log("please select atlest 1 tag");
      return;
    }

    const selectedTags = [];
    document.querySelectorAll(".active").forEach((tag) => {
      return selectedTags.push(tag.textContent);
    });

    console.log(selectedTags);

    const websiteData = {
      id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
      title: title.placeholder,
      tags: selectedTags,
      image: "",
      URL: "",
    };

    // Capture the visible tab's image
    chrome.tabs.captureVisibleTab({ format: "png" }, function (screenshotUrl) {
      websiteData.image = screenshotUrl;

      saveToStorage(websiteData);
    });

    const saveToStorage = (data) => {
      chrome.storage.local.get("bookmarks", function (result) {
        const bookmarks = result.bookmarks || [];

        bookmarks.push(data);

        // Save the updated bookmarks array back to storage
        chrome.storage.local.set({ bookmarks: bookmarks }, function () {
          console.log("Bookmark saved:", data);
        });
      });
    };
  };

  document
    .getElementById("bookmarkBtn")
    .addEventListener("click", handleBookmark);

  document
    .getElementById("all-bookmarks")
    .addEventListener("click", function () {
      chrome.tabs.create({ url: "/bookmark/bookmarks.html" });
    });
});

function captureScreenshot(screenshotUrl) {
  const imageElement = document.createElement("img");
  imageElement.src = screenshotUrl;
  imageElement.src = screenshotUrl;
  imageElement.style.width = "100%";
  imageElement.style.height = "auto";
  document.getElementById("current-website-image").appendChild(imageElement);
}

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
      const error = document.createElement("span");
      error.textContent = "Please select at least one tag";
      error.classList.add("error");

      document.querySelector(".websiteInfo").appendChild(error);

      return;
    }

    const selectedTags = [];
    document.querySelectorAll(".active").forEach((tag) => {
      return selectedTags.push(tag.textContent);
    });

    console.log(selectedTags);

    const websiteData = {
      id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
      title: title.value ? title.value : title.placeholder,
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

        // Remove the error tag if it exists and replace it with success message

        const error = document.querySelector(".error");
        if (error) {
          error.remove();
        }

        const success = document.createElement("span");
        success.textContent = "Bookmark saved successfully!";
        success.classList.add("success");

        document.querySelector(".websiteInfo").appendChild(success);
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
  imageElement.style.width = "100%";
  imageElement.style.height = "auto";
  document.getElementById("current-website-image").appendChild(imageElement);
}

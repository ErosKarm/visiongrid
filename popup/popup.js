document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentWebsiteURL = tabs[0].url;
    const currentWebsiteTitle = tabs[0].title;

    console.log(currentWebsiteTitle, currentWebsiteURL);

    chrome.tabs.captureVisibleTab({ format: "png" }, function (screenshotUrl) {
      captureScreenshot(screenshotUrl);
    });
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

let iscomming = false;
let input = document.querySelector(".form-control");
let div = document.querySelector(".div__video");
function downoadHendler() {
  let inputVlue = input.value.split("=");
  let a = inputVlue.toString()
  let b = a.slice(-11)
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "youtube-media-downloader.p.rapidapi.com",
      "X-RapidAPI-Key":
        "60d3679361msh23658a787eae6a0p1e6e27jsnd9af40ba59b2",
    },
  };

  fetch(
    `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${b}`,
    options
  )
    .then((response) => response.json())
    .then((res) => {
      div.innerHTML = `<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
      iscomming = true;
      let result = ``;
      if (res.reason == "Video not found.") {
        alert("Video not found.");
      } else {
        result = `
        
        <video  class= "videoPlayer" controls>
            <source src="${res.videos.items[0].url}" type="video/mp4">
            <source src="${res.videos.items[0].url}" type="video/ogg">
            Your browser does not support the video tag.
        .</video>
        <audio controls  class="audio__controls">
            <source src="${res.audios.items[0].url}" type="audio/ogg">
            <source src="${res.audios.items[0].url}" type="audio/mpeg">
          Your browser does not support the audio element.
          </audio>
        `;
      }
      div.innerHTML = result;
      iscomming = false;
    })
    .catch((err) => console.error(err));
} 
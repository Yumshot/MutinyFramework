import { createSignal } from "solid-js";

function App() {
  // check if document has loaded then check if element is available if its not do a while loop to check if its available then set the volume to the volume state variable and play the audio

  let element: any;
  let [volume] = createSignal(0.15);
  document.addEventListener("DOMContentLoaded", function () {
    // wait for user to interact with the page
    document.addEventListener("click", function () {
      element = document.getElementById("myAudio") as HTMLAudioElement;
      if (element) {
        element.volume = volume();
        element.play();
      }
    });
  });

  return (
    <>
      <audio id="myAudio" hidden loop autoplay>
        <source
          src="https://cdn.discordapp.com/attachments/1161385720053760070/1163521300636119161/Ghostrifter-Official-Devyzed-Downtown-Glowchosic.com.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>

      <div class="vertical-centered-box">
        <div class="content">
          <div class="loader-circle">
            <img
              src="https://cdn.discordapp.com/attachments/1161385720053760070/1161385816979943576/logo.png?"
              style="width: 100px; height: 100px; margin: 0 auto; display: block; filter: invert(1); -webkit-filter: invert(1); top: 2.5vh; position: relative;"
            />
            <div class="wrapper">
              <svg>
                <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                  Welcome to Mutiny Rp
                </text>
                <br />
                <text x="50%" y="50%" dy="1.35em" text-anchor="middle">
                  Left Click to Lower Volume
                </text>
              </svg>
            </div>
          </div>

          <div class="loader-line-mask">
            <div class="loader-line"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

      
      function ulploadsongs() {
          document.querySelector('#upl').click();
      }

      var nextSong = false;
      var lstPlyd;
      document.querySelector('#upl').addEventListener('change', () => {
          var inp = document.querySelector('#upl');
          console.log(this);
          var ul = document.querySelector('#ul');
          ul.parentElement.style.display = "block";
          for (const f of inp.files) {
              var li = document.createElement("li");
              li.innerText = f.name;
              console.log(f.name)
              li.onclick = function () {
                  console.log("cl");
                  audio.src = "./musics/" + f.name;
                  playMusic();
                  document.querySelector('.titcon').innerHTML = f.name;
                  this.style.backgroundColor = "rgba(255, 255, 255, 0.573)";
                  lstPlyd != null ? bg() : true;
                  lstPlyd = this;
              }
              li.oncontextmenu = function () {
                  nextSong = this;
                  return false;
              }
              li.title = "Right Click To Play As Next";
              ul.appendChild(li);
              list[0].push(f.name);
          }
      });
      
      function bg() {
          lstPlyd.style.backgroundColor = "#ebebeb00";
          lstPlyd.style.border = "none";
      }
      
      const coverimg = document.querySelector('#coverimg');
      const audio = document.querySelector('audio');
      const audiosrc = document.querySelector('source');
      const play = document.querySelector('.play');
      const next = document.querySelector('.next');
      const pre = document.querySelector('.pre');
      const repeatIcon = document.querySelector('.repeat');
      const suffleIcon = document.querySelector('.suffle');
      const icon = document.querySelector('.playicon');
      const background = document.querySelector('.maincon');
      const image = document.querySelector('.imgcon');
      const btn = document.querySelector('.btn');
      const progres = document.querySelector('#track');
      const changeTo = document.querySelector('#pro');
      
      const list = [
          [],
          ["./images/Fashion.jpg", "./images/Dr_Zeus.jpg", "./images/Satisfya.jpg", "./images/cute_Munda.jpg", "./images/Satisfya.jpg", "./images/cute_Munda.jpg"]
      ];
      var isplaying = false;
      var tosuffle = false;
      var ind = 0;
      
      pre.addEventListener('click', preS);
      next.addEventListener('click', nextS);
      repeatIcon.addEventListener('click', toggleRepeat);
      suffleIcon.addEventListener('click', togglesuffle);
      play.addEventListener('click', () => {
          isplaying ? pauseMusic() : playMusic();
      });
      
      
      changeTo.addEventListener('click', changebar);
      /*imp*/
      progres.addEventListener('mouseover', () => {
          changeTo.removeEventListener('click', changebar);
      });
      /*imp*/
      progres.addEventListener('mouseout', () => {
          changeTo.addEventListener('click', changebar);
      });
      
      function changebar(ev) {
          console.log(ev.offsetX);
          console.log(ev.offsetY);
          let widthper = (ev.offsetX / 305) * 100;
          let tt = Math.floor(audio.duration);
          let Timeper = (tt * widthper) / 100;
          audio.currentTime = Timeper;
          progres.style.left = (ev.offsetX - 5) + "px";
      }
      
      function nextS() {
          let num = Math.floor(Math.random() * list[0].length);
          ind = (ind == num) ? num == 0 ? 1 : 0 : num;
          // audio.src = "./musics/"+list[0][++ind];
          // document.getElementsByTagName("li")[++ind];
          if (nextSong) {
              nextSong.click();
              nextSong = false;
          } else {
              if (!tosuffle) {
                  if (lstPlyd.nextElementSibling != null) {
                      lstPlyd.nextElementSibling.click();
                  } else {
                      document.getElementsByTagName("li")[0].click();
                  }
              } else
                  document.getElementsByTagName("li")[ind].click();

          }
      
          let coverimg = document.querySelector('#coverimg');
          coverimg.src = list[1][3];
        //   isplaying ? playMusic() : pauseMusic();
      }
      
      function preS() {
          let num = Math.floor(Math.random() * list[0].length);
          ind = (ind == num) ? num == 0 ? 1 : 0 : num;
          if (!tosuffle) {
              if (lstPlyd.previousElementSibling != null) {
                  lstPlyd.previousElementSibling.click();
              } else {
                  document.getElementsByTagName("li")[list[0].length - 1].click();
              }
          } else
              document.getElementsByTagName("li")[ind].click();
      
          let coverimg = document.querySelector('#coverimg');
          coverimg.src = list[1][1];
        //   isplaying ? playMusic() : pauseMusic();
      }
      
      function setttime() {
          if (audio.duration) {
              let min = Math.floor(Math.floor(audio.duration) / 60);
              let sec = Math.floor(Math.floor(audio.duration) % 60);
              let time = min > 9 ? min + ":" : "0" + min + ":";
              time += sec > 9 ? sec : "0" + sec;
              document.querySelector('#totalt').innerHTML = time;
          }
      }
      
      function updateTime() {
          let min = Math.floor(Math.floor(audio.currentTime) / 60);
          let sec = Math.floor(Math.floor(audio.currentTime) % 60);
          let time = min > 9 ? min + ":" : "0" + min + ":";
          time += sec > 9 ? sec : "0" + sec;
          document.querySelector('#curt').innerHTML = time;
          let tt = Math.floor(audio.duration);
          let curT = Math.floor(audio.currentTime);
          let per = (curT / tt) * 100;
          let ls = 0;
          progres.style.left = ls + per * 3 + "px";
          audio.ended ? nextS() : 1;
      }
      
      function playMusic() {
          audio.play();
          background.style.animationPlayState = "Running";
          let artist = document.querySelector('.artist');
          (artist.innerHTML == 'Artist') ? artist.innerHTML += ' ?' : false;
          play.style.paddingLeft = '0px';
          play.style.paddingTop = '12px';
          icon.style.fontSize = '25px';
          icon.classList.replace('fa-play', 'fa-pause');
          coverimg.classList.add('rotate');
          coverimg.style.animationPlayState = 'Running';
          isplaying = true;
      }
      
      function pauseMusic() {
      
        audio.pause();
        background.style.animationPlayState = "Paused";
        play.style.paddingLeft = '5px';
        play.style.paddingTop = '9px';
        icon.style.fontSize = '28px';
        icon.classList.replace('fa-pause', 'fa-play');
        coverimg.style.animationPlayState = 'Paused';
        isplaying = false;
      
      }
      
      function toggleRepeat() {
          if (audio.loop = !audio.loop) {
              repeatIcon.style.color = "black";
              repeatIcon.title = "turn-repeat-off";
          } else {
              repeatIcon.style.color = "#e6e6e6b2";
              repeatIcon.title = "turn-repeat-on";
          }
      }
      
      function togglesuffle() {
          if (tosuffle = !tosuffle) {
              suffleIcon.style.color = "black";
              suffleIcon.title = "turn-suffle-off";
          } else {
              suffleIcon.style.color = "#e6e6e6b2";
              suffleIcon.title = "turn-suffle-on";
          }
      }
      
document.querySelector("#cat").addEventListener("click", function () {
  var audio = document.getElementById("catAudio");
  audio.volume = 0.5; // 볼륨을 50%로 설정
  audio.play(); // 오디오 재생 시작

  // 2초 후에 오디오 재생 중지
  setTimeout(function () {
    audio.pause(); // 오디오 재생 중지
    audio.currentTime = 0; // 오디오 시간을 0으로 리셋
  }, 2300);
});

// 모달 열기 버튼 요소 가져오기
var btn = document.getElementById("cat");

// 모달 창 요소 가져오기
var modal = document.getElementById("myModal");

// 모달 닫기 버튼 요소 가져오기
var closeBtn = document.getElementsByClassName("close")[0];

// 클릭 시 모달 열기
btn.onclick = function () {
  modal.style.display = "block";
};

// 모달 닫기 버튼 클릭 시 모달 닫기
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// 모달 외부 클릭 시 모달 닫기
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// 고양ㅇ
$(document).ready(function () {
  $("#container-cat").hover(
    function () {
      $("#container-cat").addClass("hover");
    },
    function () {
      $("#container-cat").removeClass("hover");
    }
  );
});

const host = "http://3.211.6.129:8000";
const guestWrap = document.querySelector("#guests");

function getGuests() {
  axios
    .get(`${host}/guest`)
    .then((response) => {
      console.log(response.data);
      renderGuests(response.data.guests);
    })
    .catch((error) => {
      console.error("Error fetching guests:", error);
    });
}
function renderGuests(guests) {
  guestWrap.innerHTML = ""; // guestWrap 초기화
  guests.forEach((guest) => {
    const guestDiv = document.createElement("div");
    guestDiv.classList.add("guest-wrap");
    guestWrap.appendChild(guestDiv);

    const nameDiv = document.createElement("span");
    nameDiv.classList.add("name");
    nameDiv.textContent = guest.name;
    guestDiv.appendChild(nameDiv);

    const dateDiv = document.createElement("span");
    dateDiv.classList.add("date");
    dateDiv.textContent = `${guest.date} (${guest.time})`;
    guestDiv.appendChild(dateDiv);

    // 삭제 버튼 생성 및 이벤트 처리
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "삭제";

    deleteBtn.addEventListener("click", function () {
      deleteGuest(guest.id); // Use the actual guest ID
    });

    // guestDiv에 삭제 버튼 추가
    guestDiv.appendChild(deleteBtn);
    const textDiv = document.createElement("div");
    textDiv.classList.add("text");
    textDiv.textContent = guest.text;
    guestDiv.appendChild(textDiv);
  });
}

window.addEventListener("DOMContentLoaded", function () {
  getGuests();
});

const nameInput = document.querySelector(".guest-input");
const textArea = document.querySelector("textarea");
const addBtn = document.querySelector(".add-btn");

addBtn.addEventListener("click", function () {
  addGuest();
});
function addGuest() {
  const name = nameInput.value.trim();
  const text = textArea.value.trim();
  // 현재 날짜와 시간을 가져옵니다.
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  let guestData = { id: 0, name: name, text: text, date: date, time: time };
  if (name === "" || text === "") return;
  axios
    .post(`${host}/guest`, guestData)
    .then((response) => {
      nameInput.value = "";
      textArea.value = "";
      getGuests();
    })
    .catch((error) => {
      console.error("Error adding guest:", error);
    });
}

function deleteGuest(guestId) {
  axios
    .delete(`${host}/guest/${guestId}`)
    .then(function (response) {
      console.log("Guest deleted:", response.data);
      getGuests();
    })
    .catch(function (error) {
      console.error("Error deleting guest:", error);
    });
}

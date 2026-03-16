const trackButton = document.getElementById("trackButton");
const trackResult = document.getElementById("trackResult");
const trackNumber = document.getElementById("trackNumber");
const trackIdValue = document.getElementById("trackIdValue");
const trackFromValue = document.getElementById("trackFromValue");
const trackToValue = document.getElementById("trackToValue");
const trackStatusList = document.getElementById("trackStatusList");

trackButton.addEventListener("click", () => {
  if (!trackNumber.value || trackNumber.value === "") {
    alert("Заполните номер отправления");
  }

  if (Number(trackNumber.value) < 1000 || Number(trackNumber.value) > 10000) {
    alert("К сожалению, мы не смогли найти отправление по данному номеру");
    trackResult.classList.toggle("is-visible", false);
    return;
  }

  const response = {
    id: trackNumber.value,
    route: {
      from: "Москва, улица Арбат, 1",
      to: "Минск, проспект Независимости, 58",
    },
    statuses: [
      { type: "created", label: "Создан", date: "10.01.2026" },
      { type: "in-way", label: "В пути: Вязьма", date: "15.01.2026" },
      { type: "in-way", label: "В пути: Орша", date: "16.01.2026" },
      { type: "in-way", label: "В пути: Минск", date: "18.01.2026" },
      { type: "ready", label: "Готов к выдаче", date: "25.01.2026" },
      { type: "done", label: "Вручен", date: "27.01.2026" },
    ],
  };

  trackResult.classList.toggle("is-visible", true);

  trackIdValue.textContent = `№${response.id}`;
  trackFromValue.textContent = `Откуда: ${response.route.from}`;
  trackToValue.textContent = `Куда: ${response.route.to}`;

  renderStatuses(response.statuses);
});

function renderStatuses(statuses) {
  trackStatusList.innerHTML = "";

  statuses.forEach((status) => {
    const item = document.createElement("div");
    item.className = `track-status ${status.type}`;

    const icon = document.createElement("img");
    icon.className = "track-status-icon";
    icon.src = `./images/icons/${status.type}.svg`;

    const text = document.createElement("div");
    text.className = "track-status-text";

    const state = document.createElement("div");
    state.className = "track-status-text-state";
    state.textContent = status.label;

    const date = document.createElement("div");
    date.className = "track-status-text-date";
    date.textContent = status.date;

    text.append(state, date);
    item.append(icon, text);
    trackStatusList.appendChild(item);
  });
}

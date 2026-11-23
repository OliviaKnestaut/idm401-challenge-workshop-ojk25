const categorySelect = document.querySelector("#category");
const daySelect = document.querySelector("#day");
const resetButton = document.querySelector("#reset-button");
const emptyResetButton = document.querySelector("#empty-reset-button");
const eventList = document.querySelector("#event-list");
const emptyState = document.querySelector("#empty-state");
const resultCount = document.querySelector("#result-count");

let events = [];

function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

function createEventCard(event) {
  return `
    <article class="event-card">
      <div class="event-meta">
        <span class="category-tag" data-category="${escapeHtml(event.category)}">
          ${escapeHtml(event.category)}
        </span>
        <time class="event-time" datetime="${escapeHtml(event.dateTime)}">
          ${escapeHtml(event.day)} · ${escapeHtml(event.time)}
        </time>
      </div>
      <h3>${escapeHtml(event.title)}</h3>
      <p class="event-location">${escapeHtml(event.location)}</p>
    </article>
  `;
}

function renderEvents() {
  const category = categorySelect.value;
  const day = daySelect.value;

  const filteredEvents = events.filter((event) => {
    const categoryMatches = category === "all" || event.category === category;
    const dayMatches = day === "all" || event.day === day;
    return categoryMatches && dayMatches;
  });

  eventList.innerHTML = filteredEvents.map(createEventCard).join("");

  const countText =
    filteredEvents.length === 1
      ? "1 event found"
      : `${filteredEvents.length} events found`;
  resultCount.textContent = countText;

  const isFiltered = category !== "all" || day !== "all";
  resetButton.hidden = !isFiltered;
  emptyState.hidden = filteredEvents.length !== 0;
  eventList.hidden = filteredEvents.length === 0;
}

function resetFilters() {
  categorySelect.value = "all";
  daySelect.value = "all";
  renderEvents();
  categorySelect.focus();
}

categorySelect.addEventListener("change", renderEvents);
daySelect.addEventListener("change", renderEvents);
resetButton.addEventListener("click", resetFilters);
emptyResetButton.addEventListener("click", resetFilters);

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load events (${response.status})`);
    }
    return response.json();
  })
  .then((eventData) => {
    events = eventData;
    renderEvents();
  })
  .catch((error) => {
    console.error(error);
    resultCount.textContent = "Events could not be loaded";
    emptyState.hidden = false;
    emptyState.querySelector("h3").textContent = "Events unavailable";
    emptyState.querySelector("p").textContent =
      "Please refresh the page and try again.";
  });

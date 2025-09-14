// Utility to pad numbers (so keys look like 2025-09-12)
function pad(n) {
  return n < 10 ? "0" + n : n;
}

// Year
const year = 2025;
const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const weekdays = ["S","M","T","W","T","F","S"];

// Today’s date
const today = new Date();
const todayKey = `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`;

// Save visit in localStorage
let visits = JSON.parse(localStorage.getItem("visits")) || {};
visits[todayKey] = true;
localStorage.setItem("visits", JSON.stringify(visits));

// Calendar container
const calendarContainer = document.getElementById("yearCalendar");

// Build each month
months.forEach((monthName, monthIndex) => {
  const monthDiv = document.createElement("div");
  monthDiv.classList.add("month");

  // Header
  const header = document.createElement("h2");
  header.innerText = monthName;
  monthDiv.appendChild(header);

  // Table
  const table = document.createElement("table");

  // Weekday row
  let thead = "<tr>";
  weekdays.forEach(day => { thead += `<th>${day}</th>`; });
  thead += "</tr>";
  table.innerHTML = thead;

  // Days
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  let row = "<tr>";
  for (let i = 0; i < firstDay; i++) {
    row += "<td></td>";
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${pad(monthIndex+1)}-${pad(d)}`;
    let cellClass = "";
    let mark = "";

    if (visits[key]) {
      cellClass = "visited";
      mark = `<div class="tick">✔️</div>`;
    }

    row += `<td class="${cellClass}">${d}<br>${mark}</td>`;

    if ((firstDay + d) % 7 === 0) {
      row += "</tr>";
      table.innerHTML += row;
      row = "<tr>";
    }
  }

  if (row !== "<tr>") {
    while (row.split("<td>").length - 1 < 7) {
      row += "<td></td>";
    }
    row += "</tr>";
    table.innerHTML += row;
  }

  monthDiv.appendChild(table);
  calendarContainer.appendChild(monthDiv);
});

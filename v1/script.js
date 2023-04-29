const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

console.log(CATEGORIES.find((cat) => cat.name === "society").color);
async function loadFact() {
  const res = await fetch(
    "https://hrnsbwjmyrxaplshajdm.supabase.co/rest/v1/fact",
    {
      headers: {
        apikey: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        .eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhybnNid2pteXJ4YXBsc2hhamRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4Nzc5OTQsImV4cCI6MTk5NzQ1Mzk5NH0
        .eB3jJv_yoMUCEZvTPsd63EAXVj0v8gSN9h_Q1VSxmNY`,
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhybnNid2pteXJ4YXBsc2hhamRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4Nzc5OTQsImV4cCI6MTk5NzQ1Mzk5NH0.eB3jJv_yoMUCEZvTPsd63EAXVj0v8gSN9h_Q1VSxmNY`,
      },
    }
  );

  const data = await res.json();

  createdFactElement(data);
  const filterData = data.filter((el) => el.category === "society");
}
loadFact();

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const btnOpen = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factList = document.querySelector(".fact-list");
factList.innerHTML = "";

const createdFactElement = (initialFacts) => {
  const factHTML = initialFacts.map(
    (el) => `<li class="fact">
    <p>
      ${el.text};
      <a
        class="source"
        href="${el.source}"
        target="_blank"
        >(source)</a
      >
    </p>
    <span class="tag" style="background-color: ${
      CATEGORIES.find((cat) => cat.name === el.category).color
    }"
      >${el.category}</span
    >
    <div class="vote-buttons">
      <button>👍24</button>
      <button>🤯9</button>
      <button>⛔️4</button>
    </div>
    </li>`
  );
  factList.insertAdjacentHTML("afterbegin", factHTML);
};

btnOpen.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btnOpen.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btnOpen.textContent = "Share A Fact";
  }
});

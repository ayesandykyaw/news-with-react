import { useCallback, useEffect, useState } from "react";
import "./style.css";
import supabase from "./supabase";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
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
function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFact] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFact() {
        let query = supabase.from("fact").select("*");
        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);
        const { data: fact, error } = await query
          .order("votesinteresting", { ascending: false })
          .limit(1000);
        setFact(fact);
        setIsLoading(false);
      }
      getFact();
    },
    [currentCategory]
  );
  return (
    <>
      <Header setShowForm={setShowForm} showForm={showForm} />

      {showForm ? (
        <NewFactForm setFact={setFact} setShowForm={setShowForm} />
      ) : null}
      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? <Loader /> : <FactList facts={facts} />}
      </main>
    </>
  );
}
function Loader() {
  return <span className="message">Loading.....</span>;
}
function Header({ setShowForm, showForm }) {
  const appTitle = "React Project";
  return (
    <header class="header">
      <div class="logo">
        <img src="./img/logo.png" alt="This is Website logo" />
        <h1>{appTitle}</h1>
      </div>
      <button
        class="btn btn-large"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share A Fact"}
      </button>
    </header>
  );
}

function NewFactForm({ setFact, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUpLoading] = useState("false");
  const textLength = text.length;
  async function handleSubmit(e) {
    //1
    e.preventDefault();
    //2
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // Supabase
      const { data: newFacts, error } = await supabase
        .from("fact")
        .insert([{ text, source, category }])
        .select();
      console.log(newFacts);
      isUploading(true);
      //3
      const newFact = {
        id: Math.round(Math.random() * 1000000),
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      };
      //4
      if (!error) setFact((currentFacts) => [newFact[0], ...currentFacts]);
      //5
      setText("");
      setSource("");
      setCategory("");
      //6
      setShowForm(false);
    }
  }
  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share A Fact With The Words..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={setIsUpLoading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Trusthworthy Source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={setIsUpLoading}
      />
      <select
        name=""
        id=""
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={setIsUpLoading}
      >
        <option value="">Choose Category</option>

        {CATEGORIES.map((cat) => (
          <option value={cat.name} key={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}
function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-category"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li className="category" key={cat.name}>
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
function FactList({ facts }) {
  if (facts.length === 0) {
    return (
      <span className="message">
        No Fact For This Category Yet! Create First One
      </span>
    );
  } else {
    return (
      <section>
        <ul className="fact-list">
          {facts.map((fact) => (
            <Fact factObj={fact} key={fact.id} />
          ))}
        </ul>
        <p>There are {facts.length} facts.</p>
      </section>
    );
  }
}
function Fact({ factObj }) {
  return (
    <li className="fact">
      <p>
        ${factObj.text}
        <a className="source" href={factObj.source} target="_blank">
          (source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find(
            (cat) => cat.name === factObj.category
          ).color,
        }}
      >
        ${factObj.category}
      </span>
      <div className="vote-buttons">
        {/* function voteHandling()
        {<button onClick={voteHandling}>👍{factObj.votesInteresting}</button>} */}
        <button>🤯{factObj.votesMindblowing}</button>
        <button>⛔️{factObj.votesFalse}</button>
      </div>
    </li>
  );
}

export default App;

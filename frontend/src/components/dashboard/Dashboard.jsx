import React from "react";
import "./dashboard.css";

import { useState, useEffect } from "react";
import Navbar from "../Navbar";

export default function Dashboard() {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const repsonse = await fetch(
          `http://localhost:3000/repo/user/${userId}`,
        );

        const data = await repsonse.json();
        setRepositories(data || []);
      } catch (err) {
        console.error("Error while fetching repositories :", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/repo/all`);

        const data = await response.json();
      
        setSuggestedRepositories(data || []);
      } catch (err) {
        console.error("Error while fetching repositories :", err);
      }
    };
    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (!repositories) return;

    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
    <Navbar></Navbar>
      <section id="dashboard">
        <aside>
          <h3>Suggested repositories</h3>
          {suggestedRepositories.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            );
          })}{" "}
        </aside>
        <main>
          <h3>Your repositories</h3>
          <div >
            <input
            id="search"
              type="text"
              value={searchQuery}
              placeholder="search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchResults.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            );
          })}
        </main>
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
            <li>
              <p>Developer Meetup - Dec 15</p>
            </li>
            <li>
              <p>React summit - May 15</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
}

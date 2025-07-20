import { useEffect, useState } from "react";
import GoalList from "./components/GoalList";
import GoalForm from "./components/GoalForm";
import DepositForm from "./components/DepositForm";
import Overview from "./components/Overview";
import "./App.css";

const API_URL = "http://localhost:3002/goals";

function App() {
  const [goals, setGoals] = useState([]);

  // Fetch initial goals
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Add new goal
  const handleAddGoal = (newGoal) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((created) => setGoals([...goals, created]));
  };

  // Update goal
  const handleUpdateGoal = (id, updates) => {
    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
      .then((res) => res.json())
      .then((updated) =>
        setGoals(goals.map((g) => (g.id === id ? updated : g)))
      );
  };

  // Delete goal
  const handleDeleteGoal = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() =>
      setGoals(goals.filter((g) => g.id !== id))
    );
  };

  // Deposit to a goal
  const handleDeposit = (id, amount) => {
    const goal = goals.find((g) => g.id === id);
    const updatedAmount = goal.savedAmount + amount;
    handleUpdateGoal(id, { savedAmount: updatedAmount });
  };

  return (
    <div className="App">
      <h1> Smart Goal Planner</h1>
      <Overview goals={goals} />

      {/*  Pass onAdd instead of onAddGoal */}
      <GoalForm onAdd={handleAddGoal} />
      <DepositForm goals={goals} onDeposit={handleDeposit} />

      <GoalList
        goals={goals}
        onDelete={handleDeleteGoal}
        onUpdate={handleUpdateGoal}
      />
    </div>
  );
}

export default App;

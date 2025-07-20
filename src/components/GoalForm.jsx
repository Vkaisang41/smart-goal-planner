import { useState } from "react";

function GoalForm({ onAdd }) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !targetAmount || !category || !deadline) return;

    const newGoal = {
      name,
      targetAmount: parseFloat(targetAmount),
      savedAmount: 0,
      category,
      deadline,
      createdAt: new Date().toISOString().split("T")[0],
    };

    onAdd(newGoal); //  this matches App.js now

    // reset form
    setName("");
    setTargetAmount("");
    setCategory("");
    setDeadline("");
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <h2>Add New Goal</h2>
      <input
        type="text"
        placeholder="Goal Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Target Amount"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;

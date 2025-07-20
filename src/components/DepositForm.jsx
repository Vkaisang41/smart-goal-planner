import React, { useState } from "react";

function DepositForm({ goals, onDeposit }) {
  const [amount, setAmount] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedId || !amount) return;
    onDeposit(selectedId, Number(amount));
    setAmount("");
    setSelectedId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Make a Deposit</h2>
      <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
        <option value="">Select Goal</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;

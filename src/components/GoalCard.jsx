import { useState } from "react";

function GoalCard({ goal, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: goal.name,
    targetAmount: goal.targetAmount,
    category: goal.category,
    deadline: goal.deadline,
  });

  // Calculate progress
  const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);

  // Deadline warnings
  const deadlineDate = new Date(goal.deadline);
  const today = new Date();
  const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  let statusClass = "";
  if (diffDays < 0 && goal.savedAmount < goal.targetAmount) {
    statusClass = "overdue";
  } else if (diffDays <= 30 && goal.savedAmount < goal.targetAmount) {
    statusClass = "warning";
  }

  // Handle edit form
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(goal.id, {
      name: editData.name,
      targetAmount: Number(editData.targetAmount),
      category: editData.category,
      deadline: editData.deadline,
    });
    setIsEditing(false);
  };

  return (
    <div className={`goal-card ${statusClass}`}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={editData.name}
            onChange={handleChange}
            placeholder="Goal name"
          />
          <input
            type="number"
            name="targetAmount"
            value={editData.targetAmount}
            onChange={handleChange}
            placeholder="Target Amount"
          />
          <input
            type="text"
            name="category"
            value={editData.category}
            onChange={handleChange}
            placeholder="Category"
          />
          <input
            type="date"
            name="deadline"
            value={editData.deadline}
            onChange={handleChange}
          />
          <button type="submit"> Save</button>
        </form>
      ) : (
        <>
          <h3>{goal.name}</h3>
          <p><strong>Category:</strong> {goal.category}</p>
          <p>
            Saved: ${goal.savedAmount} / ${goal.targetAmount}
          </p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p><strong>Deadline:</strong> {goal.deadline}</p>
          <div className="actions">
            <button className="edit" onClick={() => setIsEditing(true)}> Edit</button>
            <button className="delete" onClick={() => onDelete(goal.id)}> Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default GoalCard;

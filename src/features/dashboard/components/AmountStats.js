function AmountStats({ title, value }) {
  return (
    <div className="stats bg-base-100 shadow">
      <div className="stat">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        <div className={"stat-desc font-bold text-rose-500 dark:text-red-400"}>
          ↙ -95.92%
        </div>
      </div>
    </div>
  );
}

export default AmountStats;

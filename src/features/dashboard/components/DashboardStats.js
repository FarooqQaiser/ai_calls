function DashboardStats({ title, Icon, value, description, colorIndex }) {
  const COLORS = ["primary", "primary"];

  const getDescStyle = () => {
    if (description.includes("↗︎"))
      return "font-bold text-green-700 dark:text-green-300";
    else if (description.includes("↙"))
      return "font-bold text-rose-500 dark:text-red-400";
    else return "";
  };

  const innerHtml = { __html: Icon };

  return (
    <div className="stats shadow bg-white dark:bg-[#14171A] ">
      <div className="stat ">
        <div
          className={`stat-figure dark:text-slate-300 text-${
            COLORS[colorIndex % 2]
          }`}
        >
          <Icon className="w-8 h-8" />
        </div>
        <div className="stat-title dark:text-slate-300">{title}</div>
        <div
          className={`stat-value dark:text-slate-300 text-${
            COLORS[colorIndex % 2]
          }`}
        >
          {value}
        </div>
        <div className={"stat-desc  " + getDescStyle()}>{description}</div>
      </div>
    </div>
  );
}

export default DashboardStats;

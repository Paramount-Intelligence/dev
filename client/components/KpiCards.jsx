function KpiCards({ kpis }) {
  const items = [
    { label: "Total Interns", value: kpis.totalInterns },
    { label: "Average Score", value: kpis.averageScore },
    { label: "Accepted", value: kpis.acceptedCount },
    { label: "In Interview", value: kpis.interviewCount },
    { label: "Acceptance Rate", value: `${kpis.acceptanceRate}%` }
  ];

  return (
    <div className="kpi-grid">
      {items.map((item) => (
        <div className="card kpi-card" key={item.label}>
          <span className="kpi-label">{item.label}</span>
          <strong className="kpi-value">{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

export default KpiCards;

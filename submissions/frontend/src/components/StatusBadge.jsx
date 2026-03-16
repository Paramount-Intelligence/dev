const STATUS_CONFIG = {
  Applied:   { cls: 'badge-applied',   dot: '#818cf8', label: 'Applied'   },
  Screening: { cls: 'badge-screening', dot: '#fbbf24', label: 'Screening' },
  Interview: { cls: 'badge-interview', dot: '#60a5fa', label: 'Interview' },
  Offer:     { cls: 'badge-offer',     dot: '#34d399', label: 'Offer'     },
  Hired:     { cls: 'badge-hired',     dot: '#10b981', label: 'Hired'     },
  Rejected:  { cls: 'badge-rejected',  dot: '#f87171', label: 'Rejected'  },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || { cls: 'badge-applied', dot: '#818cf8', label: status };
  return (
    <span className={`badge ${config.cls}`}>
      <span className="badge-dot" style={{ background: config.dot }} />
      {config.label}
    </span>
  );
}

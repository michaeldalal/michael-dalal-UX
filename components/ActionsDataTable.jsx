import Badge from './Badge.jsx';
import IconButton from './IconButton.jsx';
import { MoreVerticalIcon } from './icons.jsx';

export default function ActionsDataTable({ rows, visibleCount, totalCount }) {
  return (
    <>
      <p className="table-row-count">
        Showing <span>{visibleCount ?? rows.length}</span> of <span>{totalCount ?? rows.length}</span> actions
      </p>
      <div className="table-container">
        <table className="sb-argstableBlock">
          <thead className="sb-argstableBlock-head">
            <tr>
              <th style={{ width: '28%' }}>Actions</th>
              <th style={{ width: '14%' }}>Type</th>
              <th style={{ width: '14%' }}>Status</th>
              <th style={{ width: '14%' }}>Triggered By</th>
              <th style={{ width: '12%' }}>Date</th>
              <th style={{ width: '13%' }}>Impact</th>
              <th style={{ width: '5%' }} />
            </tr>
          </thead>
          <tbody className="sb-argstableBlock-body">
            {rows.map((row, i) => (
              <tr key={i}>
                <td>
                  <div className="action-name">{row.name}</div>
                  <div className="action-description">{row.description}</div>
                </td>
                <td>
                  <Badge variant="secondary">{row.type}</Badge>
                </td>
                <td>
                  <Badge variant="default" withCheck>
                    {row.status}
                  </Badge>
                </td>
                <td>{row.triggeredBy}</td>
                <td className="date-cell">{row.date}</td>
                <td className="impact-cell">{row.impact}</td>
                <td>
                  <IconButton variant="ghost" ariaLabel="Open menu">
                    <MoreVerticalIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

import { SocCapLogItem } from "@/app/lib/voteDefinitions";

interface SocialCapitalLogTableProps {
  socCapLog: SocCapLogItem[];
  className?: string;
}

export function SocialCapitalLogTable({ socCapLog, className }: SocialCapitalLogTableProps) {
  return (
    <div className={className}>
      <table>
        <thead>
          <tr>
            <th className="text-left mr-4">Время</th>
            <th className="text-left mr-4">Источник</th>
            <th className="text-left mr-4">Семья</th>
            <th className="text-left mr-4">Кому</th>
            <th className="text-right">Сколько</th>
            <th className="text-left mr-4">Комент</th>
            <th className="text-right">Итог</th>
          </tr>
        </thead>
        <tbody>
          {socCapLog.map((item) => (
            <tr key={item.id}>
              <td>{item.timestamp.toLocaleString()}</td>
              <td>{item.source}</td>
              <td>{item.house_name}</td>
              <td>{item.recipient_name}</td>
              <td className="text-right">{item.amount}</td>
              <td>{item.comment}</td>
              <td className="text-right">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

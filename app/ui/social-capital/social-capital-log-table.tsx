import { SocCapLogItem } from "@/app/lib/voteDefinitions";

interface SocialCapitalLogTableProps {
  socCapLog: SocCapLogItem[];
  className?: string;
}

export function SocialCapitalLogTable({ socCapLog, className }: SocialCapitalLogTableProps) {
  return (
    <div className={className}>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-2">Время</th>
            <th className="text-left p-2">Источник</th>
            <th className="text-left p-2">Семья</th>
            <th className="text-left p-2">Кому</th>
            <th className="text-right p-2">Сколько</th>
            <th className="text-left p-2 w-60">Комент</th>
            <th className="text-right p-2 w-16">Итог</th>
          </tr>
        </thead>
        <tbody>
          {socCapLog.map((item) => (
            <tr key={item.id} className="">
              <td className="px-2 py-2">{item.timestamp.toLocaleString()}</td>
              <td className="px-2">{item.source}</td>
              <td className="px-2">{item.house_name}</td>
              <td className="px-2">{item.recipient_name}</td>
              <td className="px-2 text-right">{item.amount}</td>
              <td className="px-2">{item.comment}</td>
              <td className="px-2 text-right">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

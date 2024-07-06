import { AffiliatedCountVoteLogItem, UnaffiliatedCountVoteLogItem } from "@/app/lib/voteDefinitions";
import { COUNT_VOTE_REQUEST_I18N, REQUEST_STATUS_I18N, VOTE_I18N } from "@/constants";

export function CountVoteLogCard({
  item,
  className,
}: {
  item: AffiliatedCountVoteLogItem | UnaffiliatedCountVoteLogItem;
  className?: string;
}) {
  const arr: [string, any][] = [
    ["Заявка", COUNT_VOTE_REQUEST_I18N[item.voteType]],
    ["Статус заявки", REQUEST_STATUS_I18N[item.type]],
    ["Расходы соц капитала", item.socialCapitalChange],
  ];

  if (item.type === "vote" && (item.voteType === "forCount" || item.voteType === "againstCount")) {
    arr.push(["Голос графа", VOTE_I18N[item.countVote]]);
  }
  if (item.appliedVote) {
    arr.push(["Примененный голос", VOTE_I18N[item.appliedVote]]);
  }

  return (
    <div className={className}>
      <div className="pb-2">
        <span className="w-32 inline-block">{item.house_name}</span>
        <span className="opacity-50">{item.timestamp.toLocaleString()}</span>
      </div>
      <div className="pl-6">
        {arr.map(([label, text]) => (
          <div>
            <span className="w-48 inline-block">{label}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

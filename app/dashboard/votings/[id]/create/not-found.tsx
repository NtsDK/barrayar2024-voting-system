import { VOTINGS_ROUTE } from "@/routes";
import CommonNotFound from "@/app/ui/common/common-not-found";

export default function NotFound() {
  return (
    <CommonNotFound text="Голосование не найдено." route={VOTINGS_ROUTE} />
  );
}

import { PERSONS_ROUTE } from "@/routes";
import CommonNotFound from "@/app/ui/common/common-not-found";

export default function NotFound() {
  return <CommonNotFound text="Персонаж не найден." route={PERSONS_ROUTE} />;
}

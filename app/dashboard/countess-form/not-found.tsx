import { SOC_CAP_ROUTE, SOC_CAP_COSTS_ROUTE, COUNTESS_FORM_ROUTE } from "@/routes";
import CommonNotFound from "@/app/ui/common/common-not-found";

export default function NotFound() {
  return <CommonNotFound text="Не найдена сессия голосования графинь." route={COUNTESS_FORM_ROUTE} />;
}

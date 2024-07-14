import { SOC_CAP_ROUTE, SOC_CAP_COSTS_ROUTE } from "@/routes";
import CommonNotFound from "@/app/ui/common/common-not-found";

export default function NotFound() {
  return <CommonNotFound text="Ошибка загрузки данных по ценам на социальный капитал." route={SOC_CAP_COSTS_ROUTE} />;
}

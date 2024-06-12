import { COUNTESS_REQUESTS_ROUTE } from "@/routes";
import CommonNotFound from "@/app/ui/common/common-not-found";

export default function NotFound() {
  return (
    <CommonNotFound text="Заявка не найдена." route={COUNTESS_REQUESTS_ROUTE} />
  );
}

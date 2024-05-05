import { VORHOUSES_ROUTE } from "@/routes";
import CommonNotFound from "@/app/ui/common-not-found";

export default function NotFound() {
  return (
    <CommonNotFound text="Фор семья не найдена." route={VORHOUSES_ROUTE} />
  );
}

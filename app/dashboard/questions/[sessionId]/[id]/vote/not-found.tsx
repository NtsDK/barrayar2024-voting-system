import { SESSIONS_ROUTE } from "@/routes";
import CommonNotFound from "@/app/ui/common/common-not-found";

export default function NotFound() {
  return (
    <CommonNotFound
      text="Голосование или вопрос не найдены."
      route={SESSIONS_ROUTE}
    />
  );
}

import { SOC_CAP_ROUTE } from "@/routes";
import CommonNotFound from "@/app/ui/common/common-not-found";

export default function NotFound() {
  return (
    <CommonNotFound
      text="Ошибка загрузки данных по социальному капиталу."
      route={SOC_CAP_ROUTE}
    />
  );
}

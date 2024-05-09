"use client";

import { updateVorHouseSocialCapital } from "@/app/lib/vorHouseActions";
import CommonSocialCapitalForm from "../common/common-social-capital-form";

type SocialCapitalFormProps = {
  id: string;
  baseNumber: number;
};

export default function SocialCapitalForm({
  id,
  baseNumber,
}: SocialCapitalFormProps) {
  const updateVorHouseSocialCapitalWithId = updateVorHouseSocialCapital.bind(
    null,
    id
  );
  return (
    <CommonSocialCapitalForm
      baseNumber={baseNumber}
      updateFunction={updateVorHouseSocialCapitalWithId}
    />
  );
}

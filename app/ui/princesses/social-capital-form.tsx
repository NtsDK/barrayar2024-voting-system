"use client";

import CommonSocialCapitalForm from "../common/common-social-capital-form";
import { updatePrincessSocialCapital } from "@/app/lib/princessActions";

type SocialCapitalFormProps = {
  id: string;
  baseNumber: number;
  type: "positive" | "negative";
};

export default function SocialCapitalForm({
  id,
  baseNumber,
  type,
}: SocialCapitalFormProps) {
  const updatePrincessSocialCapitalWithId = updatePrincessSocialCapital.bind(
    null,
    id,
    type
  );
  return (
    <CommonSocialCapitalForm
      baseNumber={baseNumber}
      updateFunction={updatePrincessSocialCapitalWithId}
    />
  );
}

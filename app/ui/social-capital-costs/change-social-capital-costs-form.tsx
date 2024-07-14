"use client";

import { equals } from "ramda";
import { useFormState } from "react-dom";
import Link from "next/link";
import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/common/button";
import { createVorHouse, updateVorHouseSocialCapital } from "@/app/lib/vorHouseActions";
import { Person, PersonWithVorHouseTable, VorHousesTable } from "@/app/lib/definitions2";
import { SOC_CAP_ROUTE } from "@/routes";
import PersonSelect from "../common/person-select";
import StringInput from "../common/string-input";
import { State, addVorHouseMember } from "@/app/lib/vorHouseMemberActions";
import { useState } from "react";
import CommonSocialCapitalForm from "../common/common-social-capital-form";
import { AffiliatedCount, SocCapCostsTable, UnaffiliatedCount } from "@/app/lib/voteDefinitions";
import { COUNT_VOTE_REQUEST_I18N } from "@/constants";

async function updateSocCapCostsTable(id: string, prevState: State, formData: FormData) {
  return { message: null, errors: {} };
}

const affiliatedCountTypes: AffiliatedCount[] = [
  "unaffiliated",
  "abstain",
  "forCount",
  "againstCount",
  "answer1",
  "answer2",
];
const unaffiliatedCountTypes: UnaffiliatedCount[] = ["unaffiliated", "forCount", "againstCount", "answer1", "answer2"];

export default function ChangeSocialCapitalCostsForm({ socCapCostsTable }: { socCapCostsTable: SocCapCostsTable }) {
  const initialState = { message: null, errors: {} };
  const updateSocCapCostsTableWithId = updateSocCapCostsTable.bind(null, socCapCostsTable.id);
  const [state, dispatch] = useFormState(updateSocCapCostsTableWithId, initialState);

  const [originalSettings] = useState(socCapCostsTable.settings);
  const [settings, setSettings] = useState(socCapCostsTable.settings);

  return (
    <form action={dispatch}>
      {/* <pre>{JSON.stringify(socCapCostsTable, null, "  ")}</pre> */}
      <div className="flex">
        <table className="m-4 mr-12">
          <thead>
            <tr>
              <th className="w-44 text-left">Свои графы</th>
              <th className="text-left">Цена</th>
            </tr>
          </thead>
          <tbody>
            {affiliatedCountTypes.map((affiliatedCountType) => (
              <tr key={affiliatedCountType}>
                <td>{COUNT_VOTE_REQUEST_I18N[affiliatedCountType]}</td>
                <td>
                  <input
                    value={settings[`affiliated_${affiliatedCountType}`]}
                    onChange={(e) => {
                      let number = settings[`affiliated_${affiliatedCountType}`];
                      try {
                        if (!Number.isNaN(Number(e.target.value))) {
                          number = Number(e.target.value);
                        }
                      } catch {}
                      setSettings({
                        ...settings,
                        [`affiliated_${affiliatedCountType}`]: number,
                      });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="m-4">
          <thead>
            <tr>
              <th className="w-44 text-left">Свободные графы</th>
              <th className="text-left">Цена</th>
            </tr>
          </thead>
          <tbody>
            {unaffiliatedCountTypes.map((unaffiliatedCountType) => (
              <tr key={unaffiliatedCountType}>
                <td>{COUNT_VOTE_REQUEST_I18N[unaffiliatedCountType]}</td>
                {/* <td>{settings[`unaffiliated_${unaffiliatedCountType}`]}</td> */}
                <td>
                  <input
                    value={settings[`unaffiliated_${unaffiliatedCountType}`]}
                    onChange={(e) => {
                      let number = settings[`unaffiliated_${unaffiliatedCountType}`];
                      try {
                        if (!Number.isNaN(Number(e.target.value))) {
                          number = Number(e.target.value);
                        }
                      } catch {}
                      setSettings({
                        ...settings,
                        [`unaffiliated_${unaffiliatedCountType}`]: number,
                      });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        {!equals(originalSettings, settings) && "Изменения не сохранены"}
        <Button type="submit">Обновить цены на соц кап</Button>
      </div>
    </form>
  );
}

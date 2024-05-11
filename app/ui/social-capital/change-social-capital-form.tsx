"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/common/button";
import {
  createVorHouse,
  updateVorHouseSocialCapital,
} from "@/app/lib/vorHouseActions";
import {
  Person,
  PersonWithVorHouseTable,
  VorHousesTable,
} from "@/app/lib/definitions2";
import { SOC_CAP_ROUTE } from "@/routes";
import PersonSelect from "../common/person-select";
import StringInput from "../common/string-input";
import { State, addVorHouseMember } from "@/app/lib/vorHouseMemberActions";
import { useState } from "react";
import CommonSocialCapitalForm from "../common/common-social-capital-form";

export default function ChangeSocialCapitalForm({
  persons,
  vorHouses,
}: {
  persons: PersonWithVorHouseTable[];
  vorHouses: VorHousesTable[];
}) {
  const filteredPersons = persons.filter((person) => person.house_id);
  // house_id всегда будет определен
  const [houseId, setHouseId] = useState<string>(
    filteredPersons[0].house_id || ""
  );
  const house = vorHouses.find((el) => el.id === houseId);
  const baseNumber = house?.social_capital || 0;
  const updateVorHouseSocialCapitalWithId = updateVorHouseSocialCapital.bind(
    null,
    houseId,
    SOC_CAP_ROUTE
  );
  return (
    <div>
      <div className="flex">
        <select
          id="house_id"
          name="house_id"
          className="peer block w-1/2 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 mr-4"
          onChange={(ev) => setHouseId(ev.target.value)}
        >
          {filteredPersons.map((person) => (
            <option key={person.person_id} value={person.house_id || ""}>
              {`${person.person_name} - ${person.house_name}`}
            </option>
          ))}
        </select>

        <CommonSocialCapitalForm
          baseNumber={baseNumber}
          updateFunction={updateVorHouseSocialCapitalWithId}
        />
      </div>
      <div>{`${house?.family_name}: ${baseNumber}`}</div>
    </div>
  );
}

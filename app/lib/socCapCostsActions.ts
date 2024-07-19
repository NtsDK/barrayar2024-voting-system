"use server";

import { z } from "zod";
// import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@/db";
import { SOC_CAP_COSTS_ROUTE } from "@/routes";
import { assertSocCapCostsSettings } from "./voteValidation";

const FormSchema = z.object({
  id: z.string(),
  settings: z.string(),
});

const UpdateSession = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    settings?: string[];
  };
  message?: string | null;
};

export async function updateSocCapCostsTable(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateSession.safeParse({
    settings: formData.get("settings"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Soc Cap Costs.",
    };
  }

  const { settings } = validatedFields.data;

  try {
    const socCapCostsSettings = JSON.parse(settings);
    assertSocCapCostsSettings(socCapCostsSettings);
  } catch (err) {
    console.error("updateSocCapCostsTable", err);
    return {
      // errors: {
      //   settings: [err?]
      // },
      message: "Invalid soc cap costs format. Failed to Update Soc Cap Costs.",
    };
  }

  try {
    await sql`
        UPDATE soc_cap_costs
        SET settings = ${settings}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Soc Cap Costs." };
  }

  revalidatePath(SOC_CAP_COSTS_ROUTE);
  redirect(SOC_CAP_COSTS_ROUTE);
}

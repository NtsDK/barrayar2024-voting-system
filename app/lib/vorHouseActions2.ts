"use server";

import { z } from "zod";
// import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@/db";
import { SOC_CAP_ROUTE } from "@/routes";

const FormSchema = z.object({
  id: z.string(),
  source: z.string(),
  house_name: z.string(),
  recipient_name: z.string(),
  comment: z.string().min(1),
  amount: z.coerce.number(),
  social_capital: z.coerce.number(),
});

const UpdateVorHouseSocCap = FormSchema;

export type State = {
  errors?: {
    // source?: string[] | undefined;
    // house_name?: string[] | undefined;
    // id?: string[] | undefined;
    // social_capital?: string[] | undefined;
    // recipient_name?: string[] | undefined;
    // comment?: string[] | undefined;
    // amount?: string[] | undefined;
  };
  message?: string | null;
};

export async function updateVorHouseSocialCapital2(prevState: State, formData: FormData) {
  // console.log('formData.get("social_capital")', formData.get("social_capital"));
  const validatedFields = UpdateVorHouseSocCap.safeParse({
    id: formData.get("id"),
    source: formData.get("source"),
    house_name: formData.get("house_name"),
    recipient_name: formData.get("recipient_name"),
    comment: formData.get("comment"),
    amount: formData.get("amount"),
    social_capital: formData.get("social_capital"),
  });

  // console.log("updateVorHouse", validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Vor House Social Capital.",
    };
  }

  const { social_capital, amount, comment, house_name, recipient_name, source, id } = validatedFields.data;

  console.log("validatedFields.data", validatedFields.data);
  const timestamp = new Date();

  try {
    await sql.begin((sql) => [
      sql`
        UPDATE vor_houses
        SET
          social_capital = ${social_capital + amount}
        WHERE id = ${id}
      `,
      sql`INSERT INTO soc_cap_log (source, house_name, recipient_name, timestamp, comment, amount, total)
        VALUES (
          ${source},
          ${house_name},
          ${recipient_name},
          ${timestamp},
          ${comment},
          ${amount},
          ${social_capital + amount}
        )`,
    ]);
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Update Vor House Social Capital.",
    };
  }

  revalidatePath(SOC_CAP_ROUTE);
  redirect(SOC_CAP_ROUTE);
}

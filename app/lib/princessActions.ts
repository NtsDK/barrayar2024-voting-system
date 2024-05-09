"use server";

import { z } from "zod";
// import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@/db";
import { PRINCESSES_ROUTE } from "@/routes";

const FormSchema = z.object({
  id: z.string(),
  social_capital: z.coerce.number(),
});

const UpdatePrincessSocialCapital = FormSchema.pick({ social_capital: true });

export type State = {
  errors?: {
    social_capital?: string[];
  };
  message?: string | null;
};

export async function updatePrincessSocialCapital(
  id: string,
  type: "positive" | "negative",
  prevState: State,
  formData: FormData
) {
  // console.log('formData.get("social_capital")', formData.get("social_capital"));
  const validatedFields = UpdatePrincessSocialCapital.safeParse({
    social_capital: formData.get("social_capital"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Princess Social Capital.",
    };
  }

  const { social_capital } = validatedFields.data;

  try {
    if (type === "positive") {
      await sql`
        UPDATE princesses
        SET positive_social_capital = ${social_capital}
        WHERE id = ${id}
      `;
    } else {
      await sql`
        UPDATE princesses
        SET negative_social_capital = ${social_capital}
        WHERE id = ${id}
      `;
    }
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Princess Social Capital.",
    };
  }

  revalidatePath(PRINCESSES_ROUTE);
  redirect(PRINCESSES_ROUTE);
}

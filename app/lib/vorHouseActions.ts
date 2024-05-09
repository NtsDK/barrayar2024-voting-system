"use server";

import { z } from "zod";
// import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@/db";
import { VORHOUSES_ROUTE } from "@/routes";

const FormSchema = z.object({
  id: z.string(),
  family_name: z
    .string({
      invalid_type_error: "Введите фамилию семьи.",
    })
    .min(1),
  count_id: z.string().min(1),
  countess_id: z.string().min(1),
  social_capital: z.coerce.number(),
});

const CreateVorHouse = FormSchema.omit({ id: true });

const UpdateVorHouse = FormSchema.omit({ id: true });

const UpdateVorHouseSocialCapital = FormSchema.pick({ social_capital: true });

export type State = {
  errors?: {
    family_name?: string[];
    count_id?: string[];
    countess_id?: string[];
    social_capital?: string[];
  };
  message?: string | null;
};

export async function createVorHouse(prevState: State, formData: FormData) {
  const validatedFields = CreateVorHouse.safeParse({
    family_name: formData.get("family_name"),
    count_id: formData.get("count_id"),
    countess_id: formData.get("countess_id"),
    social_capital: formData.get("social_capital"),
  });

  // console.log("validatedFields", validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Пропущены необходимые поля. Ошибка создания персонажа.",
    };
  }

  const { family_name, count_id, countess_id, social_capital } =
    validatedFields.data;

  // Test it out:
  // console.log(rawFormData);
  // const amountInCents = amount * 100;
  // const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO vor_houses (family_name, count_id, countess_id, social_capital)
      VALUES (${family_name},${count_id},${countess_id}, ${social_capital})
    `;
  } catch (error) {
    return {
      message: "Ошибка базы данных: не удалось создать форсемью.",
    };
  }

  revalidatePath(VORHOUSES_ROUTE);
  redirect(VORHOUSES_ROUTE);
}

export async function updateVorHouse(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateVorHouse.safeParse({
    family_name: formData.get("family_name"),
    count_id: formData.get("count_id"),
    countess_id: formData.get("countess_id"),
    social_capital: formData.get("social_capital"),
  });

  // console.log("updateVorHouse", validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Vor House.",
    };
  }

  const { family_name, count_id, countess_id, social_capital } =
    validatedFields.data;

  try {
    await sql`
        UPDATE vor_houses
        SET 
          family_name = ${family_name}, 
          count_id = ${count_id}, 
          countess_id = ${countess_id},
          social_capital = ${social_capital}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Vor House." };
  }

  revalidatePath(VORHOUSES_ROUTE);
  redirect(VORHOUSES_ROUTE);
}

export async function updateVorHouseSocialCapital(
  id: string,
  prevState: State,
  formData: FormData
) {
  console.log('formData.get("social_capital")', formData.get("social_capital"));
  const validatedFields = UpdateVorHouseSocialCapital.safeParse({
    social_capital: formData.get("social_capital"),
  });

  // console.log("updateVorHouse", validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Vor House Social Capital.",
    };
  }

  const { social_capital } = validatedFields.data;

  try {
    await sql`
        UPDATE vor_houses
        SET 
          social_capital = ${social_capital}
        WHERE id = ${id}
      `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Vor House Social Capital.",
    };
  }

  revalidatePath(VORHOUSES_ROUTE);
  redirect(VORHOUSES_ROUTE);
}

export async function deleteVorHouse(id: string) {
  // throw new Error("Failed to Delete Invoice");
  try {
    await sql`DELETE FROM vor_houses WHERE id = ${id}`;
    revalidatePath(VORHOUSES_ROUTE);
    return { message: "Deleted Vor House." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Vor House." };
  }
}

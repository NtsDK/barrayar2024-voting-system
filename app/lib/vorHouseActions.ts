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
  // comment: z.string(),
  // customerId: z.string({
  //   invalid_type_error: "Please select a customer.",
  // }),
  // amount: z.coerce
  //   .number()
  //   .gt(0, { message: "Please enter an amount greater than $0." }),
  // status: z.enum(["pending", "paid"], {
  //   invalid_type_error: "Please select an invoice status.",
  // }),
  // date: z.string(),
});

const CreateVorHouse = FormSchema.omit({ id: true });

const UpdateVorHouse = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    family_name?: string[];
    count_id?: string[];
    countess_id?: string[];
  };
  message?: string | null;
};

export async function createVorHouse(prevState: State, formData: FormData) {
  // export async function createInvoice(formData: FormData) {
  const validatedFields = CreateVorHouse.safeParse({
    family_name: formData.get("family_name"),
    count_id: formData.get("count_id"),
    countess_id: formData.get("countess_id"),
    // comment: formData.get("comment"),
    // status: formData.get("status"),
  });

  // console.log("validatedFields", validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Пропущены необходимые поля. Ошибка создания персонажа.",
    };
  }

  const { family_name, count_id, countess_id } = validatedFields.data;

  // Test it out:
  // console.log(rawFormData);
  // const amountInCents = amount * 100;
  // const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO vor_houses (family_name, count_id, countess_id)
      VALUES (${family_name},${count_id},${countess_id})
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
    // comment: formData.get("comment"),
  });

  console.log("updateVorHouse", validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Vor House.",
    };
  }

  const { family_name, count_id, countess_id } = validatedFields.data;

  // const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE vor_houses
        SET family_name = ${family_name}, count_id = ${count_id}, countess_id = ${countess_id}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Vor House." };
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

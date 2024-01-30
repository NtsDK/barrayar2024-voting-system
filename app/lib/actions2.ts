"use server";

import { z } from "zod";
// import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@/db";

const FormSchema = z.object({
  id: z.string(),
  name: z
    .string({
      invalid_type_error: "Введите имя персонажа.",
    })
    .min(1),
  comment: z.string(),
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

const CreatePerson = FormSchema.omit({ id: true });

const UpdatePerson = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    comment?: string[];
    // status?: string[];
  };
  message?: string | null;
};

export async function createPerson(prevState: State, formData: FormData) {
  // export async function createInvoice(formData: FormData) {
  const validatedFields = CreatePerson.safeParse({
    name: formData.get("name"),
    comment: formData.get("comment"),
    // status: formData.get("status"),
  });

  // console.log("validatedFields", validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Пропущены необходимые поля. Ошибка создания персонажа.",
    };
  }

  const { name, comment } = validatedFields.data;

  // Test it out:
  // console.log(rawFormData);
  // const amountInCents = amount * 100;
  // const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO persons (name, comment)
      VALUES (${name}, ${comment})
    `;
  } catch (error) {
    return {
      message: "Ошибка базы данных: не удалось создать персонажа.",
    };
  }

  revalidatePath("/dashboard/persons");
  redirect("/dashboard/persons");
}

export async function updatePerson(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdatePerson.safeParse({
    name: formData.get("name"),
    comment: formData.get("comment"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Person.",
    };
  }

  const { comment, name } = validatedFields.data;

  // const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE persons
        SET name = ${name}, comment = ${comment}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Person." };
  }

  revalidatePath("/dashboard/persons");
  redirect("/dashboard/persons");
}

export async function deletePerson(id: string) {
  // throw new Error("Failed to Delete Invoice");
  try {
    await sql`DELETE FROM persons WHERE id = ${id}`;
    revalidatePath("/dashboard/persons");
    return { message: "Deleted Person." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Person." };
  }
}

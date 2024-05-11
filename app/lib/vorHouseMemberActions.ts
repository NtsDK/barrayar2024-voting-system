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
  house_id: z.string().min(1),
  person_id: z.string().min(1),
});

const AddVorHouseMember = FormSchema;

export type State = {
  errors?: {
    house_id?: string[];
    person_id?: string[];
  };
  message?: string | null;
};

export async function addVorHouseMember(prevState: State, formData: FormData) {
  const validatedFields = AddVorHouseMember.safeParse({
    house_id: formData.get("house_id"),
    person_id: formData.get("person_id"),
  });

  // console.log("validatedFields", validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Ошибка добавления члена семьи.",
    };
  }

  const { house_id, person_id } = validatedFields.data;

  try {
    await sql.begin((sql) => [
      sql`DELETE FROM house_members WHERE house_members.person_id = ${person_id}`,
      sql`INSERT INTO house_members (house_id, person_id)
          VALUES (${house_id},${person_id})`,
    ]);
  } catch (error) {
    return {
      message: "Ошибка базы данных: не удалось создать форсемью.",
    };
  }

  revalidatePath(VORHOUSES_ROUTE);
  return {};
}

export async function deleteVorHouseMember(person_id: string) {
  try {
    await sql`DELETE FROM house_members WHERE person_id = ${person_id}`;
    revalidatePath(VORHOUSES_ROUTE);
    return { message: "Deleted Vor House Member." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Vor House Member." };
  }
}

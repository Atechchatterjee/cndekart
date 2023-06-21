import * as z from "zod";

export const signUpFormSchemaPage1 = z.object({
  name: z.string().min(1),
  email: z
    .string()
    .regex(
      new RegExp(
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
      ),
      {
        message: "Not a valid email address",
      }
    ),
  phone: z.string().min(10, {
    message: "Not a valid phone number",
  }),
  password: z
    .string()
    .regex(new RegExp("^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$"), {
      message:
        "Minimum six characters, at least one uppercase letter, one lowercase letter and one number",
    }),
});

export const signUpFormSchemaPage2 = z.object({
  gst: z
    .string()
    .regex(
      new RegExp("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")
    )
    .optional(),
  pan: z.string().regex(new RegExp("[A-Z]{5}[0-9]{4}[A-Z]{1}")).optional(),
  address: z.string().optional(),
});

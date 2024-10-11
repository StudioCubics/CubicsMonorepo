import { signIn } from "@/auth";
import { register } from "@/lib/authjs/actions";

async function handleRegistration(formData: FormData) {
  "use server";
  // console.log(Object.fromEntries(formData.entries()));
  await register(formData).catch((error) =>
    console.log("Registration Error: ", error.message)
  );
  const res = await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/dashboard",
  });
  // console.log("res", res);
  // redirect("/auth/login");
}
export default function RegisterPage() {
  return (
    <form action={handleRegistration}>
      <label>
        Full Name
        <input name="name" type="text" />
      </label>
      <label>
        Email
        <input name="email" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}

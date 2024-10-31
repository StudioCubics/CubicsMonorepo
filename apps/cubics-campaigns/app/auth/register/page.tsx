import { signIn } from "@/auth";
import { register } from "@/lib/authjs/actions";

async function handleRegistration(formData: FormData) {
  "use server";
  await register(formData).catch((error) => {
    console.error("Registration Error: ", error);
  });
  await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/dashboard",
  });
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

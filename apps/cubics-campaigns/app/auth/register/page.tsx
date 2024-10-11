import { signIn } from "@/auth";
import { register } from "@/lib/authjs/actions";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await register(formData).catch((error) =>
          console.log("Registration Error: ", error.message)
        );
        // await signIn("credentials", formData).catch((error) =>
        //   console.log("Login Error: ", error)
        // );
        redirect("/auth/login");
      }}
    >
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
      <button>Register</button>
    </form>
  );
}

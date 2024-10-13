import { signIn } from "@/auth";

async function handleLogin(formData: FormData) {
  "use server";
  // console.log(Object.fromEntries(formData.entries()));
  await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/dashboard",
  });
  // console.log("res", res);
}

export default function SignIn() {
  return (
    <div>
      <form action={handleLogin}>
        <label>
          Email
          <input name="email" type="text" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Login</button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    </div>
  );
}

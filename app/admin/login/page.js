import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth";

export const metadata = {
  title: "Admin Login | Monarch Portfolio System"
};

async function loginAction(formData) {
  "use server";

  await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/admin"
  });
}

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="system-pill">[ ADMIN ACCESS ]</span>
        <h1>Enter the Control Center</h1>
        <p>Sign in to manage content, recalculate progression, and publish updates to the Monarch system.</p>
        <form action={loginAction} className="auth-form">
          <input name="email" type="email" placeholder="Admin email" required />
          <input name="password" type="password" placeholder="Password" required />
          <button type="submit">Authenticate</button>
        </form>
      </div>
    </main>
  );
}

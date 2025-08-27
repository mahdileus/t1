
import { redirect } from "next/navigation";
import Sidebar from "../module/p-admin/Sidebar";
import Topbar from "../module/p-admin/Topbar";
import { authUser } from "@/app/utils/auth-server";


export default async function AdminDashboardLayout({ children }) {
  const user = await authUser();

  if (!user) {
    return redirect("/admin-login");
  }


  return (
    <div className="flex h-screen bg-cream text-primary font-yekan-bakh">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6 overflow-auto">{children}</div>
      </main>
    </div>
  );
}

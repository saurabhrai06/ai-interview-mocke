export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 overflow-hidden">
      {children}
    </div>
  );
}

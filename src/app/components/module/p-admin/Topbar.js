

export default async function Topbar() {
  const now = new Date();

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const persianDate = now.toLocaleDateString("fa-IR", options);


  return (
    <header className="flex font-yekan-bakh justify-between items-center p-4 border-b border-primary bg-white">
      <h2 className="text-primary text-sm md:text-base">ادمین عزیز به وبسایت خودت خوش اومدی.</h2>
      <h3 className="text-primary text-sm md:text-base">{persianDate}</h3>
    </header>
  );
}

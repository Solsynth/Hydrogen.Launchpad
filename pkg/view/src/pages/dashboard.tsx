import { useUserinfo } from "../stores/userinfo.tsx";

export default function DashboardPage() {
  const userinfo = useUserinfo();

  function getGreeting() {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 12) {
      return "Good morning! Wishing you a day filled with joy and success. ☀️";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon! Hope you have a productive and joyful afternoon! ☀️";
    } else {
      return "Good evening! Wishing you a relaxing and pleasant evening. 🌙";
    }
  }

  return (
    <div class="max-w-[720px] mx-auto pt-12">
      <div id="greeting" class="px-5">
        <h1 class="text-2xl font-bold">{userinfo?.displayName}</h1>
        <p>{getGreeting()}</p>
      </div>

      <div id="applications" class="mt-5">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {/* TODO Put something special here */}
        </div>
      </div>
    </div>
  );
}
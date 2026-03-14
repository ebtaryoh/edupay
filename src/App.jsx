// export default function App() {
//   return (
//     <div className="min-h-screen grid place-items-center bg-black text-white">
//       <h1 className="text-4xl font-bold">Tailwind is working 🚀</h1>
//     </div>
//   );
// }
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <main className="min-h-screen">
      <AppRoutes />{" "}
    </main>
  );
}

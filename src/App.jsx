import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { parseJwt } from "./api/http";

export default function App() {
  useEffect(() => {
    // Session Repair: Ensure studentId and matricNo are in localStorage if we have a token
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "student") {
      const studentId = localStorage.getItem("studentId");
      const matricNo = localStorage.getItem("matricNo");

      if (!studentId || !matricNo) {
        console.log(">>> ATTEMPTING SESSION REPAIR FROM JWT...");
        const decoded = parseJwt(token);
        if (decoded) {
          console.log(">>> DECODED TOKEN KEYS:", Object.keys(decoded));
          // Try common claim names for student ID and matric No
          const resolvedId =
            decoded.uid ||
            decoded.studentId ||
            decoded.studentID ||
            decoded.id ||
            decoded.Id ||
            decoded.ID ||
            decoded.userId ||
            decoded.UserId ||
            decoded.nameid ||
            decoded.sub ||
            decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

          const resolvedMatric =
            decoded.matricNo ||
            decoded.matriculationNo ||
            decoded.ucode ||
            decoded.unique_name ||
            decoded.email ||
            decoded.emailAddress ||
            decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

          if (resolvedId && !studentId) {
            console.log(">>> REPAIRED STUDENT ID:", resolvedId);
            localStorage.setItem("studentId", String(resolvedId));
          } else if (!resolvedId) {
            console.warn(">>> COULD NOT RESOLVE STUDENT ID FROM TOKEN. DECODED:", decoded);
          }

          if (resolvedMatric && !matricNo) {
            console.log(">>> REPAIRED MATRIC NO:", resolvedMatric);
            localStorage.setItem("matricNo", String(resolvedMatric));
          }
          
          // Force a state update in App to trigger re-renders if necessary, 
          // but usually a next-nav or refresh is needed for localStorage to propagate if not using a hook.
        } else {
          console.error(">>> FAILED TO DECODE JWT TOKEN");
        }
      }
    }
  }, []);

  return (
    <main className="min-h-screen">
      <AppRoutes />{" "}
    </main>
  );
}

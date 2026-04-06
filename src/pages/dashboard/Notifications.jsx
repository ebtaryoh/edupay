import { useEffect, useState } from "react";
import { Bell, ChevronRight, RefreshCw } from "lucide-react";
import { notificationApi } from "../../api/notification";

function NoticeRow({ title, desc, isRead = false }) {
  return (
    <div
      className={[
        "w-full flex items-center justify-between px-5 py-5 rounded-[22px] border transition",
        isRead
          ? "bg-white border-[#E7E9FF]"
          : "bg-[#F0EEFF] border-[#D2C9FF]",
      ].join(" ")}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative w-14 h-14 shrink-0 rounded-2xl bg-[#EEF0FF] flex items-center justify-center text-[#2C14DD]">
          <Bell size={26} strokeWidth={2} />
          {!isRead && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#FF6A6A]" />
          )}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-[#14143A] truncate">{title}</p>
          <p className="text-sm text-[#6B6B85] mt-1 line-clamp-2">{desc}</p>
        </div>
      </div>
      <ChevronRight size={22} color="#9AA0B4" strokeWidth={2.5} className="shrink-0 ml-3" />
    </div>
  );
}

export default function Notifications() {
  const studentId = localStorage.getItem("studentId") || "";

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studentId) {
      setLoading(false);
      return;
    }

    async function fetchNotifications() {
      try {
        setLoading(true);
        setError(null);
        const res = await notificationApi.getByUserId(studentId);
        const data = res?.data || res;
        setNotices(Array.isArray(data) ? data : data ? [data] : []);
      } catch (err) {
        console.error("FAILED TO FETCH NOTIFICATIONS:", err);
        setError("Could not load notifications.");
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, [studentId]);

  const content = (() => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <RefreshCw size={32} className="text-[#2C14DD] animate-spin" />
          <p className="text-sm text-[#9AA0B4]">Loading notifications...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <Bell size={36} className="text-[#E7E9FF]" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      );
    }

    if (notices.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <Bell size={48} strokeWidth={1.5} className="text-[#E7E9FF]" />
          <p className="text-sm text-[#9AA0B4]">No notifications yet.</p>
          <p className="text-xs text-[#C5C9D8]">
            You&apos;ll see payment alerts and school updates here.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {notices.map((n, i) => (
          <NoticeRow
            key={n.id || i}
            title={n.name || n.title || "Notification"}
            desc={n.message || n.description || n.details || "No additional details."}
            isRead={n.isRead ?? false}
          />
        ))}
      </div>
    );
  })();

  return (
    <div className="max-w-[780px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] font-extrabold text-[#14143A] tracking-tight">
          Inbox
          {notices.length > 0 && (
            <span className="ml-2 text-[15px] font-semibold text-[#2C14DD]">
              ({notices.length})
            </span>
          )}
        </h2>
        {notices.length > 0 && (
          <button className="text-xs font-semibold text-[#2C14DD] hover:underline">
            Mark all as read
          </button>
        )}
      </div>

      {content}
    </div>
  );
}

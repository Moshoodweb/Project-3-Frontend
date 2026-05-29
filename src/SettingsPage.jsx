import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const defaultDashboardSettings = {
  orderNotifications: true,
  promoEmails: false,
  promoSMS: false,
  soundAlerts: true,
};

const settingsSections = [
  {
    title: "Notifications",
    description: "Control how Moshood Foods keeps you updated.",
    items: [
      { key: "orderNotifications", label: "Order updates", helper: "Get alerts when an order changes status." },
      { key: "soundAlerts", label: "Sound alerts", helper: "Play a subtle sound for key order events." },
    ],
  },
  {
    title: "Communication",
    description: "Choose how you hear about offers and menu drops.",
    items: [
      { key: "promoEmails", label: "Promo emails", helper: "Receive weekly offers, bundles, and discounts." },
      { key: "promoSMS", label: "Promo SMS", helper: "Get special deals and menu updates via SMS." },
    ],
  },
];

export default function SettingsPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(() => {
    if (typeof window === "undefined") {
      return defaultDashboardSettings;
    }

    try {
      const savedSettings = window.localStorage.getItem("moshood-dashboard-settings");
      return savedSettings ? { ...defaultDashboardSettings, ...JSON.parse(savedSettings) } : defaultDashboardSettings;
    } catch {
      return defaultDashboardSettings;
    }
  });

  useEffect(() => {
    window.localStorage.setItem("moshood-dashboard-settings", JSON.stringify(settings));
  }, [settings]);

  // derive avatar from saved registration (keeps avatar consistent across pages)
  const registrationData = (() => {
    try {
      const saved = window.localStorage.getItem("moshood-registration");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  })();
  const storedLastName = registrationData?.lastName || window.localStorage.getItem("registeredLastName")?.trim();
  const avatarInitial = (storedLastName?.trim()?.charAt(0) || "M").toUpperCase();
  const avatarPalette = [
    { background: "linear-gradient(135deg, #0f766e, #14b8a6)", color: "#fff" },
    { background: "linear-gradient(135deg, #b45309, #f59e0b)", color: "#fff" },
    { background: "linear-gradient(135deg, #1d4ed8, #38bdf8)", color: "#fff" },
    { background: "linear-gradient(135deg, #7c2d12, #ef4444)", color: "#fff" },
    { background: "linear-gradient(135deg, #3f6212, #84cc16)", color: "#fff" },
  ];
  const avatarTheme = avatarPalette[avatarInitial.charCodeAt(0) % avatarPalette.length];

  const handleResetDefaults = () => {
    setSettings(defaultDashboardSettings);
    window.localStorage.setItem("moshood-dashboard-settings", JSON.stringify(defaultDashboardSettings));
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(0, 107, 63, 0.16), transparent 34%), radial-gradient(circle at bottom right, rgba(255, 211, 26, 0.18), transparent 24%), #f7faf8",
        color: "#1c1b1b",
      }}
    >
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 20px 56px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            style={{
              border: "1px solid #d6d3d1",
              background: "rgba(255,255,255,0.88)",
              color: "#1c1b1b",
              borderRadius: 999,
              padding: "10px 16px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
            }}
          >
            Back to dashboard
          </button>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#006b3f" }}>
              Settings
            </p>
            <p style={{ margin: "4px 0 0", fontSize: 14, color: "#3e4a41" }}>
              Personalize how Moshood Foods behaves.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 0.7fr",
            gap: 20,
            alignItems: "start",
          }}
        >
          <div
            style={{
              padding: 28,
              borderRadius: 28,
              background: "rgba(255,255,255,0.82)",
              border: "1px solid rgba(214, 211, 209, 0.7)",
              boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
              backdropFilter: "blur(14px)",
            }}
          >
            <div style={{ marginBottom: 26 }}>
              <h1 style={{ margin: 0, fontSize: 36, lineHeight: 1.05, letterSpacing: "-0.03em" }}>Settings that feel like part of the app.</h1>
              <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.7, color: "#3e4a41", maxWidth: 620 }}>
                Change notification behavior, adjust the layout, and keep your preferences saved locally so the dashboard opens the way you like it.
              </p>
            </div>

            <div style={{ display: "grid", gap: 18 }}>
              {settingsSections.map((section) => (
                <section
                  key={section.title}
                  style={{
                    padding: 20,
                    borderRadius: 22,
                    background: "#fff",
                    border: "1px solid #e7e5e4",
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: 18 }}>{section.title}</h2>
                  <p style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.6, color: "#3e4a41" }}>{section.description}</p>

                  <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
                    {section.items.map((item) => (
                      <label
                        key={item.key}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 16,
                          padding: 16,
                          borderRadius: 18,
                          background: "#f8faf8",
                          border: "1px solid #edf2ee",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ display: "grid", gap: 4 }}>
                          <span style={{ fontSize: 14, fontWeight: 800 }}>{item.label}</span>
                          <span style={{ fontSize: 12, color: "#3e4a41", lineHeight: 1.5 }}>{item.helper}</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={settings[item.key]}
                          onChange={(event) =>
                            setSettings((currentSettings) => ({
                              ...currentSettings,
                              [item.key]: event.target.checked,
                            }))
                          }
                          style={{ width: 18, height: 18, accentColor: "#006b3f" }}
                        />
                      </label>
                    ))}
                  </div>
                </section>
              ))}
              <button
                type="button"
                onClick={handleResetDefaults}
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  marginTop: 12,
                  borderRadius: 18,
                  background: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                  color: "#666",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#e5e7eb";
                  e.target.style.color = "#1c1b1b";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#f3f4f6";
                  e.target.style.color = "#666";
                }}
              >
                Reset to Defaults
              </button>
            </div>
          </div>

          <aside
            style={{
              position: "sticky",
              top: 20,
              padding: 24,
              borderRadius: 28,
              background: "linear-gradient(180deg, rgba(0,107,63,0.95), rgba(0,135,81,0.92))",
              color: "#fff",
              boxShadow: "0 26px 50px rgba(0, 107, 63, 0.26)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div
                aria-hidden
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 800,
                  background: avatarTheme.background,
                  color: avatarTheme.color,
                }}
              >
                {avatarInitial}
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.9 }}>Active profile</p>
                <p style={{ margin: "6px 0 0", fontSize: 16, fontWeight: 800, lineHeight: 1.05 }}>{(registrationData?.firstName || registrationData?.lastName) ? `${registrationData?.firstName || ""} ${registrationData?.lastName || ""}`.trim() : "Moshood User"}</p>
              </div>
            </div>
            <h3 style={{ margin: "10px 0 0", fontSize: 24, lineHeight: 1.08 }}>Your preferences stay local to this browser.</h3>
            <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.7, opacity: 0.9 }}>
              This page keeps the settings focused, explicit, and easy to return to without covering the dashboard.
            </p>

            <div style={{ marginTop: 22, display: "grid", gap: 12 }}>
              <button
                type="button"
                onClick={() => setSettings(defaultDashboardSettings)}
                style={{
                  width: "100%",
                  border: "none",
                  background: "rgba(255,255,255,0.16)",
                  color: "#fff",
                  borderRadius: 16,
                  padding: "12px 16px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Reset defaults
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                style={{
                  width: "100%",
                  border: "none",
                  background: "#fff",
                  color: "#006b3f",
                  borderRadius: 16,
                  padding: "12px 16px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Return to dashboard
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

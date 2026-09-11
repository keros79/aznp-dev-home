"use client";

import { useI18nStore } from "@/store/i18nStore";
import { dictionaries } from "@/i18n/dictionaries";

interface EcosystemItem {
  icon: string;
  title: string;
  desc: string;
  badge?: string;
}

export default function SupportedEcosystems() {
  const { lang } = useI18nStore();
  const t = dictionaries[lang].supportedEcosystems;

  const baseItems: EcosystemItem[] = [
    { icon: "🪪", title: t.base1Title, desc: t.base1Desc },
    { icon: "🪙", title: t.base2Title, desc: t.base2Desc },
    { icon: "🛠️", title: t.base3Title, desc: t.base3Desc, badge: t.base3Badge },
  ];

  const renderCard = (chainTitle: string, chainBadge: string, chainSub: string, items: EcosystemItem[], badgeClass: string) => (
    <div className="glass-card" style={{ padding: "1.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap", marginBottom: "0.25rem" }}>
        <h3 style={{ fontWeight: 800, fontSize: "1.375rem", margin: 0, color: "var(--color-slate-50)" }}>
          {chainTitle}
        </h3>
        <span className={`badge ${badgeClass}`}>{chainBadge}</span>
      </div>
      <p style={{ fontSize: "0.875rem", color: "var(--color-slate-400)", margin: "0.5rem 0 1.25rem" }}>
        {chainSub}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li
            key={item.title}
            style={{
              display: "flex",
              gap: "0.625rem",
              alignItems: "flex-start",
              padding: "0.875rem",
              borderRadius: "0.75rem",
              background: "rgba(99,102,241,0.05)",
              border: "1px solid rgba(148,163,184,0.18)",
              marginBottom: "0.75rem",
            }}
          >
            <span style={{ fontSize: "1rem", lineHeight: 1 }}>{item.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-slate-50)" }}>
                {item.title}
                {item.badge ? (
                  <span className="badge badge-purple" style={{ fontSize: "0.6875rem" }}>{item.badge}</span>
                ) : null}
              </div>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-slate-400)", lineHeight: 1.6, margin: "0.25rem 0 0" }}>
                {item.desc}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section
      style={{
        padding: "6rem 0",
        background: "linear-gradient(to bottom, transparent, rgba(34,211,238,0.03), transparent)",
      }}
    >
      <div className="section-wrapper">
        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="badge badge-cyan" style={{ marginBottom: "1rem" }}>{t.badge}</span>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>
            {t.titleLine1}
            <br />
            <span className="text-gradient">{t.titleLine2}</span>
          </h2>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        {/* 체인 카드 */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", maxWidth: "720px", margin: "0 auto", gap: "1.5rem" }}
          className="ecosystems-grid"
        >
          {renderCard(t.baseTitle, t.baseBadge, t.baseSub, baseItems, "badge-purple")}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ecosystems-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
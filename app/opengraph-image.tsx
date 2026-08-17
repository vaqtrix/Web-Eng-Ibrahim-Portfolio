import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background:
            "radial-gradient(900px 500px at 20% 10%, #241a5e, #05060e 60%)",
          color: "#E9EDFB",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 8, color: "#35E6E0" }}>
          {`${profile.role.toUpperCase()} · KARACHI`}
        </div>
        <div
          style={{
            fontSize: 82,
            fontWeight: 700,
            marginTop: 26,
            lineHeight: 1.02,
            maxWidth: 940,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: 26,
            color: "#8B93B6",
            maxWidth: 880,
          }}
        >
          {profile.headline}
        </div>
        <div
          style={{
            display: "flex",
            gap: 34,
            marginTop: 54,
            fontSize: 22,
            color: "#FFC46B",
            letterSpacing: 3,
          }}
        >
          <span>AGROSENSE</span>
          <span style={{ color: "#7C5CFF" }}>//</span>
          <span>INFINETECK</span>
          <span style={{ color: "#7C5CFF" }}>//</span>
          <span>VAQTRIX</span>
        </div>
      </div>
    ),
    size,
  );
}

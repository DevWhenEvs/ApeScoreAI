import { Suspense } from "react";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Navbar from "@/components/Navbar/Navbar";

import "./globals.css";

export const metadata = {
  title: "ApeScoreAI: Your Solana Blockchain Credit Score",
  description: "Gamified credit scoring for trading success, wallet activity, and risk-taking behavior on Solana. Connect your wallet, get scored, earn $APE rewards.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <ProgressBar />
        </Suspense>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

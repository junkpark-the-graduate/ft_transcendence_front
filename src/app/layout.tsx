import "../styles/globals.css";
import styles from "../styles/layout.module.css";
import { Providers } from "./providers";

export const metadata = {
  title: "ft_transcendence",
  description: "ft_transcendence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.container}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

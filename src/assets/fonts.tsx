import {
  Geist,
  Geist_Mono,
  Poppins,
  Montserrat,
  Roboto,
  Rubik,
  Raleway,
  Lato,
  Bebas_Neue,
  DM_Sans,
  Be_Vietnam_Pro,
  Manrope,
  Urbanist,
} from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
});

export const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500"],
});

export const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
});

export const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const bebas_Neue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const be_Vietnam_Pro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

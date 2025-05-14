import StoreProvider from "@/store/StoreProvider";
import "@/styles/globals.scss";
import DefaultLayout from "@/components/layouts/DefaultLayout";

import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  title: "REST Countries API",
  description: "Frontend Mentor Challenge",
};

export default function RootLayout({ children }) {

  return (
    <>
      <StoreProvider>

        <DefaultLayout>
          {children}
        </DefaultLayout>

      </StoreProvider>

      {/* <GoogleAnalytics gaId="G-422226RLK6" /> */}
      <GoogleAnalytics gaId="G-HZE71CQT7R" />
    </>
  );
}

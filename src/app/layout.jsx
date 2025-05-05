import StoreProvider from "@/store/StoreProvider";
import "@/styles/globals.scss";
import DefaultLayout from "@/components/layouts/DefaultLayout";

export const metadata = {
  title: "REST Countries API",
  description: "Frontend Mentor Challenge",
};

export default function RootLayout({ children }) {

  return (
    <StoreProvider>

      <DefaultLayout>
        {children}
      </DefaultLayout>

    </StoreProvider>
  );
}

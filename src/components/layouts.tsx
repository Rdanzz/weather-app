import { PropsWithChildren } from "react";
import Header from "./header";

const Layouts = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur py-8 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WeatherApp by{" "}
            <span className="font-semibold">ziidhan.rraffly_</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layouts;

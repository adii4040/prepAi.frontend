import type { PropsWithChildren } from "react";

import { Navbar, Footer } from "../components";

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {

    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="sticky top-0 bg-white z-30">
                <Navbar />
            </div>
            <main className={`bg-primary-50 flex-1 w-full mx-auto `}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

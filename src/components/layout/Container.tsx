import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
      {children}
    </div>
  );
}


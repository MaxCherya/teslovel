import type { ReactNode } from "react";

export default function MainContainer({ children }: { children: ReactNode }) {
    return (
        <div className="max-w-5xl">
            {children}
        </div>
    )
}
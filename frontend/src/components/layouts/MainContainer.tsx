import type { ReactNode } from "react";

export default function MainContainer({ children }: { children: ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}
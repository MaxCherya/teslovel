import type { ReactNode } from "react";

export default function MainContainer({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <div className={`w-full max-w-5xl ${className}`}>
            {children}
        </div>
    )
}
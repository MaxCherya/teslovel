import type { ReactNode } from "react";

export default function Grid({ children, cols = 2, className = '' }: { children: ReactNode, cols?: number, className?: string }) {
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-${cols} gap-4 ${className}`}>
            {children}
        </div>
    )
}
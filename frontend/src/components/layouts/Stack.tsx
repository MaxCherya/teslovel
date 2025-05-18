import type { ReactNode } from "react"

export default function Stack({ children, gap = 4 }: { children: ReactNode, gap?: number }) {
    return <div className={`flex flex-col gap-${gap}`}>{children}</div>
}
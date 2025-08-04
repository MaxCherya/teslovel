import type { ReactNode } from "react";
import { useMediaQuery } from 'usehooks-ts'

export default function ResponsiveWrapper({ minWidth = 768, children, }: { minWidth?: number, children: ReactNode }) {
    const isVisible = useMediaQuery(`(min-width: ${minWidth}px)`)
    return <>{isVisible ? children : null}</>
}
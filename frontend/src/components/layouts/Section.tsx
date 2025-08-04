import type { ReactNode } from "react";

interface SectionProps {
    children: ReactNode,
    title: string,
    description?: string,
    className?: string,
}

export default function Section({ children, title, description, className = '' }: SectionProps) {
    return (
        <section className={`py-8 space-y-4 ${className}`}>
            {title && <h2 className="text-2xl font-semibold">{title}</h2>}
            {description && <p className="text-gray-500">{description}</p>}
            {children}
        </section>
    )
}
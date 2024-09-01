import ReactMarkdown from 'react-markdown'

interface MarkdownProps {
    children: string
}

export default function Markdown({ children }: MarkdownProps) {
    return (
        <ReactMarkdown className="space-y-3" components={{
            ul: ({ children }) => <ul className="list-disc list-inside">{children}</ul>,
            a: ({ children, href }) => <a href={href} target="_blank" className="text-green-500 hover:underline">{children}</a>
        }}>
            {children}
        </ReactMarkdown>
    )
}
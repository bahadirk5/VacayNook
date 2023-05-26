interface PostProps {
  children?: React.ReactNode
}

export default function PostLayout({ children }: PostProps) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">
      {children}
    </div>
  )
}

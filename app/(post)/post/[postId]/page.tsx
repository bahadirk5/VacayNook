interface PostPageProps {
  params: { postId: string }
}

export default function PostPage({ params }: PostPageProps) {
  return <div>{params.postId}</div>
}

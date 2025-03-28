type Props = {
    params: Promise<{ id: string }>
}

export default async function Country({ params }: Props) {
    const { id } = await params;
    return <span>Country page: {id}</span>
}

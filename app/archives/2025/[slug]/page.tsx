import RenderQuestions from "./renderQuestions";

export default async function CategoryQuesitons({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  return (
    <RenderQuestions slug={slug} />
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStoryBySlug, getAllStories } from "@/data/stories";
import { StoryReader } from "@/components/reader/story-reader";

export const instant = false;

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const stories = getAllStories();
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return {
      title: "Story Not Found — ShiftNews",
    };
  }

  return {
    title: `${story.title} — ShiftNews`,
    description: story.subtitle,
    openGraph: {
      title: story.title,
      description: story.subtitle,
      type: "article",
      authors: [story.author],
    },
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return <StoryReader story={story} />;
}

import type { Metadata } from 'next';
import { VideoRoom } from '@/components/VideoRoom';
import { edits } from '@/content/site';

export const metadata: Metadata = { title: 'Edits', description: 'Watch Tony Woodland skate: Rollerblade and SK Films edits.' };

export default function EditsPage() {
  return (
    <div className="bg-ink pt-16 md:pt-20">
      <VideoRoom title="Edits" edits={edits} headingLevel={1} />
    </div>
  );
}

import { SendToBack } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface EmptyCategoryProps {
  categoryName?: string;
}

const EmptyCategory = ({ categoryName }: EmptyCategoryProps) => {
  return (
    <div className="text-center py-24 space-y-8">
      <div className="relative mx-auto w-32 h-32">
        {/* Decorative rings */}
        <div className="absolute inset-0 border border-primary/20 rounded-full animate-pulse" />
        <div className="absolute inset-2 border border-primary/30 rounded-full" />
        <div className="absolute inset-4 border border-primary/40 rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <SendToBack className="w-12 h-12 text-primary" />
        </div>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <h2 className="font-serif text-3xl text-foreground">
          <span className="gold-gradient-text">Coming Soon</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {categoryName
            ? `Our ${categoryName} collection is being carefully curated. Be the first to discover our upcoming exclusive pieces.`
            : 'New exclusive pieces are being carefully curated for this collection. Stay tuned for something extraordinary.'}
        </p>
      </div>

      <div className="luxury-divider" />

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button asChild variant="luxuryOutline" size="luxuryLg">
          <Link to="/">Explore Other Collections</Link>
        </Button>
      </div>
    </div>
  );
};

export default EmptyCategory;

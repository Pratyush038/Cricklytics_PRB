import { PageHeader } from '@/components/ui/page-header';
import DashboardClientWrapper from '@/components/dashboard/dashboard-client-wrapper';

export default async function DashboardPage() {

  return (
    <>
      <PageHeader
        title="Player Analysis"
        description="Analyse cricket player performance with AI-powered insights from pre-trained models"
      >
      </PageHeader>
      <div className="mt-8">
        <DashboardClientWrapper />
      </div>
    </>
  );
}


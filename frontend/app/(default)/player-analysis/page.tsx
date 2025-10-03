import { PageHeader } from '@/components/ui/page-header';
import DashboardClientWrapper from '@/components/dashboard/dashboard-client-wrapper';

export default async function DashboardPage() {

  return (
    <>
      <div className="bg-neutral-light text-neutral-dark p-6 rounded-2xl shadow-lg">
        <PageHeader
          title="Player Analysis"
          description="Explore AI-driven insights to analyze cricket player performance and classify roles"
        />
      </div>

      <div className="mt-8 p-6">
        <DashboardClientWrapper />
      </div>
          </>
  );
}


import StatCard from '../components/common/StatCard';

type Props = { businessCount: number; leadCount: number };

export default function DashboardPage({ businessCount, leadCount }: Props) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    <StatCard title="Total Businesses" value={businessCount} />
    <StatCard title="Total Leads" value={leadCount} />
    <StatCard title="Generated Assets" value={42} />
    <StatCard title="Pending Tasks" value={8} />
  </div>;
}

type Props = { title: string; value: string | number };

export default function StatCard({ title, value }: Props) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-slate-800">{value}</p>
    </div>
  );
}

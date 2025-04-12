export function StatCard({ title, value }) {
    return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl text-gray-700 mb-2">{title}</h2>
        <p className="text-5xl font-bold text-gray-800">{value}</p>
    </div>
    )
}
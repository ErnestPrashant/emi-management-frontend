export function LoansTable({loans}){
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-blue-500 text-white p-4">
            <h2 className="text-xl font-bold">Loans</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">EMI Amount</th>
                  <th className="py-3 px-4 text-left">Remaining amount </th>
                </tr>
              </thead>
              <tbody>
                {loans.map(loan => (
                  <tr key={loan.id} className="border-b">
                    <td className="py-3 px-4">{loan._id}</td>
                    <td className="py-3 px-4">{loan.monthlyEMI}</td>
                    <td className="py-3 px-4">{loan.remainingBalance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
}
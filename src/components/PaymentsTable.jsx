export function PaymentsTable({payments}){
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-blue-500 text-white p-4">
            <h2 className="text-xl font-bold">Payments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Amount Paid</th>
                  <th className="py-3 px-4 text-left">Date Paid</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment.id} className="border-b">
                    <td className="py-3 px-4">{payment._id}</td>
                    <td className="py-3 px-4">{payment.amountPaid}</td>
                    <td className="py-3 px-4">{new Date(payment.datePaid).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
}
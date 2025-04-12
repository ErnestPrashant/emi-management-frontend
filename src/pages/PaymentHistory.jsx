import { useState } from 'react';
import axios from 'axios';

export function PaymentHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [paymentInfo, setPaymentInfo] = useState({
    amountPaid : '',
    loanId : ''
  })

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
        setLoading(true);
        return;
    }
    setHasSearched(true);
    setError(null);
    
    try {
      // Simulate network delay
      const response = await axios.get(`http://localhost:4500/api/payments/${searchQuery}`);      
      const data = response.data;
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setError('Could not find payments for this loan ID');
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMakePayment = () => {
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const response = await axios.post('http://localhost:4500/api/payments/pay',paymentInfo)
    const data = response.data
    console.log(data);

    }
    catch(error){
      console.log(`inside error block of making payments with error ${error}`)
    }
  }

  const handleCloseModal = async () => {
    setPaymentInfo({amountPaid:'',loanId:''})
    setShowModal(false)
  }

  const handleInputChange = (e) => {
    setPaymentInfo({...paymentInfo,[e.target.name] : e.target.value})
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex items-center">
          {/* YouTube-style search box */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search payments by Loan ID..."
              className="w-full py-3 px-4 pr-12 text-lg border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Search button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-r-full text-lg font-medium border border-blue-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>
      <div className="mb-6">
                <button
                     onClick={handleMakePayment}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded text-xl"
                >
                    Make Payment
                </button>
            </div>

      {/* Results Section */}
      <div className="bg-white rounded-lg ">
        {loading ? (
          <div className="flex justify-center items-center py-16">
          </div>
        ) : hasSearched ? (
          <>
            <div className="border-b p-4">
              <h2 className="text-xl font-semibold">
                {error ? 'No Results Found' : `Payments for Loan ID: ${searchQuery}`}
              </h2>
            </div>
            
            {error ? (
              <div className="p-8 text-center text-gray-500">
                {error}
              </div>
            ) : payments.length > 0 ? (
              <div className="divide-y">
                {(payments).map(payment => (
                  <div key={payment.loanId} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Loan ID: {payment.loanId}</h3>
                        <p className="text-gray-500">Date Paid: {new Date(payment.datePaid).toLocaleString()}</p>
                      </div>
                      <div className="text-xl font-semibold">{payment.amountPaid}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No payments found for this loan ID.
              </div>
            )}
          </>
        ) : (
          <div className="p-8 text-center text-gray-500">
            Search for a loan ID to see payment history.
          </div>
        )}
      </div>
      {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Make Payment for your Loan</h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amountPaid">
                                    Amount to Pay
                                </label>
                                <input
                                    type="number"
                                    id="amountPaid"
                                    name="amountPaid"
                                    value={paymentInfo.principal}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter amount"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loanId">
                                    Loan Id
                                </label>
                                <input
                                    type="text"
                                    id="loanId"
                                    name="loanId"
                                    value={paymentInfo.loanId}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter Loan Id"
                                    required
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
    </div>
  );
}


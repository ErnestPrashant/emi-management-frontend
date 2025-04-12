import { useState, useEffect } from 'react'
import axios from 'axios'

export const LoanList = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const loanId = "67c877fff1c185f7fb85dbdd";
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(0)
    const [newLoan, setNewLoan] = useState({
        userId : '67c877fff1c185f7fb85dbdd',
        principal: '',
        annualInterestRate: '15',
        tenure: ''
    })

    useEffect(() => {
        const fetchloans = async () => {
            try {
                const response = await axios.get('http://localhost:4500/api/loans/' + loanId)
                setLoans(response.data);
            }
            catch (error) {
                console.log('error fetching loans' + error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchloans();
    },[refresh])

    function handleOpenModal() {
        setShowModal(true);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:4500/api/loans/apply',newLoan,{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const data = response.data;
            setRefresh((prev) => prev+1);
            const response1 = await axios.get('http://localhost:4500/api/loans/' + loanId)
            setLoans(response1.data);
        }
        catch(error){
            console.log(`error creating new loan ${error}`)
        }
    }
    function handleCloseModal(){
        setShowModal(false);
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewLoan({...newLoan,[name]: value})
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-5xl font-bold text-gray-800 mb-8">Loan List</h1>

            <div className="mb-6">
                <button
                    onClick={handleOpenModal}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded text-xl"
                >
                    New Loan
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center my-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            ) : (
                <div className="border rounded">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="py-4 px-6 text-left text-xl font-bold">Amount</th>
                                <th className="py-4 px-6 text-left text-xl font-bold">Start Date</th>
                                <th className="py-4 px-6 text-left text-xl font-bold">Remaining Balance</th>
                                <th className="py-4 px-6 text-left text-xl font-bold">Loan Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan.id} className="border-b">
                                    <td className="py-6 px-6 text-xl">{loan.principal}</td>
                                    <td className="py-6 px-6 text-xl">{new Date(loan.startDate).toLocaleString()}</td>
                                    <td className="py-6 px-6 text-xl">{loan.remainingBalance}</td>
                                    <td className="py-6 px-6 text-xl">{loan._id}</td>
                                    {/* <td className="py-6
                       px-6">
                        <button 
                         // onClick={() => handleViewLoan(loan.id)}
                          className="text-blue-500 hover:text-blue-700 text-xl font-medium"
                        >
                          View
                        </button>
                      </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* New loan Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Create New Loan</h2>
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="principal">
                                    Principal Amount
                                </label>
                                <input
                                    type="number"
                                    id="principal"
                                    name="principal"
                                    value={newLoan.principal}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter amount"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="annualInterestRate">
                                    Rate of Interest (%)
                                </label>
                                <input
                                    type="text"
                                    id="annualInterestRate"
                                    name="annualInterestRate"
                                    value={newLoan.annualInterestRate}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight bg-gray-100"
                                    disabled
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tenure">
                                    Tenure (Months)
                                </label>
                                <input
                                    type="number"
                                    id="tenure"
                                    name="tenure"
                                    value={newLoan.tenure}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter tenure in months"
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
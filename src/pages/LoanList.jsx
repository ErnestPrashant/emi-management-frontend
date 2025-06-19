import React, { useState, useEffect } from 'react';
import { Plus, X, Calculator, DollarSign, Calendar, Percent, Eye } from 'lucide-react';
import axios from "axios"

// Utility function to calculate EMI
const calculateEMI = (principal, rate, tenure) => {
    const monthlyRate = rate / 12 / 100;
    const numPayments = tenure;
    if (monthlyRate === 0) return principal / numPayments;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
};

// Generate EMI schedule
const generateEMISchedule = (principal, rate, tenure, emi) => {
    const schedule = [];
    let remainingBalance = principal;
    const monthlyRate = rate / 12 / 100;

    for (let month = 1; month <= tenure; month++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = emi - interestPayment;
        remainingBalance -= principalPayment;

        schedule.push({
            month,
            emi: emi,
            principalPaid: principalPayment,
            interestPaid: interestPayment,
            remainingBalance: Math.max(0, remainingBalance)
        });
    }

    return schedule;
};

// Loan Form Component
const LoanForm = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        loanName: '',
        principal: '',
        rate: '',
        tenure: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.principal && formData.rate && formData.tenure && formData.loanName) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_AXIOS_URL}api/loans/apply`, formData, {
                    withCredentials: true
                })
                const data = response.data;
                const response1 = await axios.get(import.meta.env.VITE_AXIOS_URL+'api/loans/get' + loanId, {withCredentials: true})
                setLoans(response1.data);
                setIsFormOpen(false)
            }
            catch (error) {
                console.log(`error creating new loan ${error}`)
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Calculator className="w-6 h-6 text-blue-600" />
                        Create New Loan
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Loan Name
                        </label>
                        <input
                            type="text"
                            value={formData.loanName}
                            onChange={(e) => setFormData({ ...formData, loanName: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="e.g., Home Loan, Car Loan"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Principal Amount
                        </label>
                        <input
                            type="number"
                            value={formData.principal}
                            onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="100000"
                            min="1"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Percent className="w-4 h-4" />
                            Rate of Interest (Annual %)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.rate}
                            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="8.5"
                            min="0.01"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Tenure (Months)
                        </label>
                        <input
                            type="number"
                            value={formData.tenure}
                            onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="60"
                            min="1"
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                        >
                            Create Loan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// EMI Summary Component
const EMISummary = ({ loan, isOpen, onClose }) => {
    if (!isOpen || !loan) return null;

    const emi = calculateEMI(loan.principal, loan.rate, loan.tenure);
    const schedule = generateEMISchedule(loan.principal, loan.rate, loan.tenure, emi);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{loan.loanName} - EMI Schedule</h2>
                        <p className="text-gray-600 mt-1">Monthly breakdown of your loan payments</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-blue-600 font-medium">Monthly EMI</p>
                            <p className="text-2xl font-bold text-blue-800">${emi.toFixed(2)}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-green-600 font-medium">Total Interest</p>
                            <p className="text-2xl font-bold text-green-800">${((emi * loan.tenure) - loan.principal).toFixed(2)}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <p className="text-sm text-purple-600 font-medium">Total Amount</p>
                            <p className="text-2xl font-bold text-purple-800">${(emi * loan.tenure).toFixed(2)}</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                            <p className="text-sm text-orange-600 font-medium">Tenure</p>
                            <p className="text-2xl font-bold text-orange-800">{loan.tenure} months</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Month</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">EMI</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">Principal</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">Interest</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">Remaining</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.map((payment, index) => (
                                    <tr key={payment.month} className={index % 2 === 0 ? 'bg-gray-25' : 'bg-white'}>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">{payment.month}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 text-right border-b">${payment.emi.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-sm text-green-600 text-right border-b">${payment.principalPaid.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-sm text-red-600 text-right border-b">${payment.interestPaid.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 text-right border-b">${payment.remainingBalance.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main App Component
export const LoanList = () => {
    const [loans, setLoans] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [isEMIOpen, setIsEMIOpen] = useState(false);

    useEffect(() => {
    const fetchloans = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_AXIOS_URL+'api/loans/get', {withCredentials:true})
            setLoans(response.data);
        }
        catch (error) {
            console.log('error fetching loans' + error)
        }
        // finally {
        //     setLoading(false)
        // }
    }
    fetchloans();
}, [])

    const addLoan = (loanData) => {
        const newLoan = {
            id: Date.now(),
            ...loanData,
            createdAt: new Date().toLocaleDateString()
        };
        setLoans([...loans, newLoan]);
    };

    const openEMIDetails = (loan) => {
        setSelectedLoan(loan);
        setIsEMIOpen(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Loan Management System</h1>
                    <p className="text-gray-600 text-lg">Track and manage your loans with detailed EMI breakdowns</p>
                </div>

                {/* Create Loan Button */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        Create New Loan
                    </button>
                </div>

                {/* Loans Table */}
                {loans.length === 0 ? (
                    <div className="text-center py-12">
                        <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-500 mb-2">No loans created yet</h3>
                        <p className="text-gray-400">Click "Create New Loan" to get started</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Loan Details</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Principal</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Rate (%)</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Tenure</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">EMI</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Total Payable</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loans.map((loan, index) => {
                                        const emi = calculateEMI(loan.principal, loan.annualInterestRate, loan.tenure);
                                        const totalPayable = emi * loan.tenure;

                                        return (
                                            <tr key={loan.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{loan.loanName}</p>
                                                        <p className="text-sm text-gray-500">Created: {loan.createdAt}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right text-gray-900 font-medium">{loan.principal.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-right text-gray-900">{loan.annualInterestRate *1200} %</td>
                                                <td className="px-6 py-4 text-right text-gray-900">{loan.tenure} months</td>
                                                <td className="px-6 py-4 text-right text-green-600 font-semibold">{loan.monthlyEMI.toFixed(2)}</td>
                                                <td className="px-6 py-4 text-right text-purple-600 font-semibold">{loan.tenure*loan.monthlyEMI}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => openEMIDetails(loan)}
                                                        className="inline-flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        View EMI
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Modals */}
                <LoanForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={addLoan}
                />

                <EMISummary
                    loan={selectedLoan}
                    isOpen={isEMIOpen}
                    onClose={() => {
                        setIsEMIOpen(false);
                        setSelectedLoan(null);
                    }}
                />
            </div>
        </div>
    );
};


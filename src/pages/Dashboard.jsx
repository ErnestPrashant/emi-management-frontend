import { LoansTable } from "../components/LoansTable";
import {PaymentsTable} from "../components/PaymentsTable"
import { StatCard } from "../components/StatCard"
import { useEffect, useState } from "react";
import axios from 'axios'

export const Dashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        pendingPayments: 0
    })
    const [totalPayments, setTotalPayments] = useState()
    const [loans, setLoans] = useState([]);
    const [payments, setPayments] = useState([]);

    // Loading states
    const [loansLoading, setLoansLoading] = useState(true);
    const [paymentsLoading, setPaymentsLoading] = useState(true);

    // Error states
    const [loansError, setLoansError] = useState(null);
    const [paymentsError, setPaymentsError] = useState(null);

    useEffect(() => {
        const fetchLoans = async () => {
            try{
                setLoansLoading(true)
                const response = await axios.get('http://localhost:4500/api/loans/all');
                setLoans(response.data);
                setLoansError(null);
                setStats({
                    users : response.data.length,
                    pendingPayments :0
                })
            }
            catch(error){
                console.log('Error fetching Loans',error)
            }
            finally{
                setLoansLoading(false);
            }
        }
        fetchLoans();
    },[])

    useEffect(() => {
        const fetchPayments = async () => {
            try{
                const response = await axios.get('http://localhost:4500/api/payments/all')
                setPayments(response.data);
                setTotalPayments(response.data.length)
                setPaymentsError(null);

            }
            catch(error){
                console.log(`error while fetching payments ${error}`)
            }
            finally{
                setPaymentsLoading(false)
            }
        }
        fetchPayments();
    },[])

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Total Users" value={stats.users} />
                    <StatCard title="Total Payments" value={totalPayments} />
                    <StatCard title="Pending Payments" value={stats.pendingPayments} />
                </div>

                {/* Tables */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <LoansTable loans={loans} />
                    <PaymentsTable payments={payments} />
                </div>
            </div>
        </div>
    );
}


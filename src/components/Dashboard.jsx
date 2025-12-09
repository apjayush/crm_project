import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/dashboard", {
            credentials: "include", // ✅ IMPORTANT
        })
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading dashboard...</p>;
    if (!data) return <p>Failed to load dashboard</p>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                    Welcome back! Here's your overview
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Leads</p>
                            <p className="text-2xl font-bold text-gray-800 mt-2">
                                {data.total}
                            </p>
                        </div>
                        <div className="bg-blue-500 p-3 rounded-lg">
                            <Users className="text-white" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Recent Leads
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Phone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Enquiry Date
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {data.leads.map((lead, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4">
                                        {lead.name ?? "Unknown"}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {lead.number}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(lead.enquiry_date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

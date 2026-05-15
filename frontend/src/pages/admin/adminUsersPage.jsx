import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingAnimation from "../../componenets/loadingAnimation";

export default function AdminUsersPage() {
    const [adminUsers, setAdminUsers] = useState([]);
    const [regularUsers, setRegularUsers] = useState([]);
    const [isUsersLoaded, setIsUsersLoaded] = useState(false);

    // Pagination for regular users
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        if (!isUsersLoaded) {
            const token = localStorage.getItem("token");

            axios
                .get(
                    import.meta.env.VITE_API_URL +
                        "/users/all/" +
                        pageSize +
                        "/" +
                        currentPage,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                )
                .then((response) => {
                    setAdminUsers(response.data.adminUsers);
                    setRegularUsers(response.data.regularUsers);
                    setTotalPages(response.data.totalPages);
                    setTotalUsers(response.data.total);
                    setIsUsersLoaded(true);
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Failed to load users");
                });
        }
    }, [isUsersLoaded]);

    function handleToggleBlock(userId, currentBlockStatus) {
        const token = localStorage.getItem("token");
        const action = currentBlockStatus ? "unblock" : "block";

        axios
            .put(
                import.meta.env.VITE_API_URL + "/users/" + action + "/" + userId,
                {},
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            )
            .then(() => {
                toast.success(
                    `User ${currentBlockStatus ? "unblocked" : "blocked"} successfully`
                );
                setIsUsersLoaded(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to update user status");
            });
    }

    function UserRow({ item }) {
        return (
            <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition duration-200"
            >
                <td className="p-3 text-center font-medium text-xs text-gray-500">
                    {item._id}
                </td>
                <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <img
                            src={item.image || "/images/default-profile.png"}
                            alt={item.firstName}
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                            onError={(e) => {
                                e.target.src = "/images/default-profile.png";
                            }}
                        />
                    </div>
                </td>
                <td className="p-3 text-center font-semibold">{item.email}</td>
                <td className="p-3 text-center text-gray-500">{item.firstName}</td>
                <td className="p-3 text-center text-gray-500">{item.lastName}</td>
                <td className="p-3 text-center">
                    {item.isEmailVerified ? (
                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                            Verified
                        </span>
                    ) : (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs">
                            Unverified
                        </span>
                    )}
                </td>
                <td className="p-3 text-center">
                    {item.isBlock ? (
                        <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">
                            Blocked
                        </span>
                    ) : (
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                            Active
                        </span>
                    )}
                </td>
                <td className="p-3 text-center">
                    <button
                        onClick={() => handleToggleBlock(item._id, item.isBlock)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors duration-200 ${
                            item.isBlock
                                ? "bg-green-500 hover:bg-green-600 text-white"
                                : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                    >
                        {item.isBlock ? "Unblock" : "Block"}
                    </button>
                </td>
            </tr>
        );
    }

    return (
        <div className="w-full h-full overflow-y-auto p-6 bg-gray-100 rounded-lg">

            {/* Header */}
            <div className="sticky top-0 z-10 w-full h-[90px] rounded-xl bg-gradient-to-r from-accent to-primary text-white flex items-center px-6 justify-between shadow-lg mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-wide">Users</h1>
                    <p className="text-sm opacity-80">
                        Manage your store Users with ease
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-accent opacity-90">
                        Total Users:{" "}
                        <span className="font-semibold">{totalUsers}</span>
                    </span>
                </div>
            </div>

            {isUsersLoaded ? (
                <>
                    {/* Admin Users Table */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-accent inline-block"></span>
                            Admin Users
                            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-accent rounded-full text-xs font-medium">
                                {adminUsers.length}
                            </span>
                        </h2>
                        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                            <table className="w-full text-sm text-gray-700">
                                <thead className="bg-gray-200 text-gray-800 uppercase text-xs">
                                    <tr>
                                        <th className="p-4">User ID</th>
                                        <th className="p-4">Profile</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">First Name</th>
                                        <th className="p-4">Last Name</th>
                                        <th className="p-4">Email Status</th>
                                        <th className="p-4">Account Status</th>
                                        <th className="p-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adminUsers.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={8}
                                                className="p-6 text-center text-gray-400"
                                            >
                                                No admin users found
                                            </td>
                                        </tr>
                                    ) : (
                                        adminUsers.map((item) => (
                                            <UserRow key={item._id} item={item} />
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Regular Users Table */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-accent inline-block"></span>
                            Regular Users
                            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-accent rounded-full text-xs font-medium">
                                {totalUsers - adminUsers.length}
                            </span>
                        </h2>
                        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                            <table className="w-full text-sm text-gray-700">
                                <thead className="bg-gray-200 text-gray-800 uppercase text-xs">
                                    <tr>
                                        <th className="p-4">User ID</th>
                                        <th className="p-4">Profile</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">First Name</th>
                                        <th className="p-4">Last Name</th>
                                        <th className="p-4">Email Status</th>
                                        <th className="p-4">Account Status</th>
                                        <th className="p-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {regularUsers.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={8}
                                                className="p-6 text-center text-gray-400"
                                            >
                                                No users found
                                            </td>
                                        </tr>
                                    ) : (
                                        regularUsers.map((item) => (
                                            <UserRow key={item._id} item={item} />
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="w-full flex justify-end items-center gap-3 mt-4">
                            <button
                                onClick={() => {
                                    if (currentPage > 1) {
                                        setCurrentPage(currentPage - 1);
                                        setIsUsersLoaded(false);
                                    }
                                }}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => {
                                    if (currentPage < totalPages) {
                                        setCurrentPage(currentPage + 1);
                                        setIsUsersLoaded(false);
                                    }
                                }}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                            >
                                Next
                            </button>
                            <select
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(parseInt(e.target.value));
                                    setCurrentPage(1);
                                    setIsUsersLoaded(false);
                                }}
                                className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                            >
                                <option value={2}>2</option>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                    </div>
                </>
            ) : (
                <LoadingAnimation />
            )}
        </div>
    );
}
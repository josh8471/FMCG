import { CiViewTable } from "react-icons/ci";
import { FaEdit, FaTrash, FaUserTie } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GiClick } from "react-icons/gi";


const SalesmanManagement = () => {
  const {
    salesmen, 
    setSalesmen, 
    setShowAddModal, 
    setEditingSalesman 
  } = useOutletContext();

  const handleDelete = (id) => {
    setSalesmen((prev) => prev.filter((s) => s.id !== id));
    toast.success("Salesman deleted successfully");
  };

  const handleEdit = (salesman) => {
    setEditingSalesman(salesman);
    setShowAddModal(true);
  };

  const activeSalesmen = salesmen.filter(s => s.status !== 'Retired' && s.status !== 'Inactive');
  const allSalesmen = salesmen;

  const TableRow = ({ s, isAllTable = false }) => (
    <tr key={s.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
      <td 
        className="px-6 py-4 cursor-pointer hover:text-blue-600 transition-colors"
        onClick={() => {
            handleEdit(s);
            toast("Editing details for " + s.username, { icon: '✏️' });
        }}
      >
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm overflow-hidden">
             {s.photoPreview ? <img src={s.photoPreview} alt="" className="w-full h-full object-cover" /> : s.username.charAt(0).toUpperCase()}
            </div>
            <div>
             <p className="font-medium text-gray-900">{s.username}</p>
            </div>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-600">{s.useremail}</td>
      <td className="px-6 py-4 text-gray-600">{s.phone}</td>
      
      {!isAllTable && (
        <>
            <td 
                className="px-6 py-4 text-gray-700 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded-md transition-all"
                onClick={() => {
                    handleEdit(s);
                }}
            > 
            <div className="flex items-center gap-2"  >  {s.beatName || "N/A"} <GiClick /></div>
            

                
            </td>
            <td 
                className="px-6 py-4 text-gray-700 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded-md transition-all"
                onClick={() => {
                    handleEdit(s);
                }}
            >
                {s.areaName || "N/A"}
            </td>
        </>
      )}

      <td className="px-6 py-4 text-sm text-gray-500">
        {s.createdAt}
      </td>

      {isAllTable && (
        <td className="px-6 py-4">
             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${s.status === 'Retired' ? 'bg-red-100 text-red-800' : (s.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800')}`}>
                {s.status || 'Active'}
             </span>
        </td>
      )}

      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
            <button 
                onClick={() => handleEdit(s)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                title="Edit Salesman"
            >
                <FaEdit />
            </button>

          <button
            onClick={() => {
                 toast((t) => (
                    <div className="flex flex-col gap-2">
                        <p className="font-medium text-gray-800">Are you sure you want to delete {s.username}?</p>
                        <div className="flex gap-2 justify-end">
                            <button 
                                onClick={() => toast.dismiss(t.id)}
                                className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => {
                                    handleDelete(s.id);
                                    toast.dismiss(t.id);
                                }}
                                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                 ), { duration: 5000, icon: '⚠️' });
            }}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Delete Salesman"
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
          <CiViewTable size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Salesman Management</h1>
          <p className="text-gray-500">Manage your sales team, beats, and assignments</p>
        </div>
      </div>

      <div className="space-y-12">
        <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                Active Salesmen
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                        <th className="px-6 py-4">Username</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Phone</th>
                        <th className="px-6 py-4">Beat Name</th>
                        <th className="px-6 py-4">Area Name</th>
                        <th className="px-6 py-4">Joined Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {activeSalesmen.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                <p>No active salesmen found</p>
                            </td>
                        </tr>
                    ) : (
                        activeSalesmen.map((s) => <TableRow key={s.id} s={s} />)
                    )}
                    </tbody>
                </table>
                </div>
            </div>
        </section>

        <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                 <span className="w-2 h-8 bg-gray-600 rounded-full"></span>
                All Salesmen
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                        <th className="px-6 py-4">Username</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Phone</th>
                        <th className="px-6 py-4">Joined Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {allSalesmen.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                <p>No salesmen records found</p>
                            </td>
                        </tr>
                    ) : (
                        allSalesmen.map((s) => <TableRow key={s.id} s={s} isAllTable={true} />)
                    )}
                    </tbody>
                </table>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default SalesmanManagement;

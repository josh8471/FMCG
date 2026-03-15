import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
 
  FaTrash,
  FaEdit,
  FaCopy
} from "react-icons/fa"; 
import { useProducts } from "../context/ProductContext";  



const Product = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { setShowCreateProduct } = useOutletContext(); 
  return (
    <div className="bg-white min-h-screen">
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex flex-col gap-4">
            <div>
                 
                 <h1 className="text-xl font-bold text-gray-700 flex items-center gap-2">
                     All Products <span className="text-gray-400 text-xs">▼</span>
                 </h1>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                

                 <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                      
                      
                  
                 
                     
                 </div>
            </div>
        </div>
      </div>

      <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
              <thead>
                  <tr className="border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3 cursor-pointer hover:bg-gray-50">Name ↑</th>
                      <th className="px-6 py-3 cursor-pointer hover:bg-gray-50">SKU</th>
                      <th className="px-6 py-3 cursor-pointer hover:bg-gray-50">Product Type</th>
                      <th className="px-6 py-3 cursor-pointer hover:bg-gray-50">Product Category</th>
                      <th className="px-6 py-3 cursor-pointer hover:bg-gray-50">Tax Category</th>
                      <th className="px-6 py-3 cursor-pointer hover:bg-gray-50">Active</th>
                      
                      <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
              </thead>
              <tbody className="text-sm text-gray-600">
                  {products.map((p, i) => (
                      <tr key={p.id || i} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors group">
                          <td className="px-6 py-4 font-medium text-blue-600 hover:underline cursor-pointer">
                              {p.name}
                          </td>
                          <td className="px-6 py-4">{p.sku}</td>
                          <td className="px-6 py-4">{p.type || "Simple"}</td>
                          <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">{p.productCategory || "Unspecified"}</td>
                          <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">{p.taxCategory || "GST NIL-RATED"}</td>
                          <td className="px-6 py-4">{p.isActive || p.active ? "Active" : "Inactive"}</td>
                          <td className="px-6 py-4 text-right">
                             <div className="hidden group-hover:flex items-center justify-end gap-2 text-gray-400">
                                 <button title="Edit" className="hover:text-blue-600" onClick={() => navigate(`/product/edit/${p.id}`)}><FaEdit /></button>
                                 <button title="Delete" className="hover:text-red-600"><FaTrash /></button>
                             </div>
                          </td>
                      </tr>
                  ))}
                  
                  {products.length === 0 && (
                      <tr>
                          <td colSpan="7" className="text-center py-10 text-gray-400 italic">
                              No products found. Click "New" to add one.
                          </td>
                      </tr>
                  )}
              </tbody>
          </table>
      </div>
      
                  
    </div>
  );
};

export default Product;

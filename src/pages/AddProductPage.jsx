import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaImage, FaPlus, FaTimes, FaSearch } from 'react-icons/fa';
import { useProducts } from '../context/ProductContext';

const AddProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addProduct, getProduct, updateProduct } = useProducts();

  const [isActive, setIsActive] = useState(true);
  const [productType, setProductType] = useState("Product"); 
  const [isVariantable, setIsVariantable] = useState(false); 
  
  const [formData, setFormData] = useState({
    name: "",   
    sku: "",
    description: "",
    smallestUnit: "",
    minOrderQty: "",
    mrp: "",
    barcode: "",
    netQuantity: "",
    unit: "",
    mfgDate: "",
    expDate: "",
    batch: "",
    manufacturer: "",
    shelfNo: "",
    taxCategory: "GST NIL-RATED",
    hsnCode: "",
    brand: "",
    productCategory: "",
    inventoryId: "",
    weight: "",
    width: "",
    length: "",
    height: "",
    purchaseAccount: "Purchases",
    salesAccount: "Sales",
    purchasePrice: "",
    isInclusiveTax: false,
    
  });

  useEffect(() => {
    if (id) {
      const product = getProduct(id);
      if (product) {
        setIsActive(product.isActive !== undefined ? product.isActive : product.active);
        setProductType(product.type || "Product");
        setIsVariantable(product.isVariantable || false);
        setFormData({
            name: product.name || "", 
            sku: product.sku || "",
            description: product.description || "",
            smallestUnit: product.smallestUnit || "",
            minOrderQty: product.minOrderQty || "",
            mrp: product.mrp || "",
            barcode: product.barcode || "",
            netQuantity: product.netQuantity || "",
            unit: product.unit || "",
            mfgDate: product.mfgDate || "",
            expDate: product.expDate || "",
            batch: product.batch || "",
            manufacturer: product.manufacturer || "",
            shelfNo: product.shelfNo || "",
            taxCategory: product.taxCategory || "",
            hsnCode: product.hsnCode || "",
            brand: product.brand || "",
            productCategory: product.productCategory || "",
            inventoryId: product.inventoryId || "",
            weight: product.weight || "",
            width: product.width || "",
            length: product.length || "",
            height: product.height || "",
            purchaseAccount: product.purchaseAccount || "Purchases",
            salesAccount: product.salesAccount || "Sales",
            purchasePrice: product.purchasePrice || "",
            isInclusiveTax: product.isInclusiveTax || false,
        });
      }
    }
  }, [id, getProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
        isActive,
        type: productType,
        isVariantable,
        ...formData
    };
    
    if (id) {
        updateProduct(id, productData);
        alert("Product updated successfully!");
    } else {
        addProduct(productData);
        alert("Product saved successfully!");
    }
    
    navigate("/Product");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-10">
      
      <div className="px-6 py-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
        <h2 className="text-gray-700 font-bold uppercase text-sm tracking-wider">{id ? "Edit Product" : "Product Information"}</h2>
        <div className="flex items-center gap-3">
          
          <span className="text-xs font-semibold text-gray-500">Is Active?</span>
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`w-10 h-5 rounded-full transition-colors relative ${isActive ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${isActive ? 'right-1' : 'left-1'}`} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-800">Type</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${productType === 'Product' ? 'border-blue-600' : 'border-gray-300'}`}>
                  {productType === 'Product' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                </div>
                <input type="radio" className="hidden" checked={productType === "Product"} onChange={() => setProductType("Product")} /> 
                <span className="text-gray-700">Product</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${productType === 'Service' ? 'border-blue-600' : 'border-gray-300'}`}>
                  {productType === 'Service' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                </div>
                <input type="radio" className="hidden" checked={productType === "Service"} onChange={() => setProductType("Service")} /> 
                <span className="text-gray-700">Service</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-800">Variantable</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isVariantable ? 'border-blue-600' : 'border-gray-300'}`}>
                  {isVariantable && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                </div>
                <input type="radio" className="hidden" checked={isVariantable} onChange={() => setIsVariantable(true)} /> 
                <span className="text-gray-700">Yes</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${!isVariantable ? 'border-blue-600' : 'border-gray-300'}`}>
                  {!isVariantable && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                </div>
                <input type="radio" className="hidden" checked={!isVariantable} onChange={() => setIsVariantable(false)} /> 
                <span className="text-gray-700">No</span>
              </label>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Name <span className="text-red-500">*</span></label>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">SKU <span className="text-red-500">*</span></label>
              <input name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" required />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-gray-600">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows="2" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none resize-none" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 flex items-center gap-1">
                Smallest Unit <span className="bg-gray-200 text-gray-600 rounded-full w-3 h-3 flex items-center justify-center text-[8px] cursor-help">i</span> <span className="text-red-500">*</span>
              </label>
              <select name="smallestUnit" value={formData.smallestUnit} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-blue-500 outline-none">
                <option value="">Select unit</option>
                <option value="Piece">Piece</option>
                <option value="Kg">Kg</option>
                <option value="Litre">Litre</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Min. order qty</label>
              <input name="minOrderQty" value={formData.minOrderQty} onChange={handleChange} placeholder="MOQ" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
            </div>
          </div>

          <div className="lg:col-span-2">
            <label className="text-xs font-bold text-gray-600 block mb-1">Product Image</label>
            <div className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer transition-colors relative group">
              <FaImage size={24} className="mb-2" />
              <div className="hidden group-hover:flex absolute bottom-2 right-2 gap-2">
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-2 text-gray-500">
            </div>
          </div>
        </div>

        {!isVariantable && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">MRP</label>
              <input name="mrp" value={formData.mrp} onChange={handleChange} placeholder="MRP" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Barcode</label>
              <input name="barcode" value={formData.barcode} onChange={handleChange} placeholder="Barcode" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 flex items-center gap-1">Net Quantity <span className="bg-blue-100 text-blue-600 rounded-full w-3 h-3 flex items-center justify-center text-[8px] font-bold">?</span></label>
              <input name="netQuantity" value={formData.netQuantity} onChange={handleChange} placeholder="Net Quantity" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Unit</label>
              <select name="unit" value={formData.unit} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-blue-500 outline-none">
                <option value="Unit">Unit</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Mfg Date</label>
              <input type="date" name="mfgDate" value={formData.mfgDate} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none text-gray-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Exp Date</label>
              <input type="date" name="expDate" value={formData.expDate} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none text-gray-500" />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-gray-600 flex items-center gap-1">batch <span className="bg-black text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px] font-bold">i</span></label>
              <input name="batch" value={formData.batch} onChange={handleChange} placeholder="batch" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-gray-600 flex items-center gap-1">Manufacturer <span className="bg-black text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px] font-bold">i</span></label>
              <input name="manufacturer" value={formData.manufacturer} onChange={handleChange} placeholder="Manufacturer" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-gray-600">Shelf no.</label>
              <select name="shelfNo" value={formData.shelfNo} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-blue-500 outline-none">
                <option value="">Shelf no.</option>
              </select>
            </div>
          </div>
        )}

        <hr className="border-gray-100" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">Tax Category</label>
            <div className="relative">
              <select name="taxCategory" value={formData.taxCategory} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-blue-500 outline-none appearance-none">
                <option value="GST NIL-RATED">GST NIL-RATED</option>
                <option value="GST 5%">GST 5%</option>
              </select>
              <FaTimes className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 text-xs cursor-pointer" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">HSN Code</label>
            <input name="hsnCode" value={formData.hsnCode} onChange={handleChange} placeholder="HSN code" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">Brand</label>
            <select name="brand" value={formData.brand} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-blue-500 outline-none">
              <option value="">Select brand</option>
              <option value="Brand A">Brand A</option>
              <option value="Brand B">Brand B</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">Product Category</label>
            <select name="productCategory" value={formData.productCategory} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-blue-500 outline-none">
              <option value="">Select product category</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>

            </select>
          </div>
          <div className="md:col-span-1 space-y-1">
            <label className="text-xs font-bold text-gray-600">Inventory Identification</label>
            <select name="inventoryId" value={formData.inventoryId} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-blue-500 outline-none">
              <option value="">Select inventory identification</option>
            </select>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">Weight</label>
            <input name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">Width</label>
            <input name="width" value={formData.width} onChange={handleChange} placeholder="Width" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">Length</label>
            <input name="length" value={formData.length} onChange={handleChange} placeholder="Length" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">Height</label>
            <input name="height" value={formData.height} onChange={handleChange} placeholder="Height" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
          </div>
        </div>

        <div className="pt-2">
          <h2 className="text-gray-700 font-bold uppercase text-sm tracking-wider mb-4">Accounts Information</h2>
          <hr className="border-gray-200 mb-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Purchases Account</label>
              <div className="relative">
                 <select name="purchaseAccount" value={formData.purchaseAccount} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-blue-500 outline-none appearance-none">
                  <option value="Purchases">Purchases</option>
                </select>
                <FaTimes className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 text-xs cursor-pointer" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Sales Account</label>
               <div className="relative">
                <select name="salesAccount" value={formData.salesAccount} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-blue-500 outline-none appearance-none">
                  <option value="Sales">Sales</option>
                </select>
                 <FaTimes className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 text-xs cursor-pointer" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
              </div>
            </div>
          </div>
        </div>

        {!isVariantable && (
          <div className="pt-4">
             <h2 className="text-gray-700 font-bold uppercase text-sm tracking-wider mb-4">Purchases Information</h2>
             <hr className="border-gray-200 mb-6" />

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Purchase Price</label>
                  <input name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} placeholder="Purchase Price" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Inclusive Tax</label>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input type="checkbox" name="isInclusiveTax" checked={formData.isInclusiveTax} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                </div>
             </div>
          </div>
        )}

        <div className="pt-6 space-y-8">
          
          <div>
            <h2 className="text-gray-700 font-bold uppercase text-sm tracking-wider mb-2">Current Prices</h2>
            <hr className="border-gray-200 mb-4" />
            <div className="bg-white"> 
              <div className="grid grid-cols-5 gap-4 border-b border-gray-200 pb-2 mb-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <div>S.NO</div>
                <div>Valid From</div>
                <div>Customer Category <span className="text-red-500">*</span></div>
                <div>Inc. Tax</div>
                <div className="flex justify-between">
                  <span>Min Price <span className="text-red-500">*</span></span>
                  <span>Price <span className="text-red-500">*</span></span>
                </div>
              </div>
              <div className="text-center py-6 text-sm text-gray-500">
                No Current Prices Found
              </div>
              <div className="flex justify-end mt-2">
                 <button type="button" className="flex items-center gap-1 text-xs font-bold text-blue-600 border border-blue-600 px-4 py-1.5 rounded hover:bg-blue-50 uppercase tracking-wider transition-colors">
                    <FaPlus size={10} /> Add
                 </button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-gray-700 font-bold uppercase text-sm tracking-wider mb-1">Product Packages</h2>
            <p className="text-[10px] text-gray-500 mb-4">Example: For Package Unit = <span className="font-bold text-gray-700">Dozen</span> and Unit (Primary Unit) = <span className="font-bold text-gray-700">Piece</span>, then Unit Multiplier = <span className="font-bold text-gray-700">12</span>.</p>
            <hr className="border-gray-200 mb-4" />
            
            <div className="grid grid-cols-3 gap-4 border-b border-gray-200 pb-2 mb-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">
                <div>Package Unit</div>
                <div>Unit Multiplier</div>
                <div>Smallest Unit</div>
            </div>
            <div className="text-center py-6 text-sm text-gray-600">
              No Product Packages Found
            </div>
            <div className="flex justify-end mt-2">
                 <button type="button" className="flex items-center gap-1 text-xs font-bold text-blue-600 border border-blue-600 px-4 py-1.5 rounded hover:bg-blue-50 uppercase tracking-wider transition-colors">
                    <FaPlus size={10} /> Add
                 </button>
            </div>
          </div>

        </div>

        <div className="flex justify-end gap-4 pt-8 border-t border-gray-200 mt-10">
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="px-8 py-2 border border-blue-600 text-blue-600 rounded-sm text-xs font-bold uppercase hover:bg-blue-50 tracking-wider"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-8 py-2 bg-blue-600 text-white rounded-sm text-xs font-bold uppercase hover:bg-blue-700 shadow-sm tracking-wider"
          >
            Save
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddProductPage;
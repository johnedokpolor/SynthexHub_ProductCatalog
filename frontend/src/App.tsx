import React, { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [page, setPage] = useState(1);

  // This is the "Easy" debounce logic
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(search), 500);
    return () => clearTimeout(timer); // Reset if user types again
  }, [search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Adjust the URL to match your Express server port (usually 5000)
      const baseUrl = "http://localhost:5000/api/products";
      const params = new URLSearchParams({
        search: debouncedTerm,
        category: category,
        limit: "12",
        page: String(page),
      });

      const res = await fetch(`${baseUrl}?${params}`);
      const result = await res.json();
      setProducts(result.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  // This only runs when the user STOPS typing
  useEffect(() => {
    if (debouncedTerm) {
      fetchProducts();
    }
  }, [debouncedTerm]);

  useEffect(() => {
    fetchProducts();
  }, [debouncedTerm, category, page]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">
            Vybe<span className="text-indigo-600">Catalog</span>
          </h1>
          <p className="text-slate-500 mb-8">
            Internship Project 2: Advanced Search & Aggregation
          </p>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-6 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer font-medium"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Furniture">Furniture</option>
              <option value="Stationery">Stationery</option>
            </select>
          </div>
        </header>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-white rounded-2xl animate-pulse border border-slate-100"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
              >
                <div className="aspect-square bg-slate-100 rounded-xl mb-5 flex items-center justify-center text-slate-300 font-medium group-hover:bg-indigo-50 transition-colors">
                  {/* Placeholder for Task 3 Images */}
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    No Image
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest">
                      {product.category}
                    </span>
                    <span className="text-xl font-black text-slate-900">
                      ${product.price}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold leading-tight group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-slate-500 text-sm line-clamp-2">
                    {product.description ||
                      "No description provided for this item."}
                  </p>

                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span
                      className={`flex items-center gap-1.5 text-xs font-semibold ${product.stock > 0 ? "text-emerald-600" : "text-rose-500"}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? "bg-emerald-500" : "bg-rose-500"}`}
                      ></span>
                      {product.stock > 0
                        ? `${product.stock} Units`
                        : "Out of Stock"}
                    </span>
                    <button className="text-indigo-600 font-bold text-sm hover:underline">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-32">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-slate-900">
              No results found
            </h2>
            <p className="text-slate-500">
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

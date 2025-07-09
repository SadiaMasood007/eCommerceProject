import React, { useState, useEffect } from "react";

export default function ProductModal({ isOpen, mode, initial, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    if (mode === "edit" && initial) {
      setForm(initial);
    }
  }, [mode, initial]);
  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">{mode === "add" ? "Add Product" : "Edit Product"}</h2>
        {["title", "price", "image", "category", "description"].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              required
            />
          </div>
        ))}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-1 bg-gray-200 rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-1 bg-blue-600 text-white rounded">
            {mode === "add" ? "Create" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  payment: z.enum(["cod", "card", "online"], {
    errorMap: () => ({ message: "Payment method is required" }),
  }),
  easypaisa: z.string().regex(/^03\d{9}$/, "Enter a valid 11-digit Easypaisa number starting with 03").optional(),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be number with exactly 16 digits").optional(),
  cvv: z.string().regex(/^\d{4}$/, "CVV must be exactly 4 digits").optional(),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format").optional(),
}).refine(data => {
  if (data.payment === "online") return !!data.easypaisa;
  if (data.payment === "card") return !!data.cardNumber && !!data.cvv && !!data.expiry;
  return true;
}, {
  message: "Missing payment details for selected method",
  path: ["payment"]
});

const Checkout = () => {
  const { cartItems, setCheckoutInfo } = useCart();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const paymentMethod = watch("payment");

  const onSubmit = (data) => {
    setCheckoutInfo(data);
    navigate("/confirmation");
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

      <div className="md:col-span-1 border p-4 rounded shadow-md h-fit bg-white">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-3 gap-3">
            <img src={item.image} alt={item.title} className="w-12 h-12 object-contain" />
            <div className="flex-1 text-sm">
              <p className="line-clamp-1-local">{item.title}</p>
              <p className="text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <hr className="my-2" />
        <div className="text-right font-bold">Total: ${total.toFixed(2)}</div>
      </div>


      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold text-blue-900">Checkout</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white">
          <div>
            <label className="block mb-1">Full Name</label>
            <input {...register("name")} className="w-full border p-2 rounded" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Shipping Address</label>
            <input {...register("address")} className="w-full border p-2 rounded" />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Payment Method</label>
            <select {...register("payment")} className="w-full border p-2 rounded">
              <option value="">Select</option>
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
              <option value="online">Online Banking (Easypaisa)</option>
            </select>
            {errors.payment && <p className="text-red-500 text-sm">{errors.payment.message}</p>}
          </div>

          {paymentMethod === "online" && (
            <div>
              <label className="block mb-1">Easypaisa Account Number</label>
              <input  {...register("easypaisa")} className="w-full border p-2 rounded" />
              {errors.easypaisa && <p className="text-red-500 text-sm">{errors.easypaisa.message}</p>}
            </div>
          )}

          {paymentMethod === "card" && (
            <>
              <div>
                <label className="block mb-1">Card Number</label>
                <input {...register("cardNumber")} className="w-full border p-2 rounded"

                />{errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">CVV</label>
                  <input  {...register("cvv")} className="w-full border p-2 rounded"

                  />{errors.cvv && <p className="text-red-500 text-sm">{errors.cvv.message}</p>}
                </div>
                <div>
                  <label className="block mb-1">Expiry Date</label>
                  <input
                    {...register("expiry")}
                    placeholder="MM/YY e.g. 06/26"
                    className="w-full border p-2 rounded"
                  />{errors.expiry && <p className="text-red-500 text-sm">{errors.expiry.message}</p>}
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Confirm & Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

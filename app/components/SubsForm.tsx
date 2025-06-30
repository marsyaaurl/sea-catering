'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

type MealPlan = {
  meal_id: string;
  plan_name: string;
  price: number;
};

export default function SubsForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPlanID, setSelectedPlanID] = useState('');
  const [mealType, setMealType] = useState<string[]>([]);
  const [deliveryDays, setDeliveryDays] = useState<string[]>([]);
  const [allergies, setAllergies] = useState('');
  const [totalPrice, setTotalPrice] = useState<number | undefined>();
  const [plans, setPlans] = useState<MealPlan[]>([]);

  // Fetch meal plans from Supabase
  useEffect(() => {
    const fetchMeal = async () => {
      const { data, error } = await supabase
        .from('meal_plans')
        .select('meal_id, plan_name, price');
      if (error) console.log(error);
      if (data) setPlans(data);
    };
    fetchMeal();
  }, []);

  // Auto-update total price
  useEffect(() => {
    const selectedPlan = plans.find((plan) => plan.meal_id === selectedPlanID);
    const planPrice = selectedPlan?.price ?? 0;
    const total = planPrice * mealType.length * deliveryDays.length * 4.3;
    setTotalPrice(total);
  }, [selectedPlanID, mealType, deliveryDays, plans]);

  const handleMealTypeChange = (value: string) => {
    setMealType((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleDeliveryDaysChange = (value: string) => {
    setDeliveryDays((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !selectedPlanID || mealType.length === 0 || deliveryDays.length === 0) {
      alert('Please fill in all required fields!');
      return;
    }

    const { error } = await supabase.from('subscription').insert({
      user_name: name,
      phone,
      meal_id: selectedPlanID,
      meal_type: mealType.join(', '),
      delivery_days: deliveryDays.join(', '),
      allergies,
      total_price: totalPrice,
    });

    if (error) {
      console.log(error);
    } else {
      setName('');
      setPhone('');
      setSelectedPlanID('');
      setMealType([]);
      setDeliveryDays([]);
      setAllergies('');
      setTotalPrice(undefined);
      alert('Subscription successful!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-24">
      <h1 className="font-bold text-2xl text-[#323232] bg-transparent">Subscribe to a Meal Plan</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full max-w-xl p-6 rounded-lg">
        <div className="flex flex-col">
          <label className="font-semibold text-[#323232]">Full Name *</label>
          <input
            placeholder="Your Name"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="border-2 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-[#323232]">Phone Number *</label>
          <input
            placeholder="08xxxxxxxx"
            value={phone}
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            className="border-2 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-[#323232]">Meal Plan *</label>
          <select
            value={selectedPlanID}
            onChange={(e) => setSelectedPlanID(e.target.value)}
            className="border-2 rounded-lg px-3 py-2"
          >
            <option value="">Select a Plan</option>
            {plans.map((plan) => (
              <option key={plan.meal_id} value={plan.meal_id}>
                {plan.plan_name} - Rp{plan.price.toLocaleString('id-ID')}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-[#323232]">Meal Types *</label>
          <div className="flex flex-wrap gap-4">
            {['Breakfast', 'Lunch', 'Dinner'].map((type) => (
              <label key={type} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={type}
                  checked={mealType.includes(type)}
                  onChange={() => handleMealTypeChange(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-[#323232]">Delivery Days *</label>
          <div className="flex flex-wrap gap-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
              (day) => (
                <label key={day} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={day}
                    checked={deliveryDays.includes(day)}
                    onChange={() => handleDeliveryDaysChange(day)}
                  />
                  {day}
                </label>
              )
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-[#323232]">Allergies</label>
          <input
            placeholder="ex: Nuts, Seafood..."
            value={allergies}
            type="text"
            onChange={(e) => setAllergies(e.target.value)}
            className="border-2 rounded-lg px-3 py-2"
          />
        </div>

        {totalPrice !== undefined && (
          <div className="text-orange-400 font-semibold text-lg mt-2">
            Estimated Total: Rp{totalPrice.toLocaleString('id-ID')}
          </div>
        )}

        <button
          type="submit"
          className="bg-orange-400 text-white font-semibold rounded-lg px-4 py-2 hover:bg-orange-200 hover:text-orange-500 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

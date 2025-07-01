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
  const [userID, setUserID] = useState<string | null>(null);

  // ✅ Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!data?.user || error) {
        window.location.href = '/Login';
      } else {
        setUserID(data.user.id);
      }
    };
    checkUser();
  }, []);

  // Fetch meal plans
  useEffect(() => {
    const fetchMeal = async () => {
      const { data, error } = await supabase
        .from('meal_plans')
        .select('meal_id, plan_name, price');
      if (data) setPlans(data);
      if (error) console.log(error);
    };
    fetchMeal();
  }, []);

  // Calculate total price
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
      user_id: userID,
      user_name: name,
      phone,
      meal_id: selectedPlanID,
      meal_type: mealType.join(', '),
      delivery_days: deliveryDays.join(', '),
      allergies,
      total_price: totalPrice,
    });

    if (error) {
      console.error(error);
      alert("Failed to subscribe: " + error.message);
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
        {/* All input fields remain the same */}
        {/* ... */}
      </form>
    </div>
  );
}

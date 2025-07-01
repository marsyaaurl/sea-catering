'use client';

import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

interface Profiles {
  user_id: string;
  full_name: string;
}

type Subscription = {
  subs_id: string;
  meal_type: string;
  delivery_days: string;
  total_price: number;
  meal_id: string;
};

export default function SubsHeader() {
  const [profile, setProfile] = useState<Profiles | null>(null);
  const [subs, setSubs] = useState<Subscription | null>(null);
  const [userId, setUserId] = useState<string | null>(null); // ✅ simpan user id di luar useEffect

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('User not found:', userError);
        return;
      }

      setUserId(user.id); // ✅ simpan user id
      const { data, error } = await supabase
        .from('profiles')
        .select('user_id, full_name')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchSubs = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from('subscription')
        .select(`
          subs_id,
          meal_type,
          delivery_days,
          total_price,
          meal_id
        `)
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching subscription:', error);
      } else {
        console.log('✅ Subscription found:', data);
        setSubs(data);
      }
    };

    fetchSubs();
  }, [userId]);

  const getPlanName = (mealId: string) => {
    switch (mealId) {
      case 'b3d417a1-f1a1-40d6-a217-698e128a249b':
        return 'Diet Plan';
      case '93cc2fdf-1efa-490c-8047-7ca0494ebec4':
        return 'Protein Plan';
      case 'cd50c45c-4410-43cc-adc8-09bd2bba7348':
        return 'Royal Plan';
      default:
        return 'Unknown Plan';
    }
  };

  const handleCancel = async () => {
    if (!userId || !subs) return;
    const confirmCancel = confirm('Are you sure you want to cancel your subscription?');
    if (!confirmCancel) return;

    const { error } = await supabase
      .from('subscription')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('Error cancelling subscription:', error);
    } else {
      setSubs(null);
      alert('Subscription cancelled successfully!');
    }
  };

  return (
    <div className="flex flex-col gap-y-10 pt-24 px-10">
      <div className="flex flex-col gap-y-1">
        <h1 className="font-bold text-3xl text-[#323232]">Hi, {profile?.full_name || 'User'}</h1>
        <h3>Manage your subscription below!</h3>
      </div>

      <div className="flex flex-col gap-y-2">
        <h2 className="font-semibold text-lg text-[#323232]">📦 Current Subscription</h2>

        {subs ? (
          <div className="bg-white border border-orange-200 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-orange-100">
                  <td className="px-4 py-3 font-medium text-[#323232] bg-orange-100">Meal Plan</td>
                  <td className="px-4 py-3">{getPlanName(subs.meal_id)}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-[#323232] bg-orange-100">Meal Types</td>
                  <td className="px-4 py-3">{subs.meal_type}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-[#323232] bg-orange-100">Delivery Days</td>
                  <td className="px-4 py-3">{subs.delivery_days}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#323232] bg-orange-100">Price per Week</td>
                  <td className="px-4 py-3 font-semibold text-orange-400">
                    Rp{subs.total_price?.toLocaleString('id-ID') || 0}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="p-4">
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Cancel Plan
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br bg-orange-100 rounded-lg p-8 text-center">
            <div className="mb-4 bg-transparent">
              <div className="mx-auto w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl bg-transparent">🍽️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 bg-transparent">No Active Subscription</h3>
              <p className="text-gray-600 mb-4 bg-transparent">
                You have not subscribed to any meal plan yet. Start your healthy eating journey today!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

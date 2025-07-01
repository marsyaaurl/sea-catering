'use client';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('Gagal logout: ' + error.message);
    } else {
      router.push('/Login');
    }
  };

  return (
    <div className='px-10 py-10'>
        <button onClick={handleLogout} className="bg-orange-400 rounded-lg font-semibold w-full py-2 text-white hover:bg-orange-200 hover:text-orange-400">
            Logout
        </button>
    </div>
  );
}

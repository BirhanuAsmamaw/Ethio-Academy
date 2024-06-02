'use client'
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CiLogout } from "react-icons/ci";
import CModal from '../customModal';

const LogoutComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onLogout = () => {
    setLoading(true);
    signOut().then(() => {
      router.back();
      router.refresh();
      toast.success("You have logged out successfully!");
    })
    .catch(() => {
      toast.error("An error occurred during logout!");
    })
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <CModal
      disabled={loading}
      buttonLabel={loading ? 'Loading...' : 'Log out'}
      onClick={onLogout}
      className='bg-transparent p-0 hover:bg-transparent hover:text-black hover:dark:text-white text-gray-600 dark:text-gray-200'
      modalName={
        <div className='w-full flex gap-x-2 items-center'>
          <CiLogout size={20} className='text-gray-500 dark:text-gray-400' />
          <span>Logout</span>
        </div>
      }
    >
      <h5 className="text-[20px] font-normal text-gray-600 dark:text-gray-400">
        Are you sure you want to logout?
      </h5>
    </CModal>
  );
}

export default LogoutComponent;

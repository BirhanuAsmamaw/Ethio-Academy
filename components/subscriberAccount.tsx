"use client"
import { Button } from '@/components/ui/button';
import { useSubscribeAccountMutation } from '@/redux/features/subscribers/subscriberApi';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface SubscriberAccountProps {
  className?: string;
  user?: any;
  accountId: string;
  is_subscriber: boolean;
}

const SubscriberAccount: React.FC<SubscriberAccountProps> = ({ user, accountId, is_subscriber, className }) => {
  const [subscribeAccount, { isSuccess, isLoading }] = useSubscribeAccountMutation();
  const router = useRouter();

  const onSubscribeAccount = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    await subscribeAccount({ user: user, accountId: accountId });
  };

  useEffect(() => {
    if (isSuccess) {
      router.refresh();
    }
  }, [isSuccess, router]);

  return (
    <Button
      disabled={isLoading}
      onClick={onSubscribeAccount}
      className={`
        text-gray-100
        hover:text-white
        font-mono
        text-sm
        transition
        rounded-full
        duration-300
        ${is_subscriber ? 'bg-slate-600 hover:bg-slate-700' : 'bg-rose-500 hover:bg-rose-600'}
        ${className}
      `}
    >
      {isLoading ? "Loading..." : is_subscriber ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
};

export default SubscriberAccount;

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  // const today = new Date();
  
  // const isToday = date.getDate() === today.getDate() &&
  //                 date.getMonth() === today.getMonth() &&
  //                 date.getFullYear() === today.getFullYear();

  // if (isToday) {
  //   return 'Present';
  // }

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

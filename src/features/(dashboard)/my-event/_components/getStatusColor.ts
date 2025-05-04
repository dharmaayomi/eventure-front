export const getStatusStyle = (isDeleted: boolean) => {
  return isDeleted
    ? {
        text: "Inactive",
        className: "text-gray-500 border border-gray-300",
      }
    : {
        text: "Active",
        className: "text-[#004DE8] bg-blue-50 border border-[#004DE8]",
      };
};

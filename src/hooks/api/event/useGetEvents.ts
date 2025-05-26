import useAxios from "@/hooks/useAxios";
import { CategoryName, Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetEventsQuery extends PaginationQueries {
  search?: string;
  category?: CategoryName;
}

const useGetEvents = (queries?: GetEventsQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Event>>(
        `/events`,
        { params: queries },
      );
      console.log("ini data event: ", data);
      return data;
    },
  });
};

export default useGetEvents;
// import useAxios from "@/hooks/useAxios";
// import { CategoryName, Event } from "@/types/event";
// import { PageableResponse, PaginationQueries } from "@/types/pagination";
// import { useQuery } from "@tanstack/react-query";

// interface GetEventsQuery extends PaginationQueries {
//   search?: string;
//   category?: CategoryName;
// }

// const useGetEvents = (queries?: GetEventsQuery) => {
//   const { axiosInstance } = useAxios();

//   return useQuery({
//     queryKey: ["events", queries],
//     queryFn: async () => {
//       const { data } = await axiosInstance.get<PageableResponse<Event>>(
//         `/events`,
//         { params: queries },
//       );
//       console.log(data);
//       return data;
//     },
//   });
// };

// export default useGetEvents;

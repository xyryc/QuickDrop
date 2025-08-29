
import { baseApi } from "@/redux/base.api";
import { IResponse, ISendOtp, IVerifyOtp } from "@/type";

export const authApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST", // 
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),


    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),


    allUsers: builder.query({
      query: () => ({
        url: "/users/allusers",
        method: "GET",
      }),
      providesTags: ["User"],

    }),


    changeUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/users/${userId}/status`,
        method: 'PATCH',
        data: { status },
      }),
      invalidatesTags: ["User"]
    }),


    userInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),


    parcel: builder.mutation({
      query: (parcelInfo) => ({
        url: "/parcels",
        method: "POST",
        data: parcelInfo,
      }),
    }),
    allparcels: builder.query({
      query: () => ({
        url: "/parcels/allparcels",
        method: "GET",
      }),
      providesTags: ["Parcel"],

    }),
    updateParcelStatus: builder.mutation({
      query: ({ parcelId, status, location, note }) => ({
        url: `/parcels/${parcelId}/status`,
        method: 'PATCH',
        data: {
          status,
          location,
          note
        },
      }),
      invalidatesTags: ["Parcel"]
    }),
    // --- New mutation for blocking a parcel ---
    blockParcel: builder.mutation({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}/block`,
        method: 'PATCH',
      }),
      invalidatesTags: ["Parcel"]
    }),

    unblockParcel: builder.mutation({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}/unblock`,
        method: 'PATCH',
      }),
      invalidatesTags: ["Parcel"]
    }),


    getUserStats: builder.query({
      query: () => ({
        url: "/users/stats",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getParcelStats: builder.query({
      query: () => ({
        url: "/parcels/stats",
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),



    // Sender User//


    getMyParcels: builder.query({
      query: () => ({
        url: "/parcels/my",
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),

    cancelParcel: builder.mutation({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),

    // --- নিউ মিউটেশন: পার্সেল আপডেট করা ---
    updateParcel: builder.mutation({
      query: ({ parcelId, data }) => ({
        url: `/parcels/${parcelId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["Parcel"],
    }),
    deleteParcel: builder.mutation({
      query: (parcelId: string) => ({
        url: `/parcels/${parcelId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Parcel'],
    }),

    //  Recever//
    getIncomingParcels: builder.query({
      query: () => ({
        url: "/parcels/incoming",
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),

    searchUserByEmail: builder.query({
      query: (email) => ({
        url: `/users/search?email=${email}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getDeliveredParcels: builder.query({
      query: () => ({
        url: "/parcels/delivered",
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),



    getSingleParcel: builder.query({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}`,
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),

    confirmParcel: builder.mutation({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}/confirm-delivery`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),



    updateUserProfile: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),


    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: data,
      }),

    }),

  }),

});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useLogoutMutation,

  useAllUsersQuery,
  useChangeUserStatusMutation,

  useParcelMutation,
  useAllparcelsQuery,
  useUpdateParcelStatusMutation,
  useBlockParcelMutation,
  useUnblockParcelMutation,


  useGetUserStatsQuery,
  useGetParcelStatsQuery,

  // Sender User
  useGetMyParcelsQuery,
  useCancelParcelMutation,
  useUpdateParcelMutation,
  useDeleteParcelMutation,

  // Reciver
  useGetIncomingParcelsQuery,
  useConfirmParcelMutation,
  useSearchUserByEmailQuery,
  useGetDeliveredParcelsQuery,
  useGetSingleParcelQuery,


  // My Profile Data 

  useUpdateUserProfileMutation,
  useChangePasswordMutation


} = authApi;
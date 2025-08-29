
// import ParcelCancel from "@/pages/Sender/ParcelCancel";
import ProfilePage from "@/pages/MyProfile/ProfilePage";
import ParcelCreate from "@/pages/Sender/ParcelCreate";
import ViewAllCreatedParcels from "@/pages/Sender/ViewAllCreatedParcels";
import { ISidebarItem } from "@/type";

export const senderSidebarItems : ISidebarItem[] = [
    {
      title: "Sender",
      items: [
        {
          title: "My Profile",
          url: "/sender/myprofile",
          component:ProfilePage,
        },
        {
          title: "Parcel Create",
          url: "/sender/parcelcreate",
          component:ParcelCreate,
        },
       
        {
          title: "View AllCreated Parcels",
          url: "/sender/viewallcreatedparcels",
          component:ViewAllCreatedParcels,
        },
      ],
    },
    
  ]
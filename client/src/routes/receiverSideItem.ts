
// import ConfirmParcelDelivery from "@/pages/Receiver/ConfirmParcelDelivery";
import ProfilePage from "@/pages/MyProfile/ProfilePage";
import ViewDeliveryHistory from "@/pages/Receiver/ViewDeliveryHistory";
import ViewIncomingParcels from "@/pages/Receiver/ViewIncomingParcels";
import { ISidebarItem } from "@/type";

export const receiverSidebarItems : ISidebarItem[] = [
    {
      title: "Receiver",
      items: [
        {
          title: "My Profile",
          url: "/receiver/myprofile",
          component:ProfilePage,
        },
        {
          title: "View Delivery History",
          url: "/receiver/viewdeliveryhistory",
          component:ViewDeliveryHistory,
        },
        {
          title: "View Incoming Parcels",
          url: "/receiver/viewincomingparcels",
          component:ViewIncomingParcels,
        },
      ],
    },
    
  ]


// src/modules/parcel/parcel.service.ts

import { Parcel } from './parcel.model';
import { IParcel, ICreateParcelPayload, IUpdateParcelStatusPayload, IParcelStatus } from './parcel.interface';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errorHelpers/AppError';
import httpStatus from "http-status-codes";
import { IUserRole, } from '../user/user.interface';
import { Types } from 'mongoose';
import { User } from '../user/user.model';


const prepareParcelResponse = (parcel: IParcel): IParcel => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ...rest } = (parcel as any).toJSON();
  return rest as IParcel;
};

// Helper function to generate a unique tracking ID
const generateTrackingId = (): string => {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  const randomChars = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `TRK-${formattedDate}-${randomChars}`;
};



// eslint-disable-next-line @typescript-eslint/no-explicit-any

const createParcel = async (
  payload: ICreateParcelPayload,
  senderId: string
): Promise<IParcel> => {

  const receiverUser = await User.findOne({ email: payload.receiver.email }).lean();

  if (!receiverUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Receiver not found with this email.");
  }
  if (receiverUser.role !== IUserRole.Receiver) {
    throw new AppError(httpStatus.BAD_REQUEST, `Parcel can only be sent to a user with the role of '${IUserRole.Receiver}'.`);
  }

  if (receiverUser._id.toString() === senderId.toString()) {
    throw new AppError(httpStatus.BAD_REQUEST, "You cannot send a parcel to yourself.");
  }

  const newParcelData: IParcel = {
    parcelType: payload.parcelType,
    weight: payload.weight,
    deliveryAddress: payload.deliveryAddress,
    trackingId: generateTrackingId(),
    sender: new Types.ObjectId(senderId),
    receiver: {
      name: payload.receiver.name,
      phone: payload.receiver.phone,
      email: payload.receiver.email,
      address: payload.receiver.address,
      userId: receiverUser._id,
    },
    currentStatus: IParcelStatus.Requested,
    isCancelled: false,
    isDelivered: false,
    statusLogs: [
      {
        status: IParcelStatus.Requested,
        timestamp: new Date(),
        updatedBy: new Types.ObjectId(senderId),
        note: 'Parcel delivery request created by sender',
      },
    ],
  };

  const newParcel = await Parcel.create(newParcelData);
  return prepareParcelResponse(newParcel);
};


const updateParcel = async (
  parcelId: string,
  payload: Partial<IParcel>,
  // userId: string
): Promise<IParcel | null> => {
  // ১. পার্সেল খুঁজে বের করা
  const parcel = await Parcel.findById(parcelId);

  if (!parcel) {
    throw new AppError(httpStatus.NOT_FOUND, 'Parcel not found!');
  }


  if (parcel.currentStatus !== 'Requested' && parcel.currentStatus !== 'Cancelled') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You can only edit parcels with "Requested" or "Cancelled" status.'
    );
  }

  if (payload.receiver && payload.receiver.email) {
    const receiverUser = await User.findOne({ email: payload.receiver.email });
    if (!receiverUser) {
      throw new AppError(httpStatus.NOT_FOUND, "Receiver not found with this email.");
    }
    if (receiverUser.role !== IUserRole.Receiver) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Parcel can only be sent to a user with the role of '${IUserRole.Receiver}'.`
      );
    }
    // রিসিভারের পুরো অবজেক্ট আপডেট করা
    payload.receiver = {
      ...parcel.receiver, // আগের ডেটা রাখা
      ...payload.receiver, // নতুন ডেটা দিয়ে ওভাররাইট করা
      userId: receiverUser._id, // নতুন ইউজার আইডি সেট করা
    };
  }

  // ৫. পার্সেল আপডেট করা
  const result = await Parcel.findByIdAndUpdate(parcelId, payload, { new: true, runValidators: true });

  if (!result) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to update the parcel.");
  }
  
  return prepareParcelResponse(result);
};










// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllParcels = async (filters: any, pagination: any): Promise<{ data: IParcel[], meta: { page: number, limit: number, total: number } }> => {
  const { page = 1, limit = 50 } = pagination;
  const skip = (page - 1) * limit;

  const total = await Parcel.countDocuments(filters);
  const parcels = await Parcel.find(filters).skip(skip).limit(limit).populate('sender').populate('receiver.userId');

  const data = parcels.map(parcel => prepareParcelResponse(parcel as IParcel));
  const meta = { page, limit, total };

  return { data, meta };
};



const getSingleParcel = async (parcelId: string, user: JwtPayload): Promise<IParcel | null> => {
  const parcel = await Parcel.findById(parcelId).populate('sender');


  console.log("ppp", parcel);
  if (!parcel) {
    throw new AppError(httpStatus.NOT_FOUND, 'Parcel not found');
  }

  // if (user.role === IUserRole.Admin || parcel.sender.toString() === user.userId || parcel.receiver.userId?.toString() === user.userId) {
  //   return prepareParcelResponse(parcel as IParcel);
  // }
  if (user.role === IUserRole.Admin || user.role === IUserRole.Sender || user.role === IUserRole.Receiver) {
    return prepareParcelResponse(parcel as IParcel);
  }

  throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized to view this parcel');
};


// src/modules/parcel/parcel.service.ts




const cancelParcel = async (parcelId: string, senderId: string): Promise<IParcel> => {
  const parcel = await Parcel.findById(parcelId);

  if (!parcel) {
    throw new AppError(httpStatus.NOT_FOUND, 'Parcel not found');
  }


  if (parcel.sender.toString() !== senderId.toString()) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized to cancel this parcel');
  }


  if (parcel.currentStatus !== IParcelStatus.Requested && parcel.currentStatus !== IParcelStatus.Approved) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Parcel cannot be cancelled as it has already been dispatched');
  }

  const updatedParcel = await Parcel.findByIdAndUpdate(
    parcelId,
    {
      isCancelled: true,
      currentStatus: IParcelStatus.Cancelled,
      $push: {
        statusLogs: {
          status: IParcelStatus.Cancelled,
          timestamp: new Date(),
          updatedBy: new Types.ObjectId(senderId.toString()),
          note: 'Parcel was cancelled by sender',
        },
      },
    },
    { new: true }
  );

  return prepareParcelResponse(updatedParcel as IParcel);
};


const updateParcelStatus = async (
  parcelId: string,
  payload: IUpdateParcelStatusPayload,
  adminId: string
): Promise<IParcel> => {
  const parcel = await Parcel.findById(parcelId);
  if (!parcel) {
    throw new AppError(httpStatus.NOT_FOUND, 'Parcel not found');
  }

  const currentStatus = parcel.currentStatus;
  const newStatus = payload.status;

  if (
    (currentStatus === IParcelStatus.Requested && newStatus !== IParcelStatus.Approved && newStatus !== IParcelStatus.Cancelled && newStatus !== IParcelStatus.Held) ||
    (currentStatus === IParcelStatus.Approved && newStatus !== IParcelStatus.Dispatched && newStatus !== IParcelStatus.Cancelled && newStatus !== IParcelStatus.Held) ||
    (currentStatus === IParcelStatus.Dispatched && newStatus !== IParcelStatus.InTransit && newStatus !== IParcelStatus.Delivered) ||
    (currentStatus === IParcelStatus.InTransit && newStatus !== IParcelStatus.Delivered) ||
    (currentStatus === IParcelStatus.Delivered || currentStatus === IParcelStatus.Cancelled || currentStatus === IParcelStatus.Returned)
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, `Cannot change status from ${currentStatus} to ${newStatus}`);
  }

  if (parcel.isCancelled || parcel.isDelivered) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Cannot update a cancelled or delivered parcel.');
  }

  const updatedParcel = await Parcel.findByIdAndUpdate(
    parcelId,
    {
      currentStatus: newStatus,
      $push: {
        statusLogs: {
          status: newStatus,
          timestamp: new Date(),
          updatedBy: new Types.ObjectId(adminId),
          location: payload.location,
          note: payload.note,
        },
      },
    },
    { new: true }
  );

  return prepareParcelResponse(updatedParcel as IParcel);
};



// const getMyParcels = async (senderId: string): Promise<IParcel[]> => {
//   const parcels = await Parcel.find({ sender: new Types.ObjectId(senderId) }).populate('sender').populate('receiver.userId')
//   return parcels.map(parcel => prepareParcelResponse(parcel as IParcel));
// };


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getMyParcels = async (senderId: string, filters: any, pagination: any): Promise<{ data: IParcel[], meta: { page: number, limit: number, total: number } }> => {
  const { page = 1, limit = 10 } = pagination;
  const skip = (page - 1) * limit;

  const queryFilters = { ...filters, sender: new Types.ObjectId(senderId) };
  const total = await Parcel.countDocuments(queryFilters);
  const parcels = await Parcel.find(queryFilters).skip(skip).limit(limit).populate('sender').populate('receiver.userId');

  const data = parcels.map(parcel => prepareParcelResponse(parcel as IParcel));
  const meta = { page, limit, total };

  return { data, meta };
};
// const getIncomingParcels = async (receiverId: string): Promise<IParcel[]> => {
//   const parcels = await Parcel.find({ 'receiver.userId': new Types.ObjectId(receiverId) }).populate('sender').populate('receiver.userId');
//   return parcels.map(parcel => prepareParcelResponse(parcel as IParcel));
// };





// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getIncomingParcels = async (receiverId: string, filters: any, pagination: any): Promise<{ data: IParcel[], meta: { page: number, limit: number, total: number } }> => {
  const { page = 1, limit = 10 } = pagination;
  const skip = (page - 1) * limit;

  const queryFilters = { ...filters, 'receiver.userId': new Types.ObjectId(receiverId) };
  const total = await Parcel.countDocuments(queryFilters);
  const parcels = await Parcel.find(queryFilters).skip(skip).limit(limit).populate('sender').populate('receiver.userId');

  const data = parcels.map(parcel => prepareParcelResponse(parcel as IParcel));
  const meta = { page, limit, total };

  return { data, meta };
};

const confirmDelivery = async (parcelId: string, receiverId: string): Promise<IParcel> => {
  const parcel = await Parcel.findById(parcelId);

  if (!parcel) {
    throw new AppError(httpStatus.NOT_FOUND, 'Parcel not found');
  }

  // Authorization: Check if the logged-in user is the actual receiver
  if (parcel.receiver.userId?.toString() !== receiverId.toString()) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized to confirm this delivery');
  }

  // Business Rule: Check if the parcel is in the correct status for delivery confirmation
  if (parcel.currentStatus !== IParcelStatus.InTransit) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Parcel status must be "In Transit" to be confirmed as delivered.');
  }

  // Update parcel status
  const updatedParcel = await Parcel.findByIdAndUpdate(
    parcelId,
    {
      isDelivered: true,
      currentStatus: IParcelStatus.Delivered,
      $push: {
        statusLogs: {
          status: IParcelStatus.Delivered,
          timestamp: new Date(),
          updatedBy: new Types.ObjectId(receiverId.toString()),
          note: 'Delivery confirmed by receiver.',
        },
      },
    },
    { new: true }
  );

  return prepareParcelResponse(updatedParcel as IParcel);
};

// New service function for blocking a parcel
const updateParcelBlockStatus = async (
  parcelId: string,
  isBlocked: boolean,
  adminId: string,
  note?: string
): Promise<IParcel> => {
  const parcel = await Parcel.findById(parcelId);

  if (!parcel) {
    throw new AppError(httpStatus.NOT_FOUND, 'Parcel not found');
  }

  // Check if the parcel is already in the desired state
  if (parcel.isBlocked === isBlocked) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Parcel is already ${isBlocked ? 'blocked' : 'unblocked'}.`
    );
  }

  const updatedParcel = await Parcel.findByIdAndUpdate(
    parcelId,
    {
      isBlocked: isBlocked,
      $push: {
        statusLogs: {
          status: isBlocked ? IParcelStatus.Held : parcel.currentStatus, // If blocked, status can be 'Held'. Or you can create a new status for blocked
          timestamp: new Date(),
          updatedBy: new Types.ObjectId(adminId),
          note: note || `Parcel was ${isBlocked ? 'blocked' : 'unblocked'}.`,
        },
      },
    },
    { new: true }
  );

  return updatedParcel as IParcel;
};


const getPublicParcel = async (trackingId: string): Promise<IParcel | null> => {
  const parcel = await Parcel.findOne({ trackingId }).lean();
  if (!parcel) {
    throw new AppError(httpStatus.NOT_FOUND, 'Parcel not found');
  }

  // You might want to remove sensitive data like sender/receiver IDs here
  // But since you're using lean(), it's a good practice to ensure it's not exposed.
  // For now, prepareParcelResponse should be sufficient.
  return (parcel as IParcel);
};




const getParcelStats = async (): Promise<{
  totalParcels: number;
  deliveredCount: number;
  inTransitCount: number;
  approvedCount: number;
  returnedCount: number;
  cancelledCount: number;
}> => {
  const stats = await Parcel.aggregate([
    {
      $group: {
        _id: null,
        totalParcels: { $sum: 1 },
        deliveredCount: {
          $sum: {
            $cond: [{ $eq: ['$currentStatus', IParcelStatus.Delivered] }, 1, 0]
          }
        },
        inTransitCount: {
          $sum: {
            $cond: [{ $eq: ['$currentStatus', IParcelStatus.InTransit] }, 1, 0]
          }
        },
        approvedCount: {
          $sum: {
            $cond: [{ $eq: ['$currentStatus', IParcelStatus.Approved] }, 1, 0]
          }
        },
        returnedCount: {
          $sum: {
            $cond: [{ $eq: ['$currentStatus', IParcelStatus.Returned] }, 1, 0]
          }
        },
        cancelledCount: {
          $sum: {
            $cond: [{ $eq: ['$currentStatus', IParcelStatus.Cancelled] }, 1, 0]
          }
        },
      }
    },
    {
      $project: {
        _id: 0,
        totalParcels: 1,
        deliveredCount: 1,
        inTransitCount: 1,
        approvedCount: 1,
        returnedCount: 1,
        cancelledCount: 1,
      }
    }
  ]);

  // If no parcels are found, return default values of 0
  return stats[0] || {
    totalParcels: 0,
    deliveredCount: 0,
    inTransitCount: 0,
    approvedCount: 0,
    returnedCount: 0,
    cancelledCount: 0,
  };
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDeliveredParcels = async (receiverId: string, pagination: any): Promise<{ data: IParcel[], meta: { page: number, limit: number, total: number } }> => {
  const { page = 1, limit = 50 } = pagination;
  const skip = (page - 1) * limit;

  const queryFilters = { currentStatus: IParcelStatus.Delivered, 'receiver.userId': new Types.ObjectId(receiverId) };

  const total = await Parcel.countDocuments(queryFilters);
  const parcels = await Parcel.find(queryFilters)
    .skip(skip)
    .limit(limit)
    .populate('sender')
    .populate('receiver.userId');

  const data = parcels.map(parcel => prepareParcelResponse(parcel as IParcel));
  const meta = { page, limit, total };

  return { data, meta };
};



const deleteParcel = async (parcelId: string): Promise<IParcel | null> => {
  const parcelToDelete = await Parcel.findById(parcelId);
  if (!parcelToDelete) {
    throw new AppError(httpStatus.NOT_FOUND, 'Parcel not found');
  }

  if (parcelToDelete.currentStatus !== 'Requested' && parcelToDelete.currentStatus !== 'Cancelled') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You can only delete parcels with "Requested" or "Cancelled" status.'
    );
  }


  const deletedParcel = await Parcel.findByIdAndDelete(parcelId);


  if (!deletedParcel) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete the parcel');
  }

  return prepareParcelResponse(deletedParcel as IParcel);
};

export const ParcelServices = {
  createParcel,
  updateParcel,
  getAllParcels,
  getMyParcels,
  getSingleParcel,
  getIncomingParcels,
  cancelParcel,
  updateParcelStatus,
  updateParcelBlockStatus,
  deleteParcel,
  confirmDelivery,
  getPublicParcel,
  getDeliveredParcels,
  getParcelStats
};

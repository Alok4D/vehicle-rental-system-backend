import prisma from '../../utlis/prisma';

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
    },
  });
  return users;
};

const updateUser = async (
  userId: number,
  userRole: string,
  loggedInUserId: number,
  payload: any
) => {
  // If customer, they can only update their own profile and cannot change role
  if (userRole === 'customer') {
    if (userId !== loggedInUserId) {
      throw new Error('You can only update your own profile');
    }
    if (payload.role) {
      delete payload.role; // Prevent customer from escalating privileges
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
    },
  });

  return updatedUser;
};

const deleteUser = async (userId: number) => {
  // Check if user has active bookings
  const activeBookings = await prisma.booking.findMany({
    where: {
      customer_id: userId,
      status: 'active',
    },
  });

  if (activeBookings.length > 0) {
    throw new Error('Cannot delete user with active bookings');
  }

  await prisma.user.delete({
    where: { id: userId },
  });
  return null;
};

export const UserServices = {
  getAllUsers,
  updateUser,
  deleteUser,
};

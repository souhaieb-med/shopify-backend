import Order from "../models/Order.js";

//create Order
export const addOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    next(err);
  }
};

//update Order
export const updateOrder = async (req, res, next) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

//delete Order
export const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    next(err);
  }
};

//get user Order
export const getUserOrder = async (req, res, next) => {
  try {
    const Order = await Order.findOne({ userId: req.params.userId });
    res.status(200).json(Order);
  } catch (err) {
    next(err);
  }
};

//get all Orders
export const getAllOrders = async (req, res, next) => {
  try {
    const Orders = await Order.find();
    res.status(200).json(Orders);
  } catch (err) {
    next(err);
  }
};

//GET MONTHLY ORDERS
export const getMonnthlyOrders = async(req,res,next)=>{
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    next(err)
  }
}
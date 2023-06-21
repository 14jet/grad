const createError = require("../../helpers/errorCreator");
const Order = require("../../models/order.model");

module.exports.updateOrderStatus = async (req, res, next) => {
  try {
    const _id = req.body._id;
    const order = await Order.findById(_id);
    if (!order) {
      return next(createError(new Error(""), 400, "Không tìm thấy đơn hàng"));
    }

    order.solved = !order.solved;
    await order.save();

    return res.status(200).json({
      message: "Thành công",
      data: order,
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.getOrders = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = 10;
    const orders = await Order.find({ deleted: false })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const totalCount = await Order.find({ deleted: false }).count();

    const getLocalTimeString = require("../../helpers/getLocalTimeString");
    return res.status(200).json({
      data: orders.map((item) => ({
        ...item._doc,
        updatedAtString: getLocalTimeString(item.updatedAt),
      })),
      metadata: {
        totalPage: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.deleteOrder = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const order = await Order.findById(_id);
    if (!order) {
      return next(createError(new Error(""), 400, "Không tìm thấy đơn hàng"));
    }

    order.deleted = true;
    await order.save();

    return res.status(200).json({
      message: "Thành công",
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

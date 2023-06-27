const createError = require("../../helpers/errorCreator");
const Visa = require("../../models/visa.model");
const User = require("../../models/user.model");
const mongoose = require("mongoose");
const paypal = require("../../helpers/paypal");
const VisaOrder = require("../../models/visa-order.model");
const { getSocketIO } = require("../../connections/socket.io/socketIO.init");
const io = getSocketIO();
const getLocalTimeString = require("../../helpers/getLocalTimeString");
const { main: sendMail } = require("../../helpers/nodemailer");


module.exports.getVisas = async (req, res, next) => {
  try {
    const lang = req.lang;

    let visas = [];
    if (lang === "vi") {
      visas = await Visa.aggregate([
        {
          $match: {
            deleted: false
          }
        },
        {
          $lookup: {
            from: "places",
            foreignField: "_id",
            localField: "country",
            as: "country",
            pipeline: [
              {
                $project: {
                  en: 0,
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "visacategories",
            foreignField: "_id",
            localField: "type",
            as: "type",
            pipeline: [
              {
                $project: {
                  en: 0,
                },
              },
            ],
          },
        },
        {
          $set: {
            country: {
              $arrayElemAt: ["$country", 0],
            },
            type: {
              $arrayElemAt: ["$type", 0],
            },
          },
        },
        {
          $project: {
            en: 0,
            terms: 0,
            price_policies: 0,
            detail: 0,
            price: 0,
          },
        },
      ]);
    }

    if (lang === "en") {
      visas = await Visa.aggregate([
        {
          $match: {
            deleted: false
          }
        },
        {
          $lookup: {
            from: "places",
            localField: "country",
            foreignField: "_id",
            as: "country",
            pipeline: [
              {
                $set: {
                  name: "$en.name",
                },
              },
              {
                $project: {
                  en: 0,
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "visacategories",
            localField: "type",
            foreignField: "_id",
            as: "type",
            pipeline: [
              {
                $set: {
                  name: "$en.name",
                },
              },
              {
                $project: {
                  en: 0,
                },
              },
            ],
          },
        },
        {
          $set: {
            country: {
              $arrayElemAt: ["$country", 0],
            },
            type: {
              $arrayElemAt: ["$type", 0],
            },
            name: "$en.name",
          },
        },
        {
          $project: {
            en: 0,
            detail: 0,
            terms: 0,
            price_policies: 0,
          },
        },
      ]);
    }

    const getUrl = require("../../helpers/urlFromPath");
    return res.status(200).json({
      data: visas.map((visa) => ({
        ...visa._doc,
        country: {
          _id: visa.country._id,
          slug: visa.country.slug,
          name: visa.country.name,
          image: visa.country.image ? getUrl(visa.country.image) : '',
        },
      })),
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};


module.exports.getVisasByCountry = async (req, res, next) => {
  try {
    const lang = req.lang;
    const { country } = req.params;

    let visas = [];
    if (lang === "vi") {
      visas = await Visa.aggregate([
        {
          $match: {
            country: new mongoose.Types.ObjectId(country),
            deleted: false
          },
        },
        {
          $lookup: {
            from: "places",
            foreignField: "_id",
            localField: "country",
            as: "country",
            pipeline: [
              {
                $project: {
                  en: 0,
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "visacategories",
            foreignField: "_id",
            localField: "type",
            as: "type",
            pipeline: [
              {
                $project: {
                  en: 0,
                },
              },
            ],
          },
        },
        {
          $set: {
            country: {
              $arrayElemAt: ["$country", 0],
            },
            type: {
              $arrayElemAt: ["$type", 0],
            },
          },
        },
        {
          $project: {
            en: 0,
          },
        },
      ]);
    }

    if (lang === "en") {
      visas = await Visa.aggregate([
        {
          $match: {
            country: new mongoose.Types.ObjectId(country),
            deleted: false
          },
        },
        {
          $lookup: {
            from: "places",
            foreignField: "_id",
            localField: "country",
            as: "country",
            pipeline: [
              {
                $set: {
                  name: "$en.name",
                },
              },
              {
                $project: {
                  en: 0,
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "visacategories",
            foreignField: "_id",
            localField: "type",
            as: "type",
            pipeline: [
              {
                $set: {
                  name: "$en.name",
                },
              },
              {
                $project: {
                  en: 0,
                },
              },
            ],
          },
        },
        {
          $set: {
            country: {
              $arrayElemAt: ["$country", 0],
            },
            type: {
              $arrayElemAt: ["$type", 0],
            },
            name: "$en.name",
            term: "$en.term",
            priceIncudes: "$en.priceIncudes",
            priceExcludes: "$en.priceExcludes",
            cancellationPolicy: "$en.cancellationPolicy",
            detail: "$en.detail",
          },
        },
        {
          $project: {
            en: 0,
          },
        },
      ]);
    }

    return res.status(200).json({
      data: visas,
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.createPaypalOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await VisaOrder.findOne({
      _id: orderId,
    });

    order.status = "is_creating_order";
    io.to("ADMIN").emit("UPDATE_VISA_PAYMENT", order._doc);
    try {
      const paypalOrder = await paypal.createOrder(
        order.price * order.passengers
      );
      order.status = "created_order";
      order.paypalOrderId = paypalOrder.id;
      await order.save();
      io.to("ADMIN").emit("UPDATE_VISA_PAYMENT", order._doc);
      return res.status(200).json({
        data: { paypalOrderId: paypalOrder.id },
      });
    } catch (error) {
      order.status = "failed_to_create_order";
      order.error = error.response
        ? error.response.data.message
        : error.message;
      await order.save();
      io.to("ADMIN").emit("UPDATE_VISA_PAYMENT", order._doc);
      throw error;
    }
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.capturePaypalOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await VisaOrder.findOne({ _id: orderId });
    order.status = "is_capturing";

    try {
      const captureData = await paypal.capturePayment(order.paypalOrderId);
      order.status = "succeeded";
      order.paypalTransactionId = captureData.id;
      await order.save();
      io.to("ADMIN").emit("UPDATE_VISA_PAYMENT", order._doc);
      
      // send mail
      const user = await User.findOne({
        role: "admin",
      });
      const ownerEmail = user.username;
      let html = `<div>
      <h1>Thông báo: có khách thanh toán visa</h1>
      <h2>Đặt lúc: ${getLocalTimeString(new Date(order.updatedAt))}</h2>
      <br>
      <ul>
        <li>Họ tên: ${order.fullname}</li>
        <li>SĐT: ${order.phone}</li>
        <li>Email: ${order.email}</li>
        <li>Địa chỉ: ${order.address}</li>
        <li>Số khách: ${order.passengers}</li>
        <li>Ngày khởi hành: ${getLocalTimeString(new Date(order.date))}</li>
        <li>Tên dịch vụ: ${order.visaName}</li>
        <li>Giá: ${order.price}</li>

      </ul>
      </div>`;

      const config = {
        to: ownerEmail,
        subject: "Thông báo: có khách hàng thanh toán visa",
        text: "Thông báo: có khách hàng thanh toán visa",
        html: html,
      };

      await sendMail(config);
      return res.status(200).json(captureData);
    } catch (error) {
      order.status = "failed_to_capture";

      if (error.response) {
        order.error = error.response.data.details
          .map((item) => `${item.issue}: ${item.description}`)
          .join(", ");
        const clientError = error.response.data.details
          .map((item) => item.description)
          .join(", ");
        await order.save();
        io.to("ADMIN").emit("UPDATE_VISA_PAYMENT", order._doc);
        return next(createError(new Error(""), 400, clientError));
      }

      order.error = error.message;
      await order.save();
      io.to("ADMIN").emit("UPDATE_VISA_PAYMENT", order._doc);
      throw error;
    }
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.order = async (req, res, next) => {
  try {
    const visaBookingData = req.body;
    const visa = await Visa.findOne({ _id: req.body.visaId });

    if (!visa) {
      return next(
        createError(new Error(""), 400, {
          en: "Visa not found",
          vi: "Khong tim thay visa",
        })
      );
    }

    const order = await VisaOrder.create({
      ...visaBookingData,
      visaName: visa.name,
    });
    return res.status(200).json({
      data: order,
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.getOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await VisaOrder.findOne({ _id: orderId });
    if (order.status === "succeeded") {
      return res.status(200).json({
        data: {
          status: "succeeded",
        },
      });
    }

    const clientToken = await paypal.generateClientToken();
    return res.status(200).json({
      data: order,
      metadata: {
        clientToken,
      },
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

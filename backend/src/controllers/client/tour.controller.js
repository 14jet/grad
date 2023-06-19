const { main: sendMail } = require("../../helpers/nodemailer");
const createError = require("../../helpers/errorCreator");
const Tour = require("../../models/tour.model");
const Order = require("../../models/order.model");
const User = require("../../models/user.model");
const getLocalTimeString = require("../../helpers/getLocalTimeString");
const { getSocketIO } = require("../../connections/socket.io/socketIO.init");
const {
  default: formatRelativeWithOptions,
} = require("date-fns/fp/formatRelativeWithOptions");
const io = getSocketIO();

module.exports.getTours = async (req, res, next) => {
  try {
    const lang = req.lang;

    let tours = [];
    if (lang === "vi") {
      tours = await Tour.aggregate([
        {
          $match: {
            deleted: false,
          },
        },
        {
          $lookup: {
            from: "places",
            localField: "destinations",
            foreignField: "_id",
            as: "destinations",
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
          $project: {
            en: 0,
            itinerary: 0,
            terms: 0,
            pricePolicies: 0,
            description: 0,
          },
        },
      ]);
    }

    if (lang === "en") {
      tours = await Tour.aggregate([
        {
          $match: {
            deleted: false,
          },
        },
        {
          $lookup: {
            from: "places",
            localField: "destinations",
            foreignField: "_id",
            as: "destinations",
            pipeline: [
              {
                $project: {
                  name: 0,
                },
              },
              {
                $set: {
                  name: "$en.name",
                },
              },
            ],
          },
        },
        {
          $set: {
            name: "$en.name",
          },
        },
        {
          $project: {
            en: 0,
            description: 0,
            itinerary: 0,
          },
        },
      ]);
    }

    const getUrl = require("../../helpers/urlFromPath");
    return res.status(200).json({
      data: tours.map((tour) => ({
        _id: tour._id,
        code: tour.code,
        slug: tour.slug,
        price: tour.price,
        name: tour.name,
        days: tour.days,
        nights: tour.nights,
        destinations: tour.destinations,
        thumb: getUrl(tour.thumb),
      })),
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.getTourBySlug = async (req, res, next) => {
  try {
    const lang = req.lang;

    const { slug } = req.params;
    let tour = await Tour.findOne({ slug: slug, deleted: false }).populate(
      "destinations"
    );

    if (!tour) {
      return next(
        createError(new Error(""), 404, {
          en: "Tour Not Found",
          vi: "Không tìm thấy tour",
        })
      );
    }

    const getUrl = require("../../helpers/urlFromPath");
    let result = {
      _id: tour._id,
      code: tour.code,
      slug: tour.slug,
      price: tour.price,
      departureDates: tour.departureDates,
      days: tour.days,
      nights: tour.nights,
      thumb: getUrl(tour.thumb),
      startAt: tour.startAt,
    };

    if (lang === "vi") {
      const destinations = tour.destinations.map((item) => ({
        name: item.name,
        slug: item.slug,
        region: item.region,
        continent: item.continent,
        type: item.type,
        _id: item._id,
      }));

      result = {
        ...result,
        name: tour.name,
        description: tour.description,
        journey: tour.journey,
        destinations: destinations,
        itinerary: tour.itinerary.map((iti) => ({
          _id: iti._id,
          id: iti.id,
          day: iti.day,
          destination: iti.destination,
          content: iti.content,
          images: iti.images.map((img) => ({
            _id: img._id,
            url: getUrl(img.url),
            caption: img.caption,
          })),
        })),

        priceIncludes: tour.priceIncludes,
        priceExcludes: tour.priceExcludes,
        registrationPolicy: tour.registrationPolicy,
        cancellationPolicy: tour.cancellationPolicy,
      };
    }

    tour.departureDates = tour.departureDates?.filter(
      (date) => new Date(date).getTime() > Date.now()
    );

    if (lang === "en") {
      let itinerary = tour.en.itinerary.map((iti, index) => {
        return {
          ...iti,
          images: iti.images.map((imageItem, imageIndex) => ({
            ...imageItem,
            url: getUrl(tour.itinerary[index].images[imageIndex].url),
          })),
        };
      });

      const destinations = tour.destinations.map((item) => ({
        _id: item._id,
        name: item.en.name,
        slug: item.slug,
        region: item.region,
        continent: item.continent,
        type: item.type,
      }));

      result = {
        ...result,
        name: tour.en.name,
        description: tour.en.description,
        journey: tour.en.journey,
        destinations: destinations,
        itinerary: itinerary,
        priceIncludes: tour.en.priceIncludes,
        priceExcludes: tour.en.priceExcludes,
        registrationPolicy: tour.en.registrationPolicy,
        cancellationPolicy: tour.en.cancellationPolicy,
      };
    }

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.bookTour = async (req, res, next) => {
  try {
    const {
      fullname,
      tourCode,
      phone,
      gender,
      adult,
      children,
      departureDate,
    } = req.body;

    const newOrder = await Order.create({
      type: "tour",
      fullname,
      phone,
      gender,
      otherDetails: {
        tourCode,
        adult,
        children,
        departureDate,
      },
    });

    io.to("ADMIN").emit("NEW_ORDER", {
      ...newOrder._doc,
      message: newOrder.getVerboseType(),
    });

    // send mail
    const user = await User.findOne({
      role: "admin",
    });
    const ownerEmail = user.username;
    let html = `<div>
    <h1>Thông báo: có khách hàng đặt tour</h1>
    <h2>Đặt lúc: ${getLocalTimeString(new Date())}</h2>
    <br>
    <ul>
      <li>Mã tour: ${tourCode}</li>
      <li>Họ tên: ${fullname}</li>
      <li>SĐT: ${phone}</li>
      <li>Giới tính: ${gender}</li>
      <li>Số người lớn: ${adult}</li>
      <li>Số trẻ em: ${children}</li>
      <li>Ngày khởi hành: ${getLocalTimeString(new Date(departureDate), {
        time: false,
      })}</li>
    </ul>
    </div>`;

    const config = {
      to: ownerEmail,
      subject: "Thông báo: có khách hàng đặt tour",
      text: "Thông báo: có khách hàng đặt tour",
      html: html,
    };

    await sendMail(config);

    return res.status(200).json({
      message: {
        en: "Thành công",
        vi: "Thành công",
      },
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.callMeBack = async (req, res, next) => {
  try {
    const { tourCode, fullname, phone, gender } = req.body;

    const newOrder = await Order.create({
      type: "call",
      fullname,
      phone,
      gender,
      otherDetails: {
        tourCode,
      },
    });

    io.to("ADMIN").emit("NEW_ORDER", {
      ...newOrder._doc,
      message: newOrder.getVerboseType(),
    });

    // send mail
    const user = await User.findOne({
      role: "admin",
    });
    const ownerEmail = user.username;
    let html = `<h1>Thông báo: có khách hàng yêu cầu tư vấn đặt tour</h1>
      <h2>Yêu cầu lúc: ${getLocalTimeString(new Date())}</h2>
      <br>
      <ul>
        <li>Họ tên: ${fullname}</li>
        <li>SĐT: ${phone}</li>
        <li>Giới tính: ${gender}</li>
        <li>Mã tour: ${tourCode}</li>
      </ul>`;

    const config = {
      to: ownerEmail,
      subject: "Thông báo: có khách hàng yêu cầu tư vấn đặt tour",
      text: "Thông báo: có khách hàng yêu cầu tư vấn đặt tour",
      html: html,
    };

    await sendMail(config);

    return res.status(200).json({
      message: {
        en: "Success",
        vi: "Thành công",
      },
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

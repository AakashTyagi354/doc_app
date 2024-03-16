const Razorpay = require("razorpay");
const crypto = require("crypto");

exports.checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    console.log(options)
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("sig received", razorpay_signature);
  console.log("sig generated", expectedSignature);

  // if authentic then save it databse
  if (expectedSignature.length > 0) {
    res.redirect(
      `http://localhost:3000/medicines/paymentsuccess/${razorpay_payment_id}`
    );
  }

  res.status(200).json({
    success: true,
    data: { razorpay_payment_id, razorpay_order_id, razorpay_signature },
  });
};

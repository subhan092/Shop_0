const { prototype } = require("nodemailer/lib/json-transport");
const OrderModel = require("../models/OrderModel");
const productModel = require("../models/ProductModel");
const { message } = require("../validation/User/UserValidate");

const createOrder = async (req, resp) => {
  try {
    const { cart, user, seller } = req.body;
    const shopItemsMap = new Map();

    // Group cart items by shopId
    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }

    // Avoid creating multiple orders for the same shop
    const orders = [];

    // Loop through grouped items by shop
    for (const [shopId, items] of shopItemsMap) {
      // Check if an order for this shop already exists
      const existingOrder = await OrderModel.findOne({ user: user._id, seller: shopId });

      if (!existingOrder) {
        // Create an order for the shop if it doesn't exist
        const order = await OrderModel.create({
          cart: items,
          user: user._id,
          seller: seller._id,
        });
        orders.push(order);
      } else {
        console.log(`Order already exists for shop ${shopId}`);
      }
    }

    resp.status(201).json({
      message: 'Order created successfully',
      orders,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    resp.status(500).json({ error: "Failed to create order" });
  }
};


const getUserOrder = async (req, resp) => {
  try {
      const orders = await OrderModel.find({user: req.params.userId }).lean(); // lean() se plain JS objects milenge
      
      if (!orders || orders.length === 0) {
          return resp.status(400).json({ message: "No order found" });
      }

      resp.status(200).json({
          orders,
      });
  } catch (error) {
      console.log("Error in get user order:", error);
      resp.status(500).json({ error: error.message });
  }
};

const getShopOrder = async (req, resp) => {
  const {shopId} = req.params
  console.log('shopid parmas',shopId)
  try {
      const shoporders = await OrderModel.find({seller:shopId});

      if (!shoporders || shoporders.length === 0) {
          return resp.status(400).json({ message: "No order found" });
      }

      resp.status(201).json({
          shoporders,
      });
  } catch (error) {
      console.log("Error in get user order:", error);
      resp.status(500).json({ message: error.message });
  }
};

// update order status..........

const updateStatus = async (req, resp) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id);
    if (!order) {
      return resp.status(400).json({ message: "Order not found with this ID" });
    }

    if (req.body.status === 'Transferred to delivery partner') {
      if (order.cart && order.cart.length > 0) { 
        order.cart.forEach(async (i) => {
          await updateOrder(i._id, i.qty);
        });
      }
    }

    // Update status
    order.status = req.body.status;
   const upated =  await order.save();
if(upated){
  return resp.status(201).json({
    message: "Order status updated successfully",
  });

}
    async function updateOrder(id, quantity) {
      const product = await productModel.findById(id);
    
        // product.stock -= quantity;
        product.sold_out += quantity;
        await product.save();
      
    }
  } catch (error) {
    console.log("Error in update status", error);
    resp.status(500).json({ message: "Internal server error" });
  }
};




// get all order by shop id
module.exports = {
  createOrder,
  getUserOrder,
  getShopOrder,
  updateStatus
};

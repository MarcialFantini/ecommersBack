import { NextFunction, Request, Response } from "express";
import { Order, OrdersService } from "../services/ordersService";

const ordersService = new OrdersService();

export const ordersCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const User = req.body.user as {
      email: string;
      isAdmin: boolean;
      idUser: number;
    };

    const { id_product, amount } = req.body;

    console.log(id_product, amount, User.idUser);

    const messageToResponse = await ordersService.createOrder(
      id_product,
      amount,
      User.idUser
    );

    res.json(messageToResponse);
  } catch (error) {
    res.json(error);
  }
};

export const ordersUpdateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.id);
    const updates = req.body.order as Order; // Asegúrate de que req.body sea del tipo Order

    const success = await ordersService.updateOrder(orderId, updates);

    if (success) {
      res.json({ message: "Order updated successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.json(error);
  }
};

export const ordersDeleteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.id);

    const success = await ordersService.deleteOrder(orderId);

    if (success) {
      res.json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.json(error);
  }
};

export const ordersGetByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = parseInt(req.params.id);

    const order = await ordersService.getOrderById(orderId);

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.json(error);
  }
};

export const ordersGetByPageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.params.page as string) || 1;
    const pageSize = 10;

    const orders = await ordersService.getOrdersByPage(page, pageSize);

    res.json(orders);
  } catch (error) {
    res.json(error);
  }
};

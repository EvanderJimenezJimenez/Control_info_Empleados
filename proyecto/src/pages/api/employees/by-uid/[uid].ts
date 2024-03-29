import { employeeProvider } from "@/dataBase";
import { notAllowedResponse } from "@/root/api";
import { HandlerFunction } from "@/root/types/HandlerFunction.type";

import { NextApiRequest, NextApiResponse } from "next";

async function dismissByUid(req: NextApiRequest, res: NextApiResponse) {
  const uid = String(req.query.uid);
  try {
    await employeeProvider.dismissByUid(uid);
    res.status(200).json({ uid, message: "Employee dismissing" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
async function getVacationsByUid(req: NextApiRequest, res: NextApiResponse) {
  const uid = String(req.query.uid);
  try {
    const employee = await employeeProvider.getVacationsByUid(uid);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

async function getFileURLByName(req: NextApiRequest, res: NextApiResponse) {
  const uid = String(req.query.uid);
  const fileName = String(req.body.fileName);
  try {
    const employee = await employeeProvider.getFileURLByName(uid,fileName);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}


const handlers:  { [key: string]: HandlerFunction } = {};//TODO: Type all variables that you use
handlers["DELETE"] = (req: NextApiRequest, res: NextApiResponse) =>
dismissByUid(req, res);
handlers["GET"] = (req: NextApiRequest, res: NextApiResponse) =>
getVacationsByUid(req, res);
handlers["POST"] = (req: NextApiRequest, res: NextApiResponse) =>
getFileURLByName(req, res);


export default function employeesByNameController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const handler = handlers[method as keyof typeof handlers](req, res);
  return handler! || notAllowedResponse(res, method!);
}

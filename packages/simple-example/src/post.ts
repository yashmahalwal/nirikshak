import express from "express";
import { studentMap, Student } from "./student";
const router = express.Router();
router.use("/Student", express.json(), (req, res) => {
    const { body } = req;
    studentMap.set(body.id as string, body as Student);

    res.sendStatus(201);
});

export default router;

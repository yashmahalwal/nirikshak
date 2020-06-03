import express from "express";
import { isValidStudent, studentMap } from "./student";
const router = express.Router();
router.put("/Student", express.json(), (req, res) => {
    const { body } = req;

    if (!isValidStudent(body)) {
        res.sendStatus(400);
        return;
    }

    studentMap.set(body.id, body);
    res.status(201).send(body);
});
export default router;

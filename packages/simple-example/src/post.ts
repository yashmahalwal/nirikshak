import express from "express";
import { studentMap, isValidNewStudent, isValidStudent } from "./student";
const router = express.Router();
router.post("/Student", express.json(), (req, res) => {
    const { body } = req;

    if (!isValidStudent(body)) {
        res.sendStatus(500);
        return;
    }

    if (!isValidNewStudent(body)) {
        res.sendStatus(400);
        return;
    }

    studentMap.set(body.id, body);
    res.status(201).send({ student: body });
});

router.post("/Student/:id", express.json(), (req, res) => {
    const { body } = req;

    if (!isValidStudent(body)) {
        res.sendStatus(500);
        return;
    }

    if (!isValidNewStudent(body)) {
        res.sendStatus(409);
        return;
    }

    studentMap.set(body.id, body);
    res.status(200).send({ student: body });
});

export default router;

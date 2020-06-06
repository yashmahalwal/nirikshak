import express from "express";
import { studentMap } from "./student";
const router = express.Router();

router.get("/Student/:id", (req, res) => {
    const {
        params: { id },
    } = req;

    if (studentMap.has(id)) {
        res.send(studentMap.get(id));
    } else {
        res.sendStatus(400);
    }
});

router.get("/Student/:id/v1", (req, res) => {
    const {
        params: { id },
    } = req;

    if (studentMap.has(id)) {
        res.status(201).send(studentMap.get(id));
    } else {
        res.sendStatus(404);
    }
});

export default router;

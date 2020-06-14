import express from "express";
import { studentMap } from "./student";
const router = express.Router();
router.patch("/Student/:id", express.json(), (req, res) => {
    const {
        body,
        params: { id },
    } = req;

    if (!studentMap.has(id)) {
        res.sendStatus(404);
        return;
    }

    const student = studentMap.get(id)!;
    for (const key in body) {
        if (!(key in student)) {
            res.sendStatus(400);
            return;
        }

        const value = body[key][key];
        student[key] = value;
    }
    studentMap.set(body.id, body);

    res.status(200);
    res.send(student);
});

export default router;

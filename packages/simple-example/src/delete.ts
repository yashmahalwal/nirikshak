import express from "express";
import { studentMap } from "./student";
const router = express.Router();
router.delete("/Student/:id", (req, res) => {
    const {
        params: { id },
    } = req;

    if (studentMap.has(id)) {
        const s = studentMap.get(id);
        studentMap.delete(id);
        res.send(s);
    } else {
        res.sendStatus(404);
    }
});

export default router;

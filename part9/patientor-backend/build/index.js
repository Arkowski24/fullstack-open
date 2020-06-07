"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoseRouter_1 = __importDefault(require("./routes/diagnoseRouter"));
const patientRouter_1 = __importDefault(require("./routes/patientRouter"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.use('/api/diagnoses', diagnoseRouter_1.default);
app.use('/api/patients', patientRouter_1.default);
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

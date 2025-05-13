"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbconnection_1 = __importDefault(require("./utils/dbconnection"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const order_routes_1 = __importDefault(require("./routes/order-routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, dbconnection_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)({
    // origin: "https://www.investorgrain.com",
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin",
        // "https://www.investorgrain.com");
    "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/users', user_routes_1.default);
app.use('/orders', order_routes_1.default);
app.all('**', (req, res) => {
    return res.status(404).json({ message: 'Not Found' });
});
app.listen(PORT, () => console.log('app is listening on port ' + PORT));

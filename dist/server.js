"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var router_1 = __importDefault(require("./router"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var auth_1 = require("./auth");
var db_1 = __importDefault(require("./db"));
var user_1 = require("./user");
exports.app = (0, express_1.default)();
var corsOptions = {
    credentials: true,
    origin: ["http://localhost:3001", "http://localhost:3000"],
};
exports.app.use((0, cors_1.default)(corsOptions));
exports.app.use(express_1.default.json());
//don't look at this
exports.app.get("/", function (req, res) {
    console.log("hello from express!");
    res.json({ message: "this is GET /" });
});
//this is the main things
exports.app.use((0, cookie_parser_1.default)());
//protected routes for frontend
exports.app.use("/api", auth_1.protect, router_1.default);
//these are for log/sign in
exports.app.get("/full", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var all;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.blog.findMany()];
            case 1:
                all = _a.sent();
                all.sort(function (a, b) { return b.createdAt - a.createdAt; });
                res.json(all);
                return [2 /*return*/];
        }
    });
}); });
exports.app.post("/hey", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, blog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                return [4 /*yield*/, db_1.default.blog.findFirst({
                        where: {
                            id: id,
                        },
                    })];
            case 1:
                blog = _a.sent();
                res.json(blog);
                return [2 /*return*/];
        }
    });
}); });
exports.app.post("/edit", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, title, body, updatedBlog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                title = req.body.title;
                body = req.body.body;
                return [4 /*yield*/, db_1.default.blog.update({
                        where: {
                            id: id,
                        },
                        data: {
                            title: title,
                            body: body,
                        },
                    })];
            case 1:
                updatedBlog = _a.sent();
                res.json(updatedBlog);
                return [2 /*return*/];
        }
    });
}); });
exports.app.post("/detail", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var blog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.blog.findFirst({
                    where: {
                        id: req.body.id,
                    },
                })];
            case 1:
                blog = _a.sent();
                res.json(blog);
                return [2 /*return*/];
        }
    });
}); });
exports.app.post("/make_cookie", user_1.createNewUser);
exports.app.post("/get_cookie", user_1.signin);
//# sourceMappingURL=server.js.map
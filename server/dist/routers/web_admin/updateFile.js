"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var result_1 = require("../../utils/result");
var enum_1 = require("../../types/enum");
var router = express_1.default.Router();
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/images');
    },
    filename: function (req, file, cb) {
        file.name = Date.now() + file.originalname;
        cb(null, file.name);
    }
});
var upload = multer_1.default({ storage: storage });
router.post('/update_img', upload.single('file'), function (req, res) {
    var imgUrl = "http://" + req.headers.host + "/public/images/" + req.file.name;
    res.writeHead(200, { 'Content-Type': enum_1.ResponseState.ContentType });
    res.write(result_1.writeResult({ success: true, message: enum_1.ResponseState.success, data: imgUrl }));
    res.end();
});
exports.default = router;
//# sourceMappingURL=updateFile.js.map
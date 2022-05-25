"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportCategoryUseCase = void 0;

var _csvParse = require("csv-parse");

var _fs = _interopRequireDefault(require("fs"));

var _tsyringe = require("tsyringe");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ImportCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class ImportCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  loadCategories(file) {
    return new Promise((resolve, reject) => {
      const stream = _fs.default.createReadStream(file.path);

      const categories = [];
      const parseFile = (0, _csvParse.parse)();
      stream.pipe(parseFile);
      parseFile.on("data", async line => {
        const [name, description] = line;
        categories.push({
          name,
          description
        });
      }).on("end", () => {
        _fs.default.promises.unlink(file.path);

        resolve(categories);
      }).on("error", err => {
        reject(err);
      });
    });
  }

  async execute(file) {
    const categories = await this.loadCategories(file);
    categories.map(async category => {
      const {
        name,
        description
      } = category;
      const categoryExists = await this.categoriesRepository.findByName(name);

      if (!categoryExists) {
        await this.categoriesRepository.create({
          name,
          description
        });
      }
    });
  }

}) || _class);
exports.ImportCategoryUseCase = ImportCategoryUseCase;
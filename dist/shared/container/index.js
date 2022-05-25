"use strict";

var _tsyringe = require("tsyringe");

require("./providers");

var _PasswordComplexRepository = require("../../modules/accounts/infra/typeorm/repositories/PasswordComplexRepository");

var _UsersRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersRepository");

var _UsersTokensRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository");

var _CarsImageRepository = require("../../modules/cars/infra/typeorm/repositories/CarsImageRepository");

var _CarsRepository = require("../../modules/cars/infra/typeorm/repositories/CarsRepository");

var _CategoriesRepository = require("../../modules/cars/infra/typeorm/repositories/CategoriesRepository");

var _SpecificationsRepository = require("../../modules/cars/infra/typeorm/repositories/SpecificationsRepository");

var _FeedbackRepository = require("../../modules/feedback/infra/typeorm/repositories/FeedbackRepository");

var _RentalsRepository = require("../../modules/rentals/infra/typeorm/repositories/RentalsRepository");

// ICategoriesRepository
_tsyringe.container.registerSingleton("CategoriesRepository", _CategoriesRepository.CategoriesRepository);

_tsyringe.container.registerSingleton("SpecificationsRepository", _SpecificationsRepository.SpecificationsRepository);

_tsyringe.container.registerSingleton("UsersRepository", _UsersRepository.UsersRepository);

_tsyringe.container.registerSingleton("CarsRepository", _CarsRepository.CarsRepository);

_tsyringe.container.registerSingleton("CarsImageRepository", _CarsImageRepository.CarsImageRepository);

_tsyringe.container.registerSingleton("RentalsRepository", _RentalsRepository.RentalsRepository);

_tsyringe.container.registerSingleton("UsersTokensRepository", _UsersTokensRepository.UsersTokensRepository);

_tsyringe.container.registerSingleton("PasswordComplexRepository", _PasswordComplexRepository.PasswordComplexRepository);

_tsyringe.container.registerSingleton("FeedbackRepository", _FeedbackRepository.FeedbackRepository);
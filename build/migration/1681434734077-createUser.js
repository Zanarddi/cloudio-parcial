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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser1681434734077 = void 0;
class CreateUser1681434734077 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`create table user (
                email varchar(255) primary key not null,
                nome varchar(100) not null,
                theme char(1) default 'D' check (theme in ('L', 'D')),
                language char(2) default 'en',
                magic_create boolean default false,
                created_at timestamp not null default current_timestamp,
                updated_at timestamp not null default current_timestamp on update current_timestamp
            );`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`drop table user;`);
        });
    }
}
exports.CreateUser1681434734077 = CreateUser1681434734077;

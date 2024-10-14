import { Inject } from "@nestjs/common";
import { KnexService } from "./config.knex";

export class BaseRepo {
	@Inject() knexService: KnexService;

	get knex() {
		return this.knexService.instance;
	}

}
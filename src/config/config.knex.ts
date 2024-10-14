import { Injectable } from '@nestjs/common'
import * as knex from 'knex'

@Injectable()
export class KnexService {
	instance: any;

	constructor() {
		this.instance = knex({
			client: 'pg',
			debug: false,
			connection: {
				host: process.env.PGHOST,
				user: process.env.PGUSER,
				database: process.env.PGDATABASE,
				password: process.env.PGPASSWORD,
				port: Number(process.env.PGPORT),
			}
		});
	}
}

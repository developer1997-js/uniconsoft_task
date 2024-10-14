import { Module } from '@nestjs/common'
import { KnexService } from './config.knex'

@Module({
	imports: [],
	providers: [KnexService],
	exports: [KnexService],
})
export class ConfigModule {}

import { Container } from 'inversify';

import { appModule } from '@src/app/app.module';
import { domainModule } from '@src/domains/domain.module';
import { infrastructureModule } from '@src/infrastructure/infrastructure.module';

const container = new Container();
container.load(appModule);
container.load(domainModule);
container.load(infrastructureModule);

export { container };

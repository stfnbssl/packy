import { ControllerType } from '../features/app/types'
import { HomeController } from './controllers/home';
import { AccountController } from './controllers/account';
import { RepoController } from './controllers/repo';
import { PackyController } from './controllers/packy';

const siteControllers: ControllerType[] = [
    new HomeController(),
    new AccountController(),
    new RepoController(),
    new PackyController(),
]

export { siteControllers }

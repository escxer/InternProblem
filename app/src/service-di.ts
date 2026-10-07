import { auth } from '../src/lib/auth';
import { UserRepository } from '../../packages/domains/repositories/user_repo';
import {AuthService} from '../../packages/services/auth-service';

const userRepo = new UserRepository();
const authService = new AuthService(auth, userRepo);

export { authService }
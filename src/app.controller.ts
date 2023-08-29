import { Body, Controller, Get, Param, Post, UnauthorizedException } from '@nestjs/common';
import { Auth, CreateUserDto, QueueService, UserEntity, UserService } from '@servicelabsco/nestjs-utility-services';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly queueService: QueueService,
        // private readonly usersService: UsersService,
        private readonly userService: UserService
    ) {}

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        // const user = await this.userService.validateUser(loginCredentials.email, loginCredentials.password);
        console.log(createUserDto);
        // const newUser = new UserEntity();
        // const newUser = await this.userService.createUser(createUserDto);
        return UserEntity.firstOrCreate(createUserDto);
    }

    @Post('/login')
    async login(@Body() loginCredentials: { email: string; password: string }) {
        const user = await this.userService.validateUser(loginCredentials.email, loginCredentials.password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
        // return this.authService.login(loginCredentials);
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('internal/test')
    check() {
        return 'am here';
    }

    @Get('api/auth')
    async auth() {
        return Auth.user();
    }

    @Get('failed-jobs')
    async getFailedJobs() {
        return this.queueService.getFailedJobs(0, 100);
    }

    @Get('queue/:id')
    async getQueueDetails(@Param('id') id: number) {
        return this.queueService.getJobDetails(id);
    }

    @Get('queue')
    async getQueue() {
        const runningStats = await this.queueService.getStats();
        const jobStats = await this.queueService.getQueueStats();

        return { runningStats, jobStats };
    }

    @Get('set')
    async set() {}
}

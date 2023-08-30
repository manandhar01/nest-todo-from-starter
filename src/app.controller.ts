import { Body, Controller, Get, Param, Post, UnauthorizedException } from '@nestjs/common';
import { Auth, AuthService, CreateUserDto, Hash, QueueService, UserEntity, UserService } from '@servicelabsco/nestjs-utility-services';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly queueService: QueueService,
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        // userService.createUser was not working so I copied this code directly from the method definition
        let user = await this.userService.findUserByEmail(createUserDto.email);
        console.log('...', user);

        // The problem seems to be at the line below this. I changed undefined to null.
        // the user userService.findUserByEmail returns null if user is not found in the database.
        if (user !== null) return user;

        user = new UserEntity();

        user.email = createUserDto.email;
        user.name = createUserDto.name;

        // check if password is supplied or not
        if (createUserDto.password) user.password = Hash.hash(createUserDto.password);

        await user.save();

        return user;

        // It should have been something like this
        // return await this.userService.createUser(createUserDto);
    }

    @Post('/login')
    async login(@Body() loginCredentials: { email: string; password: string }) {
        const user = await this.userService.validateUser(loginCredentials.email, loginCredentials.password);
        // const user = await this.userService.findUserByEmail(loginCredentials.email);

        if (!user) {
            throw new UnauthorizedException();
        }

        console.log(user);

        const token = await this.authService.generateAuthJwtToken({ email: user.email, id: user.id });

        return { access_token: token };
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

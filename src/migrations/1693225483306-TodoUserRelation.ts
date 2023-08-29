import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class TodoUserRelation1693225483306 extends MigrationUtility {
    constructor() {
        super('todos');
        this.process();
    }

    process() {
        this.foreign({
            name: 'user_id',
            foreignTable: 'sys_users',
        });
    }
}

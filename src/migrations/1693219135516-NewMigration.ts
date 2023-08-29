import { MigrationUtility } from '@servicelabsco/nestjs-utility-services';

export class NewMigration1693219135516 extends MigrationUtility {
    constructor() {
        super('todos');
        this.process();
    }

    process() {
        this.primary();

        this.string('todo');
        this.boolean('is_done', false);

        this.whoColumns();
    }
}

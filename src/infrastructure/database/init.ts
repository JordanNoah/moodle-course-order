import {OrganizationSequelize} from "./models/Organization";
import {OrganizationSeederExec} from "./seeders/execute/organization.seeder.exec";
import {MoodleWsFunctionSequelize} from "./models/MoodleWsFunction";
import {UserSequelize} from "./models/User";
import {CourseSequelize} from "./models/Course";
import {GroupSequelize} from "./models/Group";
import {GroupCourseSequelize} from "./models/GroupCourse";
import {ProgramMigrationSequelize} from "./models/ProgramMigration";
import {ProgramMigrationSeederExec} from "./seeders/execute/programMigration.seeder.exec";

export const DbSequelize = (): Promise<void> => {
    return new Promise(async (resolve,reject) => {
        try {
            await OrganizationSequelize.sync()
            await MoodleWsFunctionSequelize.sync()
            await UserSequelize.sync()
            await CourseSequelize.sync()
            await GroupSequelize.sync()
            await GroupCourseSequelize.sync()
            await ProgramMigrationSequelize.sync()

            await new OrganizationSeederExec().up()
            await new ProgramMigrationSeederExec().up()
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}
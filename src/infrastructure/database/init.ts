import {OrganizationSequelize} from "./models/Organization";
import {OrganizationSeederExec} from "./seeders/execute/organization.seeder.exec";
import {MoodleWsFunctionSequelize} from "./models/MoodleWsFunction";
import {UserSequelize} from "./models/User";
import {CourseSequelize} from "./models/Course";
import {GroupSequelize} from "./models/Group";
import {GroupCourseSequelize} from "./models/GroupCourse";

export const DbSequelize = (): Promise<void> => {
    return new Promise(async (resolve,reject) => {
        try {
            await OrganizationSequelize.sync()
            await MoodleWsFunctionSequelize.sync()
            await UserSequelize.sync()
            await CourseSequelize.sync()
            await GroupSequelize.sync()
            await GroupCourseSequelize.sync()

            await new OrganizationSeederExec().up()
            resolve()
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}
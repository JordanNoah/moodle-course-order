export class RegisterMoodleWsFunctionDto {
    private constructor(
        public moodleFunction: string,
        public abbreviation: string
    ) {}

    static create(object: {[key:string]:any}):[string?,RegisterMoodleWsFunctionDto?]{
        const {moodleFunction,abbreviation} = object

        if(!moodleFunction) return ['missing moodleFunction key']
        if(!abbreviation) return ['missing abbreviation key']

        return [
            undefined,
            new RegisterMoodleWsFunctionDto(
                moodleFunction,
                abbreviation
            )
        ]
    }
}
import { User } from 'telegraf/typings/core/types/typegram'
import { ModerationInterface } from '../Moderation/IModeration'
import { ITranslate } from '../Translate/ITranslateModel'

interface IUser extends User {
    male?: 'male' | 'female' | 'later',
    from?: string | null,
    middleware: ITranslate,
    vocabular: {
        on_moderation: string[],
        page: number
    },
    settings: {
        rules: boolean
    }
}

export default IUser
import { User } from 'telewgraf/typings/core/types/typegram'
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
    },
    access1: {
        moderation: boolean
    }
}

export default IUser
import { User } from 'telegraf/typings/core/types/typegram'
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
        rules: boolean,
        username?: string,
        interface_language: 'russian' | 'buryat' | 'english'
    },
    moderation: {
        access: boolean,
        currentPage?: number,
        currentWord?: string,
        moderatedCount?: number
    },
    subscribe: boolean,
    selected_string?: string
}


export default IUser
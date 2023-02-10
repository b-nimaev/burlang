import { MyContext } from "../../Model";
import greeting from "./DashboardGreeting";

export default async function settings_section(ctx: MyContext) {
    try {

        let update = ctx.updateType

        if (update === 'message') {}

        if (update === 'callback_query') {

            let data = ctx.update["callback_query"].data

            if (data === 'back') {
                await greeting(ctx)
            }
        }

    } catch (err) {
        console.log(err)
    }
}
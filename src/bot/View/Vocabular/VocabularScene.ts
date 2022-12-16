import { Composer, Scenes } from "telegraf";
import UserConrtoller from "../../Controller/User/UserController";
import { MyContext } from "../../Model";
import vocabular_scene from "./VocabularMethods";

const handler = new Composer<MyContext>();
const vocabular = new Scenes.WizardScene(
    "vocabular",
    handler,

    // rules
    async (ctx: MyContext) => await vocabular_scene.rules(ctx),

    // get word & write
    async (ctx: MyContext) => await vocabular_scene.getting_tranlsates(ctx),

    async (ctx: MyContext) => await vocabular_scene.set_translates(ctx),
    
    async (ctx: MyContext) => await vocabular_scene.moderation_handler(ctx)
);

vocabular.enter(async (ctx) => vocabular_scene.greeting(ctx))

vocabular.command("dashboard", async (ctx) => ctx.scene.enter("dashboard"))
vocabular.command("study", async (ctx) => ctx.scene.enter("study"))
vocabular.command("home", async (ctx) => ctx.scene.enter("home"))

handler.on("message", async (ctx) => vocabular_scene.greeting(ctx))
handler.action('home', async (ctx) => await ctx.scene.enter('home'))
handler.action('settings', async (ctx) => await vocabular_scene.render_settings(ctx))
handler.action("toggle_rules", async (ctx) => await UserConrtoller.toggle_rules(ctx))
handler.action('back', async (ctx) => await vocabular_scene.greeting(ctx))
handler.action('add', async (ctx) => await vocabular_scene.add_word(ctx))
handler.action('moderation', async (ctx) => await vocabular_scene.moderation(ctx))

export default vocabular
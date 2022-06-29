import { Context, Scenes } from "telegraf";

interface MyWizardSession extends Scenes.WizardSessionData {
    myWizardSessionProp: number
}
interface MySession extends Scenes.WizardSession<MyWizardSession> {
    plan: string;
}
export interface MyContext extends Context {
    session: MySession;
    scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;
    wizard: Scenes.WizardContextWizard<MyContext>;
}

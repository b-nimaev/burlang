import { MyContext } from "../../Model";
import { BinModel, IBin } from "../../Model/Bin/IBin";

export default class InterfaceContoller {
    static async create_interace (name: string) {

        let interface_bin: IBin = {
            partial: name,
            translates: {
                russian: '',
                english: '',
                buryat: ''
            }
        }

        new BinModel(interface_bin).save()

    }

    static async set_translate (name: string, text: string) {
        try {

            await BinModel.findOneAndUpdate({
                partial: name
            }, {
                $set: {
                    "translates.russian": text
                }
            })

        } catch (err) {
            console.log(err)
        }
    }

    static async get_translate (name: string) {
        try  {

            return BinModel.findOne({
                partial: name
            })

        } catch (err) {
            console.log(err)
        }
    }
}
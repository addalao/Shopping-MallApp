import { ORDER } from "../const.js"
export default function orderReduceer(pre = [], actiong) {
    const { type, data } = actiong
    switch (type) {
        case ORDER:

            return data
        default:
            return pre
    }
}
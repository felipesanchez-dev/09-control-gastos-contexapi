import { formatCurrecy } from "../helpers"

type AmounDisplayProp = {
    label:string
    amount: number
}

export default function AmounDisplay({label, amount} : AmounDisplayProp) {
    return (
        <p className=" text-2xl text-blue-600 font-bold">
            {label}:{''}
            <span className=" font-black text-black">{formatCurrecy(amount) }</span>
        </p>
    )
}

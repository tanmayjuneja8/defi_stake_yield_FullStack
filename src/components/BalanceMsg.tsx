import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4),
        display: "inline-grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        justifyContent: "flex-end",
        gap: theme.spacing(1),
        alignItems: "center"
    },
    tokenImg: {
        width: "32px"
    },
    amount: {
        fontWeight: 700
    }
}))

interface BalanceMsgProps {
    label: string
    amount: number
    tokenImgSrc: string
}
export const BalanceMsg = ({ label, amount, tokenImgSrc }: BalanceMsgProps) => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div>{label}</div>
            <div className={classes.amount}>{amount}</div>
            <img className={classes.tokenImg} src={tokenImgSrc} alt="token logo" />
        </div>

    )
}
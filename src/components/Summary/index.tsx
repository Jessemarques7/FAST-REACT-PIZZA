import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";

import { Container } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";

export function Summary() {

    const {transactions} = useTransactions();

    const summary = transactions.reduce((acc,transaction) => {
        if (transaction.type === 'deposit') {
            acc.deposits += transaction.amount;
            acc.total.totalValue += transaction.amount;
        } else {
            acc.withdraws -= transaction.amount;
            acc.total.totalValue -= transaction.amount;
        }

        if (acc.total.totalValue < 0 ) {
            acc.total.colorTotal = "highlight-background-negative"
        } else {
            acc.total.colorTotal = "highlight-background"
        }

        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        total: {
            colorTotal: "highlight-background",
            totalValue: 0
        }
    })

    return (
        <Container>
            <div>
                <header>
                <p>Entradas</p>
                <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                        }).format(summary.deposits)}
                </strong>
            </div>
            <div>
                <header>
                <p>Saídas</p>
                <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>
                {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                        }).format(summary.withdraws)}
                </strong>
            </div>
            <div className={summary.total.colorTotal}>
                <header>
                <p>Total</p>
                <img src={totalImg} alt="Total" />
                </header>
                <strong>
                {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                        }).format(summary.total.totalValue)}
                </strong>
            </div>
        </Container>
    )
}
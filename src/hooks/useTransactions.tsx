import { createContext, useEffect, useState, ReactNode, useContext} from 'react'
import { Api } from '../services/api';

interface Transaction {
    id:number,
    title: string,
    type: string,
    category: string,
    amount: number,
    createdAt: string,
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionContextData {
    transactions: Transaction[];
    createTransaction: (transaction : TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData
    );

export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        Api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(TransactionInput: TransactionInput) {

        const response = await Api.post('/transactions', {
            ...TransactionInput,
            createdAt: new Date()
        })
        const {transaction} = response.data;
        setTransactions([
            ...transactions,
            transaction
        ]);
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    );
    
}

export function useTransactions() {
    const context = useContext(TransactionsContext)

    return context
}
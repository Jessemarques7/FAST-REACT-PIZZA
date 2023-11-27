import { useState } from 'react'
import logoimg from '../../assets/logo.svg'
import { Container, Content } from './styles'
import Modal from 'react-modal';

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({onOpenNewTransactionModal}: HeaderProps) {

    return (
        <Container>
            <Content>
            <img src={logoimg} alt="dtmoney" />
            <button type="button" onClick={onOpenNewTransactionModal}>
                Nova transação
            </button>
            </Content>
        </Container>
    )
}
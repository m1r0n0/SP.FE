import React from 'react'
import ProviderEvents from './ProviderEvents/ProviderEvents';
import CustomerEvents from './CustomerEvents/CustomerEvents';
import { useAppSelector } from '../../hooks';

interface EventsProps {
}

export default function Events({}: EventsProps) {
    var isProvider = useAppSelector((s) => s.user.isProvider);

    return isProvider ? <ProviderEvents /> : <CustomerEvents />;
}
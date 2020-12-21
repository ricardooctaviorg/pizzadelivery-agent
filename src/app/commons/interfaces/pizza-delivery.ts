export interface PizzaDelivery {
    _id: string;
    deliveryId: string;
    items: any[];
    customer: {
        customerId: string
        , name: string
        , phone: string
    };
    address: {
        street: string;
        postalCode: string;
        betweenStreets: string;
        references: string;
        lat: string;
        lng: string;
    };
    status: {
        statusId: string
        , statusDelivery: string
    };
    agent: {
        agentId: string
        , name: string
        , phone: string
    };
    orderDate: Date;
    deliveryDate: Date;
    totalAmount: string;
}
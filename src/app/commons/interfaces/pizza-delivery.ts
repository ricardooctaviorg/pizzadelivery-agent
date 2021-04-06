export interface PizzaDelivery {
    _id: string;
    deliveryId: string;
    orders: [ 
        {
            order:
            {
                orderId: string;
                ingredients:string[];
                extras: string[];
                typeProduct: string;
            };
            volume: number;
            size: string;
            amount: number;
        }   
    ];
    customer: {
        customerId: string;
        name: string;
        phone: string;
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
        statusId: string;
        statusDelivery: string;
    };
    agent: {
        agentId: string;
        name: string;
        phone: string;
    };
    orderDate: Date;
    assignDate: Date;
    deliveryDate: Date;
    totalAmount: string;
}
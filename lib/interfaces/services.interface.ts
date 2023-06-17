export interface IServicesResponse {
    state: boolean;
    result: [
        {
            network: string;
            currency: string;
            is_available: boolean;
            limit: {
                min_amount: string;
                max_amount: string;
            };
            commission: {
                fee_amount: string;
                percent: string;
            };
        }
    ];
}

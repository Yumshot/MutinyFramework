export interface IDeferrals {
    defer(): void;
    update(message: string): void;
    presentCard(card: object | string, cb?: (data: object, rawData: string) => void): void;
    done(failureReason?: string): void;
}
export interface Application {
    id: string;
    name: string;
    email: string;
    position: string;
    location: string;
    applied: string;
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
}

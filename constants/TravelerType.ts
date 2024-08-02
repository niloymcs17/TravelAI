export type TravelOption = {
    id: number;
    title: string;
    subtitle: string;
    icon: string;
    people?: string;
};

export const SelectBudgetList:TravelOption[] = [
    {
        id: 1,
        title: 'Cheap',
        subtitle: 'Stay conscious of costs',
        icon: '💵',
    },
    {
        id: 2,
        title: 'Moderate',
        subtitle: 'Keep cost on the average side',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        subtitle: 'Don\'t worry about cost',
        icon: '💸',
    },
];
export const SelectTravelerList:TravelOption[]=[
    {
        "id": 1,
        "title": "Just Me",
        "subtitle": "A sole travels in exploration",
        "icon": "✈️",
        "people": "1"
    },
    {
        "id": 2,
        "title": "A Couple",
        "subtitle": "Two travels in Honeymoon",
        "icon": "🥂",
        "people": "2 People"
    },
    {
        "id": 3,
        "title": "Family",
        "subtitle": "Vacation with family and relax",
        "icon": "🏡",
        "people": "3 to 5 People"
    },
    {
        "id": 4,
        "title": "Friends",
        "subtitle": "A group of fun loving friends exploring together",
        "icon": "👯",
        "people": "4 to 8 People"
    }
]